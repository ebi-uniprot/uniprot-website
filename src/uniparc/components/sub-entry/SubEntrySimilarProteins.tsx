import { Loader, Tab, Tabs } from 'franklin-sites';
import { groupBy } from 'lodash-es';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import {
  UniRefEntryType,
  uniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../uniref/adapters/uniRefConverter';
import SubEntrySimilarProteinsTabContent from './SubEntrySimilarProteinsTabContent';

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
    <Tabs bordered>
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
    <div>
      <em>No similar UniProtKB entry found.</em>
    </div>
  );
};

export default SimilarProteins;
