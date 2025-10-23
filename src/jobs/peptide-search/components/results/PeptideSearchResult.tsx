import {
  Loader,
  LongNumber,
  Message,
  PageIntro,
  Tab,
  Tabs,
} from 'franklin-sites';
import { partialRight } from 'lodash-es';
import { lazy, Suspense, useEffect, useMemo, useReducer } from 'react';
import { Link } from 'react-router-dom';
import joinUrl from 'url-join';

import {
  changePathnameOnly,
  Location,
  LocationToPath,
} from '../../../../app/config/urls';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import NoResultsPage from '../../../../shared/components/error-pages/full-pages/NoResultsPage';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SidebarLayout } from '../../../../shared/components/layouts/SideBarLayout';
import sidebarStyles from '../../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import { apiPrefix } from '../../../../shared/config/apiUrls/apiPrefix';
import { MAX_PEPTIDE_FACETS_OR_DOWNLOAD } from '../../../../shared/config/limits';
import useDataApi, { CustomError } from '../../../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import useMatchWithRedirect from '../../../../shared/hooks/useMatchWithRedirect';
import useNSQuery from '../../../../shared/hooks/useNSQuery';
import usePaginatedAccessions from '../../../../shared/hooks/usePaginatedAccessions';
import helper from '../../../../shared/styles/helper.module.scss';
import {
  Namespace,
  namespaceAndToolsLabels,
} from '../../../../shared/types/namespaces';
import { SearchResults } from '../../../../shared/types/results';
import { stringifyUrl } from '../../../../shared/utils/url';
import {
  TaxonomyAPIModel,
  TaxonomyDatum,
} from '../../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import toolsURLs from '../../../config/urls';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import { JobTypes } from '../../../types/jobTypes';
import peptideSearchConverter from '../../adapters/peptideSearchConverter';
import { FormParameters } from '../../types/peptideSearchFormParameters';
import { PeptideSearchResults } from '../../types/peptideSearchResults';

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

enum ServerJobParameters {
  QueryPetides = 'QueryPetides',
  TaxonIds = 'TaxonIds',
  lEqi = 'lEqi',
  swissProtOnly = 'swissProtOnly',
}

type ParsedParams = {
  peps: string;
  lEQi: 'on' | 'off';
  spOnly: 'on' | 'off';
  taxonIds: string;
};

type State = {
  // Route
  jobID: string;
  subPage?: TabLocation;
  basePath: string;

  // Network state/data
  jobResultError?: CustomError | undefined;
  jobResultStatus?: number;
  jobResultLoading: boolean;
  jobParameters?: string;
  jobResultData?: string;

  taxonomyLoading: boolean;
  taxonomyData?: SearchResults<TaxonomyAPIModel>;

  facetInititialLoading: boolean;
  facetHasStaleData: boolean;

  resultsInitialLoading: boolean;
  progress?: number;
  allResultsLen?: number;

  // Derived
  parsedParams: ParsedParams;
  jobInputParameters: FormParameters;
  accessions?: string[];
  excessAccessions: boolean;
  total?: number;

  // UI
  isLoading: boolean;
  showNoResults: boolean;
  showSidebarEmpty: boolean;
  showIdMappingWarning: boolean;
};

type SyncPayload = Partial<
  Pick<
    State,
    | 'jobID'
    | 'subPage'
    | 'jobResultError'
    | 'jobResultStatus'
    | 'jobResultLoading'
    | 'jobParameters'
    | 'jobResultData'
    | 'taxonomyLoading'
    | 'taxonomyData'
    | 'facetInititialLoading'
    | 'facetHasStaleData'
    | 'resultsInitialLoading'
    | 'progress'
    | 'allResultsLen'
  >
>;

type Action = { type: 'SYNC'; payload: SyncPayload };

const initialParsed: ParsedParams = {
  peps: '',
  lEQi: 'off',
  spOnly: 'off',
  taxonIds: '',
};

const BASE_PATH = '/peptide-search' as const;

const initialState: State = {
  jobID: '',
  basePath: BASE_PATH,
  jobResultLoading: true,
  taxonomyLoading: true,
  facetInititialLoading: true,
  facetHasStaleData: false,
  resultsInitialLoading: true,
  parsedParams: initialParsed,
  jobInputParameters: { peps: '', lEQi: 'off', spOnly: 'off' },
  excessAccessions: false,
  isLoading: true,
  showNoResults: false,
  showSidebarEmpty: false,
  showIdMappingWarning: false,
};

