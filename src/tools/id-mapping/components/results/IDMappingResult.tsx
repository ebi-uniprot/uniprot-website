import { useMemo, lazy, Suspense } from 'react';
import { Loader, PageIntro, Tab, Tabs } from 'franklin-sites';
import { Link, useLocation } from 'react-router-dom';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';
import usePagination from '../../../../shared/hooks/usePagination';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import useDatabaseInfoMaps from '../../../../shared/hooks/useDatabaseInfoMaps';
import { useMatchWithRedirect } from '../../../utils/hooks';

import { rawDBToNamespace } from '../../utils';
import toolsURLs from '../../../config/urls';
import idMappingConverter from '../../adapters/idMappingConverter';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';
import { defaultFacets } from '../../../../shared/config/apiUrls';

import { JobTypes } from '../../../types/toolsJobTypes';
import {
  changePathnameOnly,
  IDMappingNamespaces,
  Location,
} from '../../../../app/config/urls';
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

// overview
const IDMappingResultTable = lazy(
  () =>
    import(
      /* webpackChunkName: "id-mapping-result-page" */ './IDMappingResultTable'
    )
);
// input-parameters
const InputParameters = lazy(
  () =>
    import(
      /* webpackChunkName: "input-parameters" */ '../../../components/InputParameters'
    )
);
// input-parameters
// const APIRequest = lazy(
//   () =>
//     import(
//       /* webpackChunkName: "api-request" */ '../../../components/APIRequest'
//     )
// );

enum TabLocation {
  Overview = 'overview',
  InputParameters = 'input-parameters',
  APIRequest = 'api-request',
}

type Params = {
  id: string;
  namespace?: typeof IDMappingNamespaces[number];
  subPage?: TabLocation;
};

const IDMappingResult = () => {
  const location = useLocation();
  const match = useMatchWithRedirect<Params>(
    Location.IDMappingResult,
    TabLocation.Overview
  );

  const databaseInfoMaps = useDatabaseInfoMaps();

  const [{ selectedFacets, query }] = getParamsFromURL(location.search);

  const detailApiUrl =
    urls.detailsUrl && urls.detailsUrl(match?.params.id || '');
  const detailsDataObject = useDataApi<MappingDetails>(detailApiUrl);
  const { data: detailsData, error, status } = detailsDataObject;

  const toDBInfo =
    detailsData && databaseInfoMaps?.databaseToDatabaseInfo[detailsData.to];

  // Query for results data from the idmapping endpoint
  const initialApiUrl =
    detailsData?.redirectURL &&
    urls.resultUrl(detailsData.redirectURL, { selectedFacets, query });

  const converter = useMemo(() => idMappingConverter(toDBInfo), [toDBInfo]);

  const resultsDataObject = usePagination<MappingAPIModel, MappingFlat>(
    initialApiUrl,
    converter
  );

  const {
    initialLoading: resultsDataInitialLoading,
    progress,
    total,
  } = resultsDataObject;

  const namespaceOverride = rawDBToNamespace(detailsData?.to);

  // Run facet query
  const facets = defaultFacets.get(namespaceOverride);
  const facetsUrl =
    detailsData?.redirectURL &&
    facets &&
    urls.resultUrl(detailsData.redirectURL, {
      facets,
      size: 0,
      selectedFacets,
      query,
    });
  const facetsData = useDataApiWithStale<Response['data']>(facetsUrl);

  const { loading: facetInititialLoading, isStale: facetHasStaleData } =
    facetsData;

  useMarkJobAsSeen(resultsDataObject.allResults.length, match?.params.id);

  if (error || !match) {
    return <ErrorHandler status={status} />;
  }

  if (
    facetInititialLoading &&
    resultsDataInitialLoading &&
    !facetHasStaleData
  ) {
    return <Loader progress={progress} />;
  }

  let sidebar: JSX.Element;
  // Deciding what should be displayed on the sidebar
  switch (match.params.subPage) {
    case TabLocation.InputParameters:
    case TabLocation.APIRequest:
      sidebar = <div className="sidebar-layout__sidebar-content--empty" />;
      break;

    default:
      sidebar = (
        <ErrorBoundary>
          <ResultsFacets dataApiObject={facetsData} />
        </ErrorBoundary>
      );
      break;
  }

  const basePath = `/id-mapping/${
    namespaceOverride === Namespace.idmapping ? '' : `${namespaceOverride}/`
  }${match.params.id}/`;

  return (
    <SideBarLayout
      title={
        <PageIntro
          title={namespaceAndToolsLabels[Namespace.idmapping]}
          titlePostscript={
            total && (
              <small>
                found for {detailsData?.from} → {detailsData?.to}
              </small>
            )
          }
          resultsCount={total}
        />
      }
      sidebar={sidebar}
    >
      <HTMLHead
        title={[
          title,
          namespaceOverride !== Namespace.idmapping &&
            namespaceAndToolsLabels[namespaceOverride],
        ]}
      />
      <Tabs active={match.params.subPage}>
        <Tab
          id={TabLocation.Overview}
          title={
            <Link to={changePathnameOnly(basePath + TabLocation.Overview)}>
              Overview
            </Link>
          }
          cache
        >
          <Suspense fallback={<Loader />}>
            <IDMappingResultTable
              namespaceOverride={namespaceOverride}
              resultsDataObject={resultsDataObject}
              detailsData={detailsData}
            />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.InputParameters}
          title={
            <Link
              to={changePathnameOnly(basePath + TabLocation.InputParameters)}
            >
              Input Parameters
            </Link>
          }
        >
          <HTMLHead title={[title, 'Input Parameters']} />
          <Suspense fallback={<Loader />}>
            <InputParameters
              id={match.params.id}
              inputParamsData={detailsDataObject}
              jobType={jobType}
            />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.APIRequest}
          title={
            <Link to={changePathnameOnly(basePath + TabLocation.APIRequest)}>
              API Request
            </Link>
          }
        >
          <HTMLHead title={[title, 'API Request']} />
          <Suspense fallback={<Loader />}>
            {/* <APIRequest jobType={jobType} inputParamsData={inputParamsData} /> */}
          </Suspense>
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default IDMappingResult;
