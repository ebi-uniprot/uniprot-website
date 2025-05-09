import { Loader, Message, PageIntro, Tab, Tabs } from 'franklin-sites';
import { partition, uniqBy } from 'lodash-es';
import { lazy, Suspense, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  changePathnameOnly,
  IDMappingNamespaces,
  Location,
} from '../../../../app/config/urls';
import { MessageLevel } from '../../../../messages/types/messagesTypes';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import JobErrorPage from '../../../../shared/components/error-pages/full-pages/JobErrorPage';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SidebarLayout } from '../../../../shared/components/layouts/SideBarLayout';
import sidebarStyles from '../../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { defaultFacets } from '../../../../shared/config/facets';
import useColumnNames from '../../../../shared/hooks/useColumnNames';
import useDataApi from '../../../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import useIDMappingDetails from '../../../../shared/hooks/useIDMappingDetails';
import useMatchWithRedirect from '../../../../shared/hooks/useMatchWithRedirect';
import usePagination from '../../../../shared/hooks/usePagination';
import {
  Namespace,
  namespaceAndToolsLabels,
} from '../../../../shared/types/namespaces';
import { SearchResults } from '../../../../shared/types/results';
import * as logging from '../../../../shared/utils/logging';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';
import toolsURLs from '../../../config/urls';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import { JobTypes } from '../../../types/jobTypes';
import idMappingConverter from '../../adapters/idMappingConverter';
import { IDMappingFormConfig } from '../../types/idMappingFormConfig';
import {
  MappingAPIModel,
  MappingErrorCode,
  MappingFlat,
  MappingWarningCode,
  MappingWarningsErrors,
} from '../../types/idMappingSearchResults';
import { ServerParameters } from '../../types/idMappingServerParameters';
import { rawDBToNamespace } from '../../utils';
import styles from './styles/id-mapping-result.module.scss';

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
  namespace?: (typeof IDMappingNamespaces)[number];
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
    status: detailsStatus,
  } = idMappingDetails || {};

  const [{ selectedFacets, query, sortColumn, sortDirection }] =
    getParamsFromURL(location.search);

  const { loading: fieldsLoading, data: fieldsData } =
    useDataApi<IDMappingFormConfig>(apiUrls.configure.idMappingFields);

  const namespaceOverride = rawDBToNamespace(detailsData?.to);

  const { columnNames } = useColumnNames({
    namespaceOverride,
  });

  // Query for results data from the idmapping endpoint
  const initialApiUrl =
    detailsData?.redirectURL &&
    urls.resultUrl(detailsData.redirectURL, {
      selectedFacets,
      query,
      sortColumn,
      sortDirection,
      columns: columnNames,
      facets: [],
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
  const facetsDataApiObject = useDataApiWithStale<
    MappingWarningsErrors & SearchResults<UniProtkbAPIModel>
  >(facetsUrl);

  const {
    loading: facetInititialLoading,
    isStale: facetHasStaleData,
    data: facetsData,
  } = facetsDataApiObject;

  useMarkJobAsSeen(resultsDataObject.allResults.length, match?.params.id);

  const [warnings, notCustomisable] = useMemo(() => {
    const allWarnings = uniqBy(
      [...(detailsData?.warnings || []), ...(facetsData?.warnings || [])],
      'code'
    );
    const [warningsRecognized, warningsUnrecognized] = partition(
      allWarnings,
      ({ code }) => code in MappingWarningCode
    );
    /* istanbul ignore if */
    if (warningsUnrecognized.length) {
      logging.warn(
        `Unrecognized ID Mapping warning codes found for job ID ${
          match?.params.id
        } ${JSON.stringify(warningsUnrecognized)}`
      );
    }
    const notCustomisable = warningsRecognized.some(
      ({ code }) => code === MappingWarningCode.EnrichmentDisabled
    );
    return [warningsRecognized, notCustomisable];
  }, [detailsData?.warnings, facetsData?.warnings, match?.params.id]);

  const errors = useMemo(() => {
    const allErrors = uniqBy(
      [...(detailsData?.errors || []), ...(facetsData?.errors || [])],
      'code'
    );
    const [errorsRecognized, errorsUnrecognized] = partition(
      allErrors,
      ({ code }) => code in MappingErrorCode
    );
    /* istanbul ignore if */
    if (errorsUnrecognized.length) {
      logging.warn(
        `Unrecognized ID Mapping error codes found for job ID ${
          match?.params.id
        } ${JSON.stringify(errorsUnrecognized)}`
      );
    }
    return errorsRecognized;
  }, [detailsData?.errors, facetsData?.errors, match?.params.id]);

  if (!match || detailsError) {
    return (
      <ErrorHandler status={detailsStatus} error={detailsError} fullPage />
    );
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
    return <ErrorHandler fullPage />;
  }

  if (errors.length) {
    return (
      <JobErrorPage
        message={
          <ul className="no-bullet">
            {errors.map(({ code, message }) => (
              <li key={code}>{message}</li>
            ))}
          </ul>
        }
      />
    );
  }

  let sidebar: JSX.Element;
  // Deciding what should be displayed on the sidebar
  switch (match.params.subPage) {
    case TabLocation.InputParameters:
    case TabLocation.APIRequest:
      sidebar = <div className={sidebarStyles['empty-sidebar']} />;
      break;

    default:
      if (
        namespaceOverride === Namespace.idmapping ||
        (!facetInititialLoading && !facetsData?.facets)
      ) {
        sidebar = <div className={sidebarStyles['empty-sidebar']} />;
      } else {
        sidebar = (
          <ErrorBoundary>
            <ResultsFacets dataApiObject={facetsDataApiObject} />
          </ErrorBoundary>
        );
      }
      break;
  }

  const basePath = `/id-mapping/${
    namespaceOverride === Namespace.idmapping ? '' : `${namespaceOverride}/`
  }${match.params.id}/`;

  return (
    <SidebarLayout sidebar={sidebar}>
      <HTMLHead
        title={[
          title,
          namespaceOverride !== Namespace.idmapping &&
            namespaceAndToolsLabels[namespaceOverride],
        ]}
      >
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <PageIntro
        heading={namespaceAndToolsLabels[Namespace.idmapping]}
        headingPostscript={
          total ? (
            /* Not sure why fragments and keys are needed, but otherwise gets
            the React key warnings messages and children are rendered as array */
            <small key="postscript">
              found for {detailsData?.from} → {detailsData?.to}
            </small>
          ) : null
        }
        resultsCount={total}
      />
      {!!warnings.length && (
        <Message level={MessageLevel.WARNING} className={styles.warnings}>
          <small>
            <ul className="no-bullet">
              {warnings.map(({ message, code }) => (
                <li key={code}>
                  {message}
                  {code === MappingWarningCode.FiltersDisabled && (
                    <span>
                      . You can query the results by entering a search query in
                      the search bar or by using the Advanced search.
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </small>
        </Message>
      )}
      <Tabs active={match.params.subPage}>
        <Tab
          id={TabLocation.Overview}
          title={
            <Link to={changePathnameOnly(basePath + TabLocation.Overview)}>
              Overview
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <IDMappingResultTable
              namespaceOverride={
                notCustomisable ? Namespace.idmapping : namespaceOverride
              }
              resultsDataObject={resultsDataObject}
              detailsData={detailsData}
              notCustomisable={notCustomisable}
              inputParamsData={detailsData as ServerParameters}
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
    </SidebarLayout>
  );
};

export default IDMappingResult;