const parseJobParameters = (str?: string): ParsedParams => {
  if (!str) {
    return initialParsed;
  }
  let peps = '';
  let lEQi: ParsedParams['lEQi'] = 'off';
  let spOnly: ParsedParams['spOnly'] = 'off';
  let taxonIds = '';
  str.split(/\n/).forEach((line) => {
    const [key, value] = line.split(':');
    switch (key) {
      case ServerJobParameters.QueryPetides:
        peps = value;
        break;
      case ServerJobParameters.TaxonIds:
        if (value) {
          taxonIds = value;
        }
        break;
      case ServerJobParameters.lEqi:
        lEQi = value === 'Y' ? 'on' : 'off';
        break;
      case ServerJobParameters.swissProtOnly:
        spOnly = value === 'Y' ? 'on' : 'off';
        break;
      default:
    }
  });
  return { peps, lEQi, spOnly, taxonIds };
};

const getJobInputParameters = (
  parsed: ParsedParams,
  taxonomyLoading: boolean,
  taxonomyData?: SearchResults<TaxonomyAPIModel>
): FormParameters => {
  const jobInputParameters: FormParameters = {
    peps: parsed.peps,
    lEQi: parsed.lEQi,
    spOnly: parsed.spOnly,
  };
  if (!taxonomyLoading && taxonomyData?.results?.length) {
    jobInputParameters.taxIds = taxonomyData.results.map(
      (t: TaxonomyDatum) => ({
        id: String(t.taxonId),
        label: `${t.scientificName} [${t.taxonId}]`,
      })
    );
  }
  return jobInputParameters;
};

const parseAccessions = (csv?: string): string[] | undefined => {
  return csv?.split(',').filter(Boolean);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SYNC': {
      const merged = { ...state, ...action.payload };

      const basePath = joinUrl(BASE_PATH, merged.jobID);

      const parsedParams = parseJobParameters(merged.jobParameters);

      const jobInputParameters = getJobInputParameters(
        parsedParams,
        !!merged.taxonomyLoading,
        merged.taxonomyData
      );

      const accessions = parseAccessions(merged.jobResultData);

      const excessAccessions =
        Array.isArray(accessions) &&
        accessions.length > MAX_PEPTIDE_FACETS_OR_DOWNLOAD;

      const isLoading =
        !!merged.jobResultLoading ||
        accessions === undefined ||
        !!merged.resultsInitialLoading ||
        (!!merged.facetInititialLoading && !merged.facetHasStaleData);

      const total =
        !isLoading && typeof merged.allResultsLen !== 'undefined'
          ? merged.allResultsLen
          : undefined;

      const noAccessions = Array.isArray(accessions) && accessions.length === 0;
      const showNoResults = !excessAccessions && !isLoading && noAccessions;

      const showSidebarEmpty =
        excessAccessions ||
        merged.subPage === TabLocation.InputParameters ||
        merged.subPage === TabLocation.APIRequest;

      const showIdMappingWarning = !!excessAccessions;

      return {
        ...merged,
        basePath,
        parsedParams,
        jobInputParameters,
        accessions,
        excessAccessions,
        isLoading,
        total,
        showNoResults,
        showSidebarEmpty,
        showIdMappingWarning,
      };
    }
    default:
      return state;
  }
};

