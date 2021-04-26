import { HeroContainer, Loader, PageIntro } from 'franklin-sites';
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
import { Namespace } from '../../../../shared/types/namespaces';

const jobType = JobTypes.ID_MAPPING;
const urls = toolsURLs(jobType);

const IDMappingResult = () => {
  //   const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = useRouteMatch<{ id: string; targetNS?: string }>(
    LocationToPath[Location.IDMappingResult]
  );

  const [namespace] = useNS();

  const [selectedEntries, handleEntrySelection] = useItemSelect();

  // Query for results data from the idmapping endpoint
  // NOTE: needs to be moved to useQueryNS to support filtering
  const initialApiUrl = urls.resultUrl(match?.params.id || '', {
    namespace: namespace === Namespace.idmapping ? undefined : namespace,
  });

  const resultsDataObject = usePagination<MappingAPIModel, MappingFlat>(
    initialApiUrl,
    idMappingConverter
  );

  const { initialLoading, failedIds, total } = resultsDataObject;

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <SideBarLayout
      sidebar={<></>}
      // sidebar={<ResultsFacets dataApiObject={dataApiObject} total={total} />}
    >
      {/* resultsCount={total} */}
      <PageIntro title="ID Mapping Results">{/* {info} */}</PageIntro>
      {total && (
        <HeroContainer>
          {total} out of {total + (failedIds ? failedIds.length : 0)}{' '}
          identifiers from FROM were successfully mapped to TO.
          <br />
          {failedIds?.join(', ')}
        </HeroContainer>
      )}
      {/* TODO only display buttons when namespace exists, otherwise download only */}
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
      />
    </SideBarLayout>
  );
};

export default IDMappingResult;
