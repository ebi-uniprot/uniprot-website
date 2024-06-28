import { Loader, Tabs, Tab } from 'franklin-sites';

import SubEntrySimilarProteinsTabContent from './SubEntrySimilarProteinsTabContent';

import useSafeState from '../../../../shared/hooks/useSafeState';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import {
  UniRefEntryType,
  uniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import useDataApi from '../../../../shared/hooks/useDataApi';

export type ClusterMapping = Record<
  UniRefEntryType,
  Record<string, UniRefLiteAPIModel>
>;

export const getClusterMapping = (clusterData: UniRefLiteAPIModel[][]) => {
  const mapping: ClusterMapping = {
    UniRef100: {},
    UniRef90: {},
    UniRef50: {},
  };

  for (const clusters of clusterData) {
    /* istanbul ignore if */
    // if (!isoform || !clusters) {
    //   break; // Shouldn't happen, used to restric types
    // }
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
  uniparcId: string;
};

const SimilarProteins = ({ uniparcId }: Props) => {
  const [mappingData, setMappingData] = useSafeState<ClusterMapping | null>(
    null
  );

  const unirefData = useDataApi(
    `${apiUrls.search.searchPrefix(Namespace.uniref)}?query=(upi:${uniparcId})`
  );

  if (unirefData.loading) {
    return <Loader />;
  }
  console.log(unirefData);
  return 'foo';
  return mappingData ? (
    <Tabs>
      {Object.entries(uniRefEntryTypeToPercent).map(
        ([clusterType, percentValue]) => (
          <Tab
            id={clusterType}
            title={`${percentValue} identity`}
            key={clusterType}
          >
            <SubEntrySimilarProteinsTabContent
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
