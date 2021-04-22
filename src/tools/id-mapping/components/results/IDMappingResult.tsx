import { Loader } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { Location, LocationToPath } from '../../../../app/config/urls';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import ResultsData from '../../../../shared/components/results/ResultsData';
import usePagination from '../../../../shared/hooks/usePagination';
import idMappingConverter from '../../adapters/idMappingConverter';
import {
  MappingAPIModel,
  MappingFlat,
} from '../../types/idMappingSearchResults';
import useNS from '../../../../shared/hooks/useNS';

const jobType = JobTypes.ID_MAPPING;
const urls = toolsURLs(jobType);

const IDMappingResult = () => {
  //   const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = useRouteMatch<{ id: string; targetNS?: string }>(
    LocationToPath[Location.IDMappingResult]
  );

  const namespace = useNS();

  // console.log(match?.params.targetNS);

  const [selectedEntries, handleEntrySelection] = useItemSelect();

  // Query for results data from the idmapping endpoint
  // NOTE: needs to be moved to useQueryNS to support filtering
  const initialApiUrl = urls.resultUrl(match?.params.id || '', {
    namespace,
  });

  const resultsDataObject = usePagination<MappingAPIModel, MappingFlat>(
    initialApiUrl,
    idMappingConverter
  );

  const { initialLoading } = resultsDataObject;

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <SideBarLayout
      sidebar={<></>}
      // sidebar={<ResultsFacets dataApiObject={dataApiObject} total={total} />}
    >
      {/* <ResultsDataHeader total={total} selectedEntries={selectedEntries} /> */}
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
      />
    </SideBarLayout>
  );
};

export default IDMappingResult;
