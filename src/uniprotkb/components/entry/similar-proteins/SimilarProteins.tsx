import { Loader, Tabs, Tab } from 'franklin-sites';
import { useEffect } from 'react';
import { zip } from 'lodash-es';

import SimilarProteinsTabContent from './SimilarProteinsTabContent';

import useSafeState from '../../../../shared/hooks/useSafeState';

import apiUrls from '../../../../shared/config/apiUrls';
import fetchData from '../../../../shared/utils/fetchData';

import { Namespace } from '../../../../shared/types/namespaces';
import {
  UniRefEntryType,
  uniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';

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

const canonicalIsoformRE = /-1$/;

const SimilarProteins = ({ isoforms }: { isoforms: string[] }) => {
  const [mappingData, setMappingData] = useSafeState<ClusterMapping | null>(
    null
  );
  const [mappingLoading, setMappingLoading] = useSafeState(true);

  useEffect(() => {
    const promises = isoforms.map((accession) =>
      fetchData<{
        results: UniRefLiteAPIModel[];
      }>(
        `${apiUrls.search(Namespace.uniref)}?query=(uniprot_id:${
          // replace isoform name "-1" for canonical to get data from API
          accession.replace(canonicalIsoformRE, '')
        })`
      )
    );
    Promise.all(promises).then((responses) => {
      const clusterData = responses.map((response) => response.data.results);
      const mapping = getClusterMapping(isoforms, clusterData);
      setMappingData(mapping);
      setMappingLoading(false);
    });
  }, [isoforms, setMappingData, setMappingLoading]);

  if (mappingLoading) {
    return <Loader />;
  }

  return mappingData ? (
    <Tabs>
      {Object.entries(uniRefEntryTypeToPercent).map(
        ([clusterType, percentValue]) => (
          <Tab
            id={clusterType}
            title={`${percentValue} identity`}
            key={clusterType}
          >
            <SimilarProteinsTabContent
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
    <em>No similar UniProtKB entry found.</em>
  );
};

export default SimilarProteins;
