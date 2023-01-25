import { useMemo, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  Loader,
  LongNumber,
  Message,
  PageIntro,
  Tab,
  Tabs,
} from 'franklin-sites';
import { partialRight } from 'lodash-es';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import useNSQuery from '../../../../shared/hooks/useNSQuery';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import { useToolsState } from '../../../../shared/contexts/Tools';
import useMatchWithRedirect from '../../../../shared/hooks/useMatchWithRedirect';
import usePaginatedAccessions from '../../../../shared/hooks/usePaginatedAccessions';

import HTMLHead from '../../../../shared/components/HTMLHead';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import { SidebarLayout } from '../../../../shared/components/layouts/SideBarLayouttest';
import NoResultsPage from '../../../../shared/components/error-pages/NoResultsPage';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import toolsURLs from '../../../config/urls';
import {
  Namespace,
  namespaceAndToolsLabels,
} from '../../../../shared/types/namespaces';
import { Location, changePathnameOnly } from '../../../../app/config/urls';
import peptideSearchConverter from '../../adapters/peptideSearchConverter';

import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { SearchResults } from '../../../../shared/types/results';
import { PeptideSearchResults } from '../../types/peptideSearchResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { Status } from '../../../types/toolsStatuses';
import { FinishedJob } from '../../../types/toolsJob';
import { ToolsState } from '../../../state/toolsInitialState';

import helper from '../../../../shared/styles/helper.module.scss';
import sidebarStyles from '../../../../shared/components/layouts/styles/sidebar-layout.module.scss';

const jobType = JobTypes.PEPTIDE_SEARCH;
const urls = toolsURLs(jobType);
const title = `${namespaceAndToolsLabels[jobType]} results`;

// overview
const PeptideSearchResultTable = lazy(
  () =>
    import(
      /* webpackChunkName: "peptide-search-result-page" */ './PeptideSearchResultTable'
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

enum TabLocation {
  Overview = 'overview',
  InputParameters = 'input-parameters',
  APIRequest = 'api-request',
}

type Params = {
  id: string;
  subPage?: TabLocation;
};

const MAX_FACETS = 1_000;

const PeptideSearchResult = ({
  toolsState,
}: {
  toolsState: NonNullable<ToolsState>;
}) => {
  const match = useMatchWithRedirect<Params>(
    Location.PeptideSearchResult,
    TabLocation
  );

  const jobSubmission = useRef<FinishedJob<JobTypes.PEPTIDE_SEARCH> | null>(
    null
  );
  const jobID = match?.params.id || '';
  const {
    data: jobResultData,
    loading: jobResultLoading,
    error: jobResultError,
    status: jobResultStatus,
  } = useDataApi<PeptideSearchResults>(urls.resultUrl(jobID, {}), {
    headers: { accept: 'text/plain' },
  });

  // Get the job mission from local tools state. Save this in a reference as
  // the job may change with useMarkJobAsSeen but we don't want to have to
  // recreate the converter which will cause usePagination to duplicate rows
  if (!jobSubmission.current) {
    jobSubmission.current =
      Object.values(toolsState).find(
        (
          jobSubmission
        ): jobSubmission is FinishedJob<JobTypes.PEPTIDE_SEARCH> =>
          jobSubmission.status === Status.FINISHED &&
          jobSubmission?.remoteID === jobID
      ) || null;
  }

  const accessions = useMemo(
    () => jobResultData?.split(',').filter(Boolean),
    [jobResultData]
  );

  const excessAccessions = accessions && accessions?.length > MAX_FACETS;

  // Query for facets
  const initialApiFacetUrl = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
    accessions: excessAccessions ? [] : accessions,
  });
  const facetApiObject =
    useDataApiWithStale<SearchResults<UniProtkbAPIModel>>(initialApiFacetUrl);
  const {
    loading: facetInititialLoading,
    headers: facetHeaders,
    isStale: facetHasStaleData,
  } = facetApiObject;
  const facetTotal = facetHeaders?.['x-total-results'];

  const converter = useMemo(() => {
    const peps = jobSubmission.current?.parameters.peps;
    return peps ? partialRight(peptideSearchConverter, peps) : undefined;
  }, [jobSubmission]);

  // TODO: if the user didn't submit this jobSubmission there is no way to get the initial sequence. In the
  // future the API may provide this information in which case we would want to fetch and show
  const resultsDataObject = usePaginatedAccessions(accessions, converter);

  const {
    initialLoading: resultsDataInitialLoading,
    total: resultsDataTotal,
    progress: resultsDataProgress,
  } = resultsDataObject;

  useMarkJobAsSeen(resultsDataObject?.allResults.length, match?.params.id);

  let total: undefined | number;
  if (facetTotal !== undefined) {
    total = +facetTotal;
  }
  if (resultsDataTotal !== undefined) {
    total = +resultsDataTotal;
  }

  if (jobResultError || !match) {
    return <ErrorHandler status={jobResultStatus} />;
  }

  if (
    (!jobResultLoading &&
      !resultsDataInitialLoading &&
      !facetInititialLoading &&
      !total &&
      !excessAccessions) ||
    (!jobResultLoading && accessions?.length === 0) ||
    total === 0
  ) {
    return <NoResultsPage />;
  }

  if (
    jobResultLoading ||
    (facetInititialLoading && resultsDataInitialLoading && !facetHasStaleData)
  ) {
    return <Loader progress={resultsDataProgress} />;
  }

  let sidebar: JSX.Element;
  // Deciding what should be displayed on the sidebar
  switch (match.params.subPage) {
    case TabLocation.InputParameters:
    case TabLocation.APIRequest:
      sidebar = <div className={sidebarStyles['empty-sidebar']} />;
      break;

    default:
      sidebar = (
        <ErrorBoundary>
          <ResultsFacets
            dataApiObject={facetApiObject}
            namespaceOverride={Namespace.uniprotkb}
          />
        </ErrorBoundary>
      );
      break;
  }

  if (excessAccessions) {
    sidebar = <div className={sidebarStyles['empty-sidebar']} />;
  }
  const basePath = `/peptide-search/${match.params.id}/`;

  return (
    <SidebarLayout sidebar={sidebar}>
      <HTMLHead title={title}>
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <PageIntro
        title={namespaceAndToolsLabels[JobTypes.PEPTIDE_SEARCH]}
        titlePostscript={
          total && (
            <small>
              found in {namespaceAndToolsLabels[Namespace.uniprotkb]}
            </small>
          )
        }
        resultsCount={total}
      />
      <Tabs
        active={match.params.subPage}
        className={jobResultLoading ? helper.stale : undefined}
      >
        <Tab
          id={TabLocation.Overview}
          title={
            <Link to={changePathnameOnly(basePath + TabLocation.Overview)}>
              Overview
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            {excessAccessions && (
              <Message level="warning">
                Filters are not supported for peptide results if there are more
                than <LongNumber>{MAX_FACETS}</LongNumber> matches.
              </Message>
            )}

            <PeptideSearchResultTable
              total={total}
              resultsDataObject={resultsDataObject}
              accessions={accessions}
              jobSubmission={jobSubmission}
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
              inputParamsData={jobSubmission.current?.parameters}
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
            <APIRequest
              jobType={jobType}
              inputParamsData={jobSubmission.current?.parameters}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

const PeptideSearchResultWithToolsState = () => {
  const toolsState = useToolsState();
  return toolsState === null ? (
    <Loader />
  ) : (
    <PeptideSearchResult toolsState={toolsState} />
  );
};

export default PeptideSearchResultWithToolsState;
