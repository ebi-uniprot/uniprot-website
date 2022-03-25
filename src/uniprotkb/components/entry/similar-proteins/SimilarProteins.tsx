import { Loader, Tabs, Tab } from 'franklin-sites';
import { useMemo, useEffect } from 'react';
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
  allAccessions: string[],
  clusterData: UniRefLiteAPIModel[][]
) => {
  const mapping: ClusterMapping = {
    UniRef100: {},
    UniRef90: {},
    UniRef50: {},
  };

  for (const [accession, clusters] of zip(allAccessions, clusterData)) {
    /* istanbul ignore if */
    if (!accession || !clusters) {
      break; // Shouldn't happen, used to restric types
    }
    for (const cluster of clusters) {
      const isoformsAndCluster = mapping[cluster.entryType][cluster.id] || {
        isoforms: [],
        cluster,
      };
      isoformsAndCluster.isoforms.push(accession);
      mapping[cluster.entryType][cluster.id] = isoformsAndCluster;
    }
  }
  return mapping;
};

type Props = {
  isoforms: { isoforms: string[] };
  primaryAccession: string;
};

const SimilarProteins = ({ isoforms, primaryAccession }: Props) => {
  const allAccessions = useMemo(
    () =>
      [primaryAccession, ...isoforms.isoforms].filter(
        // remove first isoform, it'll be the primary accession
        (accession) => !accession.endsWith('-1')
      ),
    [primaryAccession, isoforms]
  );

  const [mappingData, setMappingData] = useSafeState<ClusterMapping | null>(
    null
  );
  const [mappingLoading, setMappingLoading] = useSafeState(true);

  useEffect(() => {
    setMappingLoading(true);
    const promises = allAccessions.map((accession) =>
      fetchData<{
        results: UniRefLiteAPIModel[];
      }>(`${apiUrls.search(Namespace.uniref)}?query=(uniprot_id:${accession})`)
    );
    Promise.all(promises).then((responses) => {
      const clusterData = responses.map((response) => response.data.results);
      const mapping = getClusterMapping(allAccessions, clusterData);
      setMappingData(mapping);
      setMappingLoading(false);
    });
  }, [allAccessions, setMappingData, setMappingLoading]);

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