const PeptideSearchResult = () => {
  const match = useMatchWithRedirect<Params>(
    Location.PeptideSearchResult,
    TabLocation
  );
  const jobID = match?.params.id || '';

  const {
    data: jobResultData,
    loading: jobResultLoading,
    error: jobResultError,
    status: jobResultStatus,
  } = useDataApi<PeptideSearchResults>(urls.resultUrl(jobID, {}), {
    headers: { Accept: 'text/plain' },
  });

  const { data: jobParameters } = useDataApi<PeptideSearchResults>(
    urls.detailsUrl?.(jobID),
    {
      headers: { Accept: 'text/plain' },
    }
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: taxonomyData, loading: taxonomyLoading } = useDataApi<
    SearchResults<TaxonomyAPIModel>
  >(
    state.parsedParams.taxonIds
      ? stringifyUrl(
          joinUrl(
            apiPrefix,
            Namespace.taxonomy,
            'taxonIds',
            state.parsedParams.taxonIds
          ),
          { fields: 'scientific_name' }
        )
      : null
  );

  const initialApiFacetUrl = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
    accessions: state.excessAccessions ? [] : state.accessions,
  });

  const facetApiObject =
    useDataApiWithStale<SearchResults<UniProtkbAPIModel>>(initialApiFacetUrl);

  const converter = useMemo(() => {
    const pepSeq = state.jobInputParameters.peps;
    return pepSeq ? partialRight(peptideSearchConverter, pepSeq) : undefined;
  }, [state.jobInputParameters.peps]);

  const resultsDataObject = usePaginatedAccessions(state.accessions, converter);

  useMarkJobAsSeen(resultsDataObject?.allResults.length, jobID);

  useEffect(() => {
    dispatch({
      type: 'SYNC',
      payload: {
        jobID,
        subPage: match?.params.subPage,
        jobResultError,
        jobResultStatus,
        jobResultLoading,
        jobParameters,
        jobResultData,
        taxonomyLoading,
        taxonomyData,
        facetInititialLoading: facetApiObject.loading,
        facetHasStaleData: !!facetApiObject.isStale,
        resultsInitialLoading: resultsDataObject.initialLoading,
        progress: resultsDataObject.progress,
        allResultsLen: resultsDataObject?.allResults?.length,
      },
    });
  }, [
    jobID,
    match?.params.subPage,
    jobResultError,
    jobResultStatus,
    jobResultLoading,
    jobParameters,
    jobResultData,
    taxonomyLoading,
    taxonomyData,
    facetApiObject.loading,
    facetApiObject.isStale,
    resultsDataObject.initialLoading,
    resultsDataObject.progress,
    resultsDataObject?.allResults?.length,
  ]);

  if (state.jobResultError || !match) {
    return (
      <ErrorHandler
        status={state.jobResultStatus}
        error={state.jobResultError}
        fullPage
      />
    );
  }

  if (state.isLoading) {
    return <Loader progress={state.progress} />;
  }

  if (state.showNoResults) {
    return <NoResultsPage />;
  }

  const sidebar = state.showSidebarEmpty ? (
    <div className={sidebarStyles['empty-sidebar']} />
  ) : (
    <ErrorBoundary>
      <ResultsFacets
        dataApiObject={facetApiObject}
        namespaceOverride={Namespace.uniprotkb}
      />
    </ErrorBoundary>
  );

  return (
    <SidebarLayout sidebar={sidebar}>
      <HTMLHead title={title}>
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <PageIntro
        heading={namespaceAndToolsLabels[JobTypes.PEPTIDE_SEARCH]}
        headingPostscript={
          state.total && (
            <small key="postscript">
              found in {namespaceAndToolsLabels[Namespace.uniprotkb]}
            </small>
          )
        }
        resultsCount={state.total}
      />
      <Tabs
        active={match.params.subPage}
        className={state.isLoading ? helper.stale : undefined}
      >
        <Tab
          id={TabLocation.Overview}
          title={
            <Link
              to={changePathnameOnly(
                joinUrl(state.basePath, TabLocation.Overview)
              )}
            >
              Overview
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            {state.showIdMappingWarning && (
              <Message level="warning">
                <small>
                  To filter peptide search results of more than{' '}
                  <LongNumber>{MAX_PEPTIDE_FACETS_OR_DOWNLOAD}</LongNumber>{' '}
                  matches, please use the{' '}
                  <Link
                    to={{
                      pathname: LocationToPath[Location.IDMapping],
                      state: {
                        parameters: {
                          ids: state.accessions,
                          name: `Peptide search matches`,
                        },
                      },
                    }}
                  >
                    ID Mapping
                  </Link>{' '}
                  service.
                </small>
              </Message>
            )}
            <PeptideSearchResultTable
              total={state.total}
              resultsDataObject={resultsDataObject}
              accessions={state.accessions}
              inputParamsData={state.jobInputParameters}
            />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.InputParameters}
          title={
            <Link
              to={changePathnameOnly(
                joinUrl(state.basePath, TabLocation.InputParameters)
              )}
            >
              Input Parameters
            </Link>
          }
        >
          <HTMLHead title={[title, 'Input Parameters']} />
          <Suspense fallback={<Loader />}>
            <InputParameters
              id={match.params.id}
              inputParamsData={state.jobInputParameters}
              jobType={jobType}
            />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.APIRequest}
          title={
            <Link
              to={changePathnameOnly(
                joinUrl(state.basePath, TabLocation.APIRequest)
              )}
            >
              API Request
            </Link>
          }
        >
          <HTMLHead title={[title, 'API Request']} />
          <Suspense fallback={<Loader />}>
            <APIRequest
              jobType={jobType}
              inputParamsData={state.jobInputParameters}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

export default PeptideSearchResult;
