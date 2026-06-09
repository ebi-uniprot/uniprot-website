import { Loader } from 'franklin-sites';
import { zip } from 'lodash-es';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../../app/config/urls';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../../shared/types/namespaces';
import fetchData from '../../../../shared/utils/fetchData';
import listFormat from '../../../../shared/utils/listFormat';
import { stringifyQuery } from '../../../../shared/utils/url';
import { pluralise } from '../../../../shared/utils/utils';
import {
  type UniRefEntryType,
  uniRefEntryTypeToPercent,
  type UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import { type UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { type IsoformsAndCluster } from './SimilarProteins';
import SimilarProteinsError from './SimilarProteinsError';
import SimilarProteinsTable, { columns } from './SimilarProteinsTable';
import useLazySimilarityLevel from './useLazySimilarityLevel';

export type HasSimilarProteins = {
  total: number;
  isoforms: string[];
  cluster: UniRefLiteAPIModel;
  uniprotkbResults: UniProtkbAPIModel[];
  uniprotkbQuery: string;
};

export type LevelPartition = {
  noSimilar: string[];
  hasSimilar: HasSimilarProteins[];
};

const getUniprotkbQuery = (
  cluster: UniRefLiteAPIModel,
  isoforms: string[],
  canonical: string
) =>
  `(uniref_cluster_${cluster.entryType.replace('UniRef', '')}:${
    cluster.id
  })${isoforms
    .map(
      (isoform) =>
        ` NOT (accession:${isoform === canonical ? isoform.replace(/-\d+$/, '') : isoform})`
    )
    .join('')}`;

// Partition one level's clusters into isoforms that have similar proteins and
// those that don't. Exported so the parent reuses it during its scan and lazy
// tabs call it on open.
export const partitionLevel = async (
  isoformsAndClusters: IsoformsAndCluster[],
  canonical: string,
  signal: AbortSignal
): Promise<LevelPartition> => {
  const promises = isoformsAndClusters.map(({ isoforms, cluster }) => {
    if (isoforms.length <= 1 && cluster.memberCount <= 1) {
      return null;
    }
    const url = apiUrls.search.search({
      namespace: Namespace.uniprotkb,
      query: getUniprotkbQuery(cluster, isoforms, canonical),
      facets: null,
      columns,
      size: 10,
    });
    return fetchData<{
      results: UniProtkbAPIModel[];
    }>(url, undefined, { signal });
  });
  const responses = await Promise.all(promises);
  const hasSimilar: HasSimilarProteins[] = [];
  const noSimilar: string[] = [];
  for (const [isoformsAndCluster, response] of zip(
    isoformsAndClusters,
    responses
  )) {
    /* istanbul ignore if */
    if (!isoformsAndCluster) {
      break; // Shouldn't happen, used to restrict types
    }
    const { isoforms, cluster } = isoformsAndCluster;
    const total = +(response?.headers?.['x-total-results'] || 0);
    if (total && response?.data.results && isoforms && cluster) {
      hasSimilar.push({
        total,
        isoforms,
        cluster,
        uniprotkbResults: response.data.results,
        uniprotkbQuery: getUniprotkbQuery(cluster, isoforms, canonical),
      });
    } else if (isoforms) {
      noSimilar.push(...isoforms);
    }
  }
  return { noSimilar, hasSimilar };
};

type Props = {
  canonical: string;
  clusterType: string;
  isoformsAndClusters: IsoformsAndCluster[];
  // Set once a level is loaded (by the scan or a previous visit).
  initialPartition?: LevelPartition;
  onLoaded: (clusterType: string, partition: LevelPartition) => void;
};

const SimilarProteinsTabContent = ({
  canonical,
  clusterType,
  isoformsAndClusters,
  initialPartition,
  onLoaded,
}: Props) => {
  // Loaded levels arrive via `initialPartition`; others fetch on first open.
  const fetcher = useCallback(
    (signal: AbortSignal) =>
      partitionLevel(isoformsAndClusters, canonical, signal),
    [isoformsAndClusters, canonical]
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

  const { noSimilar: noSimilarProteins, hasSimilar: hasSimilarProteins } =
    initialPartition;

  return (
    <>
      {hasSimilarProteins.map(
        ({ total, isoforms, cluster, uniprotkbResults, uniprotkbQuery }) => (
          <section key={cluster.id} className="text-block">
            <h4>
              {isoforms.map((isoform, index) => (
                <span key={isoform}>
                  {listFormat(index, isoforms)}
                  {isoform}
                </span>
              ))}
            </h4>
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
      {!!noSimilarProteins.length && (
        <section key="no-similar-proteins" className="text-block">
          <h4>
            {noSimilarProteins.map((isoform, index) => (
              <span key={isoform}>
                {listFormat(index, noSimilarProteins)}
                {isoform}
              </span>
            ))}
          </h4>
          {`No similar proteins at ${
            uniRefEntryTypeToPercent[clusterType as UniRefEntryType]
          } identity for ${pluralise(
            'this isoform.',
            noSimilarProteins.length,
            'these isoforms.'
          )}`}
          <hr />
        </section>
      )}
      <Link
        className="button primary"
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: stringifyQuery({
            query: isoformsAndClusters
              .map(
                ({ cluster }) =>
                  `uniref_cluster_${clusterType.replace('UniRef', '')}:${
                    cluster.id
                  }`
              )
              .sort()
              .join(' OR '),
          }),
        }}
      >
        View all
      </Link>
    </>
  );
};

export default SimilarProteinsTabContent;
