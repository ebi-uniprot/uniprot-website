import { Loader, Tab, Tabs } from 'franklin-sites';
import { isEqual, zip } from 'lodash-es';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../../shared/types/namespaces';
import fetchData from '../../../../shared/utils/fetchData';
import {
  type UniRefEntryType,
  uniRefEntryTypeToPercent,
  type UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import { UniRefColumn } from '../../../../uniref/config/UniRefColumnConfiguration';
import SimilarProteinsError from './SimilarProteinsError';
import SimilarProteinsTabContent, {
  type LevelPartition,
  partitionLevel,
} from './SimilarProteinsTabContent';

export type IsoformsAndCluster = {
  isoforms: string[];
  cluster: UniRefLiteAPIModel;
};

export type ClusterMapping = Record<
  UniRefEntryType,
  Record<string, IsoformsAndCluster>
>;

export const getClusterMapping = (
  isoforms: string[],
  clusterData: UniRefLiteAPIModel[][]
) => {
  const mapping: ClusterMapping = {
    UniRef100: {},
    UniRef90: {},
    UniRef50: {},
  };

  for (const [isoform, clusters] of zip(isoforms, clusterData)) {
    /* istanbul ignore if */
    if (!isoform || !clusters) {
      break; // Shouldn't happen, used to restric types
    }
    for (const cluster of clusters) {
      const isoformsAndCluster = mapping[cluster.entryType][cluster.id] || {
        isoforms: [],
        cluster,
      };
      isoformsAndCluster.isoforms.push(isoform);
      mapping[cluster.entryType][cluster.id] = isoformsAndCluster;
    }
  }
  return mapping;
};

type Props = {
  canonical: string;
  isoforms: string[];
};

type Data = {
  mapping: ClusterMapping;
  // Only levels visited by the scan; the rest load lazily when their tab opens.
  partitions: Partial<Record<UniRefEntryType, LevelPartition>>;
  defaultLevel?: UniRefEntryType;
};

const SimilarProteins = ({ canonical, isoforms }: Props) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const promises = isoforms.map((accession) =>
      fetchData<{
        results: UniRefLiteAPIModel[];
      }>(
        apiUrls.search.search({
          namespace: Namespace.uniref,
          query: `uniprotkb:${
            accession === canonical ? accession.replace(/-\d+$/, '') : accession
          }`,
          columns: [UniRefColumn.id, UniRefColumn.identity],
          facets: null,
        }),
        undefined,
        { signal: controller.signal }
      )
    );
    (async () => {
      const responses = await Promise.all(promises);
      const clusterData = responses.map((response) => response.data.results);
      const mapping = getClusterMapping(isoforms, clusterData);
      // Stop at the first level with similar proteins: clusters are nested,
      // so every lower-identity level has them too. The rest load on open.
      const partitions: Partial<Record<UniRefEntryType, LevelPartition>> = {};
      let defaultLevel: UniRefEntryType | undefined;
      for (const level of Object.keys(
        uniRefEntryTypeToPercent
      ) as UniRefEntryType[]) {
        // eslint-disable-next-line no-await-in-loop -- intentionally sequential: stop as soon as a level has data
        const partition = await partitionLevel(
          Object.values(mapping[level]),
          canonical,
          controller.signal
        );
        partitions[level] = partition;
        if (partition.hasSimilar.length > 0) {
          defaultLevel = level;
          break;
        }
      }
      setData({ mapping, partitions, defaultLevel });
      setLoading(false);
    })().catch(() => {
      if (!controller.signal.aborted) {
        setError(true);
        setLoading(false);
      }
    });
    return () => controller.abort();
  }, [canonical, isoforms, reload]);

  // Cache a level's data once a tab finishes loading it, so revisiting is
  // instant (no loader, no refetch).
  const handleLoaded = useCallback(
    (level: string, partition: LevelPartition) => {
      setData(
        (current) =>
          current && {
            ...current,
            partitions: {
              ...current.partitions,
              [level as UniRefEntryType]: partition,
            },
          }
      );
    },
    []
  );

  // Stable per-level arrays so a lazy tab doesn't refetch on unrelated renders.
  const mapping = data?.mapping;
  const isoformsAndClustersByLevel = useMemo<
    Record<string, IsoformsAndCluster[]>
  >(
    () =>
      mapping
        ? Object.fromEntries(
            Object.keys(mapping).map((level) => [
              level,
              Object.values(mapping[level as UniRefEntryType]),
            ])
          )
        : {},
    [mapping]
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <SimilarProteinsError
        onRetry={() => {
          setError(false);
          setLoading(true);
          setReload((n) => n + 1);
        }}
      />
    );
  }

  if (!data) {
    return (
      <div>
        <em>No similar UniProtKB entry found.</em>
      </div>
    );
  }

  return (
    <Tabs bordered>
      {Object.entries(uniRefEntryTypeToPercent).map(
        ([clusterType, percentValue]) => (
          <Tab
            id={clusterType}
            title={`${percentValue} identity`}
            key={clusterType}
            defaultSelected={clusterType === data.defaultLevel}
          >
            <SimilarProteinsTabContent
              canonical={canonical}
              clusterType={clusterType}
              isoformsAndClusters={isoformsAndClustersByLevel[clusterType]}
              initialPartition={data.partitions[clusterType as UniRefEntryType]}
              onLoaded={handleLoaded}
            />
          </Tab>
        )
      )}
    </Tabs>
  );
};

// Deep-compare `isoforms` because the parent (Entry.tsx) derives the array
// in a useMemo whose deps include the ProtNLM payload — so the reference
// changes whenever the ProtNLM toggle resolves, even though the isoform
// list itself is unchanged. Without the deep compare we'd refetch all
// UniRef clusters on every ProtNLM update.
export default memo(SimilarProteins, (prevProps, nextProps) => {
  return (
    prevProps.canonical === nextProps.canonical &&
    isEqual(prevProps.isoforms, nextProps.isoforms)
  );
});
