import { Loader } from 'franklin-sites';
import { zip } from 'lodash-es';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../shared/types/namespaces';
import fetchData from '../../../shared/utils/fetchData';
import { type UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import SimilarProteinsError from '../../../uniprotkb/components/entry/similar-proteins/SimilarProteinsError';
import SimilarProteinsTable, {
  columns,
} from '../../../uniprotkb/components/entry/similar-proteins/SimilarProteinsTable';
import useLazySimilarityLevel from '../../../uniprotkb/components/entry/similar-proteins/useLazySimilarityLevel';
import {
  type UniRefEntryType,
  uniRefEntryTypeToPercent,
  type UniRefLiteAPIModel,
} from '../../../uniref/adapters/uniRefConverter';

export type HasSimilarProteins = {
  total: number;
  cluster: UniRefLiteAPIModel;
  uniprotkbResults: UniProtkbAPIModel[];
  uniprotkbQuery: string;
};

export type LevelPartition = {
  hasSimilar: HasSimilarProteins[];
};

const getUniprotkbQuery = (cluster: UniRefLiteAPIModel) =>
  `(uniref_cluster_${cluster.entryType.replace('UniRef', '')}:${cluster.id})`;

// Fetch each cluster's UniProtKB members for one level (a cluster may be
// UniParc-only). Exported so the parent reuses it during its scan and lazy
// tabs call it on open.
export const partitionLevel = async (
  clusters: UniRefLiteAPIModel[],
  signal: AbortSignal
): Promise<LevelPartition> => {
  const promises = clusters.map((cluster) =>
    fetchData<{
      results: UniProtkbAPIModel[];
    }>(
      apiUrls.search.search({
        namespace: Namespace.uniprotkb,
        query: getUniprotkbQuery(cluster),
        columns,
        size: 10,
      }),
      undefined,
      { signal }
    )
  );
  const responses = await Promise.all(promises);
  const hasSimilar: HasSimilarProteins[] = [];
  for (const [cluster, response] of zip(clusters, responses)) {
    const total = +(response?.headers?.['x-total-results'] || 0);
    if (total && response?.data.results && cluster) {
      hasSimilar.push({
        total,
        cluster,
        uniprotkbResults: response.data.results,
        uniprotkbQuery: getUniprotkbQuery(cluster),
      });
    }
  }
  return { hasSimilar };
};

type Props = {
  clusterType: string;
  clusters: UniRefLiteAPIModel[];
  // Set once a level is loaded (by the scan or a previous visit).
  initialPartition?: LevelPartition;
  onLoaded: (clusterType: string, partition: LevelPartition) => void;
};

const SimilarProteinsTabContent = ({
  clusterType,
  clusters,
  initialPartition,
  onLoaded,
}: Props) => {
  // Loaded levels arrive via `initialPartition`; others fetch on first open.
  const fetcher = useCallback(
    (signal: AbortSignal) => partitionLevel(clusters, signal),
    [clusters]
  );
  const { error, retry } = useLazySimilarityLevel({
    clusterType,
    initialPartition,
    fetcher,
    onLoaded,
  });

  if (!initialPartition) {
    return error ? <SimilarProteinsError onRetry={retry} /> : <Loader />;
  }

  const { hasSimilar: hasSimilarProteins } = initialPartition;

  if (hasSimilarProteins.length === 0) {
    return (
      <section className="text-block">
        {`No similar proteins at ${
          uniRefEntryTypeToPercent[clusterType as UniRefEntryType]
        } identity.`}
      </section>
    );
  }

  return (
    <>
      {hasSimilarProteins.map(
        ({ total, cluster, uniprotkbResults, uniprotkbQuery }) => (
          <section key={cluster.id} className="text-block">
            <SimilarProteinsTable
              cluster={cluster}
              total={total}
              uniprotkbResults={uniprotkbResults}
              uniprotkbQuery={uniprotkbQuery}
            />
            <hr />
          </section>
        )
      )}
      <Link
        className="button primary"
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=${clusters
            .map(
              (cluster) =>
                `uniref_cluster_${clusterType.replace('UniRef', '')}:${
                  cluster.id
                }`
            )
            .sort()
            .join(' OR ')}`,
        }}
      >
        View all
      </Link>
    </>
  );
};

export default SimilarProteinsTabContent;
