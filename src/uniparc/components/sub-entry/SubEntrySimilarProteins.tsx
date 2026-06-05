import { Loader, Tab, Tabs } from 'franklin-sites';
import { groupBy } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { type SearchResults } from '../../../shared/types/results';
import SimilarProteinsError from '../../../uniprotkb/components/entry/similar-proteins/SimilarProteinsError';
import {
  type UniRefEntryType,
  uniRefEntryTypeToPercent,
  type UniRefLiteAPIModel,
} from '../../../uniref/adapters/uniRefConverter';
import SubEntrySimilarProteinsTabContent, {
  type LevelPartition,
  partitionLevel,
} from './SubEntrySimilarProteinsTabContent';

// Stable empty fallback so a level missing from the grouping keeps a constant
// reference across renders.
const EMPTY_CLUSTERS: UniRefLiteAPIModel[] = [];

type Props = {
  uniparcId: string;
};

type Data = {
  mapping: Record<string, UniRefLiteAPIModel[]>;
  // Only levels visited by the scan; the rest load lazily when their tab opens.
  partitions: Partial<Record<UniRefEntryType, LevelPartition>>;
  defaultLevel?: UniRefEntryType;
};

const SimilarProteins = ({ uniparcId }: Props) => {
  const unirefData = useDataApi<SearchResults<UniRefLiteAPIModel>>(
    `${apiUrls.search.searchPrefix(Namespace.uniref)}?query=(upi:${uniparcId})`
  );

  const results = unirefData.data?.results;

  const [data, setData] = useState<Data | null>(null);
  const [scanLoading, setScanLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!results) {
      return undefined;
    }
    const controller = new AbortController();
    const mapping = groupBy(results, 'entryType');
    // Stop at the first level with similar proteins: clusters are nested, so
    // every lower-identity level has them too. The rest load on open.
    (async () => {
      const partitions: Partial<Record<UniRefEntryType, LevelPartition>> = {};
      let defaultLevel: UniRefEntryType | undefined;
      for (const level of Object.keys(
        uniRefEntryTypeToPercent
      ) as UniRefEntryType[]) {
        // eslint-disable-next-line no-await-in-loop -- intentionally sequential: stop as soon as a level has data
        const partition = await partitionLevel(
          mapping[level] || EMPTY_CLUSTERS,
          controller.signal
        );
        partitions[level] = partition;
        if (partition.hasSimilar.length > 0) {
          defaultLevel = level;
          break;
        }
      }
      setData({ mapping, partitions, defaultLevel });
      setScanLoading(false);
    })().catch(() => {
      if (!controller.signal.aborted) {
        setError(true);
        setScanLoading(false);
      }
    });
    return () => controller.abort();
  }, [results, reload]);

  // Cache a level's data once a tab finishes loading it, so revisiting is
  // instant (no loader, no refetch).
  const handleLoaded = useCallback(
    (clusterType: string, partition: LevelPartition) => {
      setData(
        (current) =>
          current && {
            ...current,
            partitions: {
              ...current.partitions,
              [clusterType as UniRefEntryType]: partition,
            },
          }
      );
    },
    []
  );

  if (error) {
    return (
      <SimilarProteinsError
        onRetry={() => {
          setError(false);
          setScanLoading(true);
          setReload((n) => n + 1);
        }}
      />
    );
  }

  if (scanLoading || !data) {
    return <Loader />;
  }

  if (Object.keys(data.mapping).length === 0) {
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
            <SubEntrySimilarProteinsTabContent
              clusterType={clusterType}
              clusters={data.mapping[clusterType] || EMPTY_CLUSTERS}
              initialPartition={data.partitions[clusterType as UniRefEntryType]}
              onLoaded={handleLoaded}
            />
          </Tab>
        )
      )}
    </Tabs>
  );
};

export default SimilarProteins;
