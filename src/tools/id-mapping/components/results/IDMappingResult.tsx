import { useMemo } from 'react';
import {
  ExpandableList,
  HeroContainer,
  Loader,
  PageIntro,
} from 'franklin-sites';
import { useLocation, useRouteMatch } from 'react-router-dom';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import ResultsData from '../../../../shared/components/results/ResultsData';
import ResultsButtons from '../../../../shared/components/results/ResultsButtons';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';

import useItemSelect from '../../../../shared/hooks/useItemSelect';
import useDataApi from '../../../../shared/hooks/useDataApi';
import usePagination from '../../../../shared/hooks/usePagination';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import { useDBMaps } from '../../../../shared/contexts/database';

import toolsURLs from '../../../config/urls';
import idMappingConverter from '../../adapters/idMappingConverter';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';
import { defaultFacets } from '../../../../shared/config/apiUrls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { Location, LocationToPath } from '../../../../app/config/urls';
import {
  MappingAPIModel,
  MappingDetails,
  MappingFlat,
} from '../../types/idMappingSearchResults';
import {
  Namespace,
  namespaceAndToolsLabels,
} from '../../../../shared/types/namespaces';
import Response from '../../../../uniprotkb/types/responseTypes';

const jobType = JobTypes.ID_MAPPING;
const urls = toolsURLs(jobType);
const title = `${namespaceAndToolsLabels[jobType]} results`;

const IDMappingResult = () => {
  const match = useRouteMatch<{ id: string }>(
    LocationToPath[Location.IDMappingResult]
  );
  const location = useLocation();
  const databaseMaps = useDBMaps();
  const { search: queryParamFromUrl } = location;
  const { selectedFacets } = getParamsFromURL(queryParamFromUrl);

  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();

  const detailApiUrl =
    urls.detailsUrl && urls.detailsUrl(match?.params.id || '');
  const { data: detailsData } = useDataApi<MappingDetails>(detailApiUrl);

  const toDBInfo =
    detailsData && databaseMaps?.databaseToDatabaseInfo[detailsData.to];

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

  let namespaceOverride;
  switch (detailsData?.to.toLowerCase()) {
    case Namespace.uniprotkb:
    case 'uniprotkb-swiss-prot':
      namespaceOverride = Namespace.uniprotkb;
      break;
    case Namespace.uniref:
    case 'uniref50':
    case 'uniref90':
    case 'uniref100':
      namespaceOverride = Namespace.uniref;
      break;
    case Namespace.uniparc:
      namespaceOverride = Namespace.uniparc;
      break;
    default:
      namespaceOverride = Namespace.idmapping;
  }

  // Run facet query
  const facets = defaultFacets.get(namespaceOverride);
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

  useMarkJobAsSeen(resultsDataObject.allResults.length, match?.params.id);

  if (
    facetInititialLoading &&
    resultsDataInitialLoading &&
    !facetHasStaleData
  ) {
    return <Loader />;
  }

  const getIdKey = getIdKeyFor(namespaceOverride);

  return (
    <SideBarLayout sidebar={<ResultsFacets dataApiObject={facetsData} />}>
      <HTMLHead
        title={[
          title,
          namespaceOverride !== Namespace.idmapping &&
            namespaceAndToolsLabels[namespaceOverride],
        ]}
      />
      <PageIntro
        title={namespaceAndToolsLabels[namespaceOverride]}
        titlePostscript={
          total && (
            <small>
              for {detailsData?.from} → {detailsData?.to}
            </small>
          )
        }
        resultsCount={total}
      />
      <ResultsButtons
        total={total || 0}
        loadedTotal={resultsDataObject.allResults.length}
        selectedEntries={selectedEntries}
        accessions={resultsDataObject.allResults.map(getIdKey)}
        namespaceOverride={namespaceOverride}
        disableCardToggle
        base={detailsData?.redirectURL}
        notCustomisable={namespaceOverride === Namespace.idmapping}
      />

      {failedIds && (
        <HeroContainer>
          <strong>{failedIds.length}</strong> id
          {failedIds.length === 1 ? ' is' : 's were'} not mapped:
          <ExpandableList descriptionString="ids" numberCollapsedItems={0}>
            {failedIds}
          </ExpandableList>
        </HeroContainer>
      )}
      <ResultsData
        resultsDataObject={resultsDataObject}
        setSelectedItemFromEvent={setSelectedItemFromEvent}
        setSelectedEntries={setSelectedEntries}
        namespaceOverride={namespaceOverride}
        displayIdMappingColumns
      />
    </SideBarLayout>
  );
};

export default IDMappingResult;
