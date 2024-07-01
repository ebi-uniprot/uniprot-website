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
import { groupBy } from 'lodash-es';
import { SearchResults } from '../../../../shared/types/results';

export type ClusterMapping = Record<
  UniRefEntryType,
  Record<string, UniRefLiteAPIModel>
>;

type Props = {
  uniparcId: string;
};

const SimilarProteins = ({ uniparcId }: Props) => {
  const unirefData = useDataApi<SearchResults<UniRefLiteAPIModel>>(
    `${apiUrls.search.searchPrefix(Namespace.uniref)}?query=(upi:${uniparcId})`
  );

  if (unirefData.loading || !unirefData.data) {
    return <Loader />;
  }
  const mappingData =
    unirefData.data.results.length &&
    groupBy(unirefData.data.results, 'entryType');
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
              clusters={mappingData[clusterType]}
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
