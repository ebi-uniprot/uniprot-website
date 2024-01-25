import { Loader, Tabs, Tab } from 'franklin-sites';
import { useEffect, useMemo } from 'react';
import { zip } from 'lodash-es';

import SimilarProteinsTabContent from './SimilarProteinsTabContent';

import useSafeState from '../../../../shared/hooks/useSafeState';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
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

// TODO: check cases when the canonical might not be the first isoforms!!!
const canonicalIsoformRE = /-1$/;

type Props = {
  isoforms: string[];
  primaryAccession: string;
};

const SimilarProteins = ({ isoforms, primaryAccession }: Props) => {
  const [mappingData, setMappingData] = useSafeState<ClusterMapping | null>(
    null
  );
  const [mappingLoading, setMappingLoading] = useSafeState(true);

  // Note, in the case of no other isoforms, the `isoforms` array is empty
  const allIsoforms = useMemo(
    () => Array.from(new Set([`${primaryAccession}-1`, ...isoforms])),
    [primaryAccession, isoforms]
  );

  useEffect(() => {
    const promises = allIsoforms.map((accession) =>
      fetchData<{
        results: UniRefLiteAPIModel[];
      }>(
        `${apiUrls.search.searchPrefix(Namespace.uniref)}?query=(uniprot_id:${
          // replace isoform name "-1" for canonical to get data from API
          accession.replace(canonicalIsoformRE, '')
        })`
      )
    );
    Promise.all(promises).then((responses) => {
      const clusterData = responses.map((response) => response.data.results);
      const mapping = getClusterMapping(allIsoforms, clusterData);
      setMappingData(mapping);
      setMappingLoading(false);
    });
  }, [allIsoforms, setMappingData, setMappingLoading]);

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
