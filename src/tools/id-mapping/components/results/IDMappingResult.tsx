import { useMemo, lazy, Suspense } from 'react';
import { Loader, PageIntro, Tab, Tabs } from 'franklin-sites';
import { Link, useLocation } from 'react-router-dom';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import usePagination from '../../../../shared/hooks/usePagination';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import useMatchWithRedirect from '../../../../shared/hooks/useMatchWithRedirect';
import useIDMappingDetails from '../../../../shared/hooks/useIDMappingDetails';
import useDataApi from '../../../../shared/hooks/useDataApi';

import { rawDBToNamespace } from '../../utils';
import toolsURLs from '../../../config/urls';
import idMappingConverter from '../../adapters/idMappingConverter';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';
import apiUrls, { defaultFacets } from '../../../../shared/config/apiUrls';

import { SearchResults } from '../../../../shared/types/results';
import { JobTypes } from '../../../types/toolsJobTypes';
import {
  changePathnameOnly,
  IDMappingNamespaces,
  Location,
} from '../../../../app/config/urls';
import {
  MappingAPIModel,
  MappingFlat,
} from '../../types/idMappingSearchResults';
import {
  Namespace,
  namespaceAndToolsLabels,
} from '../../../../shared/types/namespaces';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { IDMappingFormConfig } from '../../types/idMappingFormConfig';

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
const APIRequest = lazy(
  () =>
    import(
      /* webpackChunkName: "api-request" */ '../../../components/APIRequest'
    )
);

export const findUriLink = (fields?: IDMappingFormConfig, dbName?: string) => {
  if (!fields || !dbName) {
    return null;
  }
  for (const group of fields.groups) {
    for (const item of group.items) {
      if (item.name === dbName) {
        return item.uriLink;
      }
    }
  }
  return null;
};

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
    TabLocation
  );
  const idMappingDetails = useIDMappingDetails();
  const {
    data: detailsData,
    loading: detailsLoading,
    error: detailsError,
  } = idMappingDetails || {};

  const [{ selectedFacets, query, sortColumn, sortDirection }] =
    getParamsFromURL(location.search);

  const { loading: fieldsLoading, data: fieldsData } =
    useDataApi<IDMappingFormConfig>(apiUrls.idMappingFields);

  // Query for results data from the idmapping endpoint
  const initialApiUrl =
    detailsData?.redirectURL &&
    urls.resultUrl(detailsData.redirectURL, {
      selectedFacets,
      query,
      sortColumn,
      sortDirection,
    });

  const converter = useMemo(
    () => idMappingConverter(findUriLink(fieldsData, detailsData?.to)),
    [fieldsData, detailsData?.to]
  );

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
  const facetsData =
    useDataApiWithStale<SearchResults<UniProtkbAPIModel>>(facetsUrl);

  const { loading: facetInititialLoading, isStale: facetHasStaleData } =
    facetsData;

  useMarkJobAsSeen(resultsDataObject.allResults.length, match?.params.id);

  if (!match || detailsError) {
    return <ErrorHandler />;
  }

  if (
    facetInititialLoading &&
    resultsDataInitialLoading &&
    !facetHasStaleData
  ) {
    return <Loader progress={progress} />;
  }

  if (detailsLoading || fieldsLoading) {
    return <Loader />;
  }

  if (!detailsData) {
    return <ErrorHandler />;
  }

  let sidebar: JSX.Element;
  // Deciding what should be displayed on the sidebar
  switch (match.params.subPage) {
    case TabLocation.InputParameters:
    case TabLocation.APIRequest:
      sidebar = <div className="sidebar-layout__sidebar-content--empty" />;
      break;

    default:
      if (namespaceOverride === Namespace.idmapping) {
        sidebar = <div className="sidebar-layout__sidebar-content--empty" />;
      } else {
        sidebar = (
          <ErrorBoundary>
            <ResultsFacets dataApiObject={facetsData} />
          </ErrorBoundary>
        );
      }
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
      >
        <meta name="robots" content="noindex" />
      </HTMLHead>
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
              inputParamsData={idMappingDetails}
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
            <APIRequest jobType={jobType} inputParamsData={idMappingDetails} />
          </Suspense>
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default IDMappingResult;
