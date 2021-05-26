import { useMemo } from 'react';
import { ExpandableList, HeroContainer, Loader } from 'franklin-sites';
import { useLocation, useRouteMatch } from 'react-router-dom';

import useItemSelect from '../../../../shared/hooks/useItemSelect';
import useDataApi from '../../../../shared/hooks/useDataApi';
import usePagination from '../../../../shared/hooks/usePagination';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import toolsURLs from '../../../config/urls';
import idMappingConverter from '../../adapters/idMappingConverter';
import { databaseToDatabaseInfo } from '../../../../uniprotkb/config/database';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';

import ResultsData from '../../../../shared/components/results/ResultsData';

import { JobTypes } from '../../../types/toolsJobTypes';
import { Location, LocationToPath } from '../../../../app/config/urls';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import {
  MappingAPIModel,
  MappingDetails,
  MappingFlat,
} from '../../types/idMappingSearchResults';
import { Namespace } from '../../../../shared/types/namespaces';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import { defaultFacets } from '../../../../shared/config/apiUrls';
import Response from '../../../../uniprotkb/types/responseTypes';
import ResultsDataHeader from '../../../../shared/components/results/ResultsDataHeader';

const jobType = JobTypes.ID_MAPPING;
const urls = toolsURLs(jobType);

const IDMappingResult = () => {
  const match = useRouteMatch<{ id: string }>(
    LocationToPath[Location.IDMappingResult]
  );
  const location = useLocation();
  const { search: queryParamFromUrl } = location;
  const { selectedFacets } = getParamsFromURL(queryParamFromUrl);

  const [selectedEntries, handleEntrySelection] = useItemSelect();

  const detailApiUrl =
    urls.detailsUrl && urls.detailsUrl(match?.params.id || '');
  const { data: detailsData } = useDataApi<MappingDetails>(detailApiUrl);

  const toDBInfo = detailsData && databaseToDatabaseInfo[detailsData.to];

  // Query for results data from the idmapping endpoint
  const initialApiUrl =
    detailsData?.redirectURL &&
    urls.resultUrl(detailsData.redirectURL, { selectedFacets });

  const converter = useMemo(() => idMappingConverter(toDBInfo), [toDBInfo]);

  const resultsDataObject = usePagination<MappingAPIModel, MappingFlat>(
    initialApiUrl,
    converter
  );

  const {
    initialLoading: resultsDataInitialLoading,
    failedIds,
    total,
  } = resultsDataObject;

  let namespaceFallback;
  switch (detailsData?.to.toLowerCase()) {
    case Namespace.uniprotkb:
    case 'uniprotkb-swiss-prot':
      namespaceFallback = Namespace.uniprotkb;
      break;
    case Namespace.uniref:
    case 'uniref50':
    case 'uniref90':
    case 'uniref100':
      namespaceFallback = Namespace.uniref;
      break;
    case Namespace.uniparc:
      namespaceFallback = Namespace.uniparc;
      break;
    default:
      namespaceFallback = Namespace.idmapping;
  }

  // Run facet query
  const facets = defaultFacets.get(namespaceFallback);
  const facetsUrl =
    detailsData?.redirectURL &&
    urls.resultUrl(detailsData.redirectURL, {
      facets,
      size: 0,
      selectedFacets,
    });
  const facetsData = useDataApiWithStale<Response['data']>(facetsUrl);

  const { loading: facetInititialLoading, isStale: facetHasStaleData } =
    facetsData;

  if (
    facetInititialLoading &&
    resultsDataInitialLoading &&
    !facetHasStaleData
  ) {
    return <Loader />;
  }

  return (
    <SideBarLayout sidebar={<ResultsFacets dataApiObject={facetsData} />}>
      <ResultsDataHeader
        selectedEntries={selectedEntries}
        total={total}
        namespaceFallback={namespaceFallback}
        disableCardToggle
        titlePostscript={
          total && (
            <small>
              for {detailsData?.from} → {detailsData?.to}
            </small>
          )
        }
        base={detailsData?.redirectURL}
      />
      {failedIds && (
        <HeroContainer>
          <strong>{failedIds.length}</strong> id
          {failedIds.length === 1 ? ' is' : 's were'} not mapped:
          <ExpandableList descriptionString="ids" numberCollapsedItems={0}>
            {failedIds.map((id) => id)}
          </ExpandableList>
        </HeroContainer>
      )}
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
        namespaceFallback={namespaceFallback}
        displayIdMappingColumns
      />
    </SideBarLayout>
  );
};

export default IDMappingResult;
