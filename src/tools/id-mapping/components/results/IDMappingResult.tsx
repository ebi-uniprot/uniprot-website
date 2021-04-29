import { useMemo } from 'react';
import { HeroContainer, Loader, PageIntro } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';

import useItemSelect from '../../../../shared/hooks/useItemSelect';
import useDataApi from '../../../../shared/hooks/useDataApi';
import usePagination from '../../../../shared/hooks/usePagination';

import toolsURLs from '../../../config/urls';
import idMappingConverter from '../../adapters/idMappingConverter';
import { databaseToDatabaseInfo } from '../../../../uniprotkb/config/database';

import ResultsData from '../../../../shared/components/results/ResultsData';

import { JobTypes } from '../../../types/toolsJobTypes';
import { Location, LocationToPath } from '../../../../app/config/urls';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import {
  MappingAPIModel,
  MappingDetails,
  MappingFlat,
} from '../../types/idMappingSearchResults';

const jobType = JobTypes.ID_MAPPING;
const urls = toolsURLs(jobType);

const IDMappingResult = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = useRouteMatch<{ id: string }>(
    LocationToPath[Location.IDMappingResult]
  );

  const [selectedEntries, handleEntrySelection] = useItemSelect();

  const detailApiUrl =
    urls.detailsUrl && urls.detailsUrl(match?.params.id || '');
  const { data: detailsData } = useDataApi<MappingDetails>(detailApiUrl);

  const toDBInfo = detailsData && databaseToDatabaseInfo[detailsData.to];

  // Query for results data from the idmapping endpoint
  // NOTE: needs to be moved to useQueryNS to support filtering
  const initialApiUrl =
    detailsData?.redirectURL && urls.resultUrl(detailsData.redirectURL, {});

  const converter = useMemo(() => idMappingConverter(toDBInfo), [toDBInfo]);

  const resultsDataObject = usePagination<MappingAPIModel, MappingFlat>(
    initialApiUrl,
    converter
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
          identifiers from {detailsData?.from} were successfully mapped to{' '}
          {detailsData?.to}.
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
