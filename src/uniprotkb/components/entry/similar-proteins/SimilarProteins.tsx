import { Loader, Tab, Tabs } from 'franklin-sites';
import { zip } from 'lodash-es';
import { useEffect, useState } from 'react';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../../shared/types/namespaces';
import fetchData from '../../../../shared/utils/fetchData';
import { stringifyQuery } from '../../../../shared/utils/url';
import {
  UniRefEntryType,
  uniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import { UniRefColumn } from '../../../../uniref/config/UniRefColumnConfiguration';
import SimilarProteinsTabContent from './SimilarProteinsTabContent';

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

const SimilarProteins = ({ canonical, isoforms }: Props) => {
  const [mappingData, setMappingData] = useState<ClusterMapping | null>(null);
  const [mappingLoading, setMappingLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const promises = isoforms.map((accession) =>
      fetchData<{
        results: UniRefLiteAPIModel[];
      }>(
        apiUrls.search.search({
          namespace: Namespace.uniref,
          query: stringifyQuery({
            uniprotkb:
              accession === canonical
                ? accession.replace(/-\d+$/, '')
                : accession,
          }),
          columns: [UniRefColumn.id, UniRefColumn.identity],
          facets: null,
        }),
        undefined,
        { signal: controller.signal }
      )
    );
    Promise.all(promises).then(
      (responses) => {
        const clusterData = responses.map((response) => response.data.results);
        const mapping = getClusterMapping(isoforms, clusterData);
        setMappingData(mapping);
        setMappingLoading(false);
      },
      () => {
        /* ignore fetch errors */
      }
    );
    return () => controller.abort();
  }, [canonical, isoforms]);

  if (mappingLoading) {
    return <Loader />;
  }

  return mappingData ? (
    <Tabs bordered>
      {Object.entries(uniRefEntryTypeToPercent).map(
        ([clusterType, percentValue]) => (
          <Tab
            id={clusterType}
            title={`${percentValue} identity`}
            key={clusterType}
          >
            <SimilarProteinsTabContent
              canonical={canonical}
              clusterType={clusterType}
              isoformsAndClusters={Object.values(
                mappingData[clusterType as UniRefEntryType]
              )}
            />
          </Tab>
        )
      )}
    </Tabs>
  ) : (
    <div>
      <em>No similar UniProtKB entry found.</em>
    </div>
  );
};

export default SimilarProteins;
