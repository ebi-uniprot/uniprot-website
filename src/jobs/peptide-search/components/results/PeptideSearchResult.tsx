import {
  Loader,
  LongNumber,
  Message,
  PageIntro,
  Tab,
  Tabs,
} from 'franklin-sites';
import { partialRight } from 'lodash-es';
import { lazy, Suspense, useMemo } from 'react';
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
import useDataApi from '../../../../shared/hooks/useDataApi';
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
// api-request
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

const initialParsed: ParsedParams = {
  peps: '',
  lEQi: 'off',
  spOnly: 'off',
  taxonIds: '',
};

const parseJobParameters = (jobParameters?: string): ParsedParams => {
  if (!jobParameters) {
    return initialParsed;
  }

  let peps = '';
  let lEQi: ParsedParams['lEQi'] = 'off';
  let spOnly: ParsedParams['spOnly'] = 'off';
  let taxonIds = '';

  jobParameters.split(/\n/).forEach((line) => {
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

const parseAccessions = (csv?: string): string[] | undefined =>
  csv?.split(',').filter(Boolean);

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
    { headers: { Accept: 'text/plain' } }
  );

  const parsedParams = useMemo(
    () => parseJobParameters(jobParameters),
    [jobParameters]
  );

  const { data: taxonomyData, loading: taxonomyLoading } = useDataApi<
    SearchResults<TaxonomyAPIModel>
  >(
    parsedParams.taxonIds
      ? stringifyUrl(
          joinUrl(
            apiPrefix,
            Namespace.taxonomy,
            'taxonIds',
            parsedParams.taxonIds
          ),
          { fields: 'scientific_name' }
        )
      : null
  );

  const jobInputParameters = useMemo(
    () => getJobInputParameters(parsedParams, taxonomyLoading, taxonomyData),
    [parsedParams, taxonomyLoading, taxonomyData]
  );

  const accessions = useMemo(
    () => parseAccessions(jobResultData),
    [jobResultData]
  );

  const hasExcessAccessions =
    Array.isArray(accessions) &&
    accessions.length > MAX_PEPTIDE_FACETS_OR_DOWNLOAD;

  const initialApiFacetUrl = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
    accessions: hasExcessAccessions ? [] : accessions,
  });

  const facetApiObject =
    useDataApiWithStale<SearchResults<UniProtkbAPIModel>>(initialApiFacetUrl);

  const converter = useMemo(() => {
    const pepSeq = jobInputParameters.peps;
    return pepSeq ? partialRight(peptideSearchConverter, pepSeq) : undefined;
  }, [jobInputParameters.peps]);

  const resultsDataObject = usePaginatedAccessions(accessions, converter);

  useMarkJobAsSeen(resultsDataObject?.allResults?.length, jobID);

  if (jobResultError || !match) {
    return (
      <ErrorHandler status={jobResultStatus} error={jobResultError} fullPage />
    );
  }

  if (
    jobResultLoading ||
    accessions === undefined ||
    resultsDataObject.initialLoading ||
    (facetApiObject.loading && !facetApiObject.isStale)
  ) {
    return <Loader progress={resultsDataObject.progress} />;
  }

  if (!hasExcessAccessions && accessions.length === 0) {
    return <NoResultsPage />;
  }

  const total = resultsDataObject?.allResults?.length;

  const basePath = joinUrl('/peptide-search', jobID);

  const showSidebarEmpty =
    hasExcessAccessions ||
    match?.params.subPage === TabLocation.InputParameters ||
    match?.params.subPage === TabLocation.APIRequest;

  const sidebar = showSidebarEmpty ? (
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
          total && (
            <small key="postscript">
              found in {namespaceAndToolsLabels[Namespace.uniprotkb]}
            </small>
          )
        }
        resultsCount={total}
      />

      <Tabs
        active={match.params.subPage}
        className={facetApiObject.isStale ? helper.stale : undefined}
      >
        <Tab
          id={TabLocation.Overview}
          title={
            <Link
              to={changePathnameOnly(joinUrl(basePath, TabLocation.Overview))}
            >
              Overview
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            {hasExcessAccessions && (
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
                          ids: accessions,
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
              total={total}
              resultsDataObject={resultsDataObject}
              accessions={accessions}
              inputParamsData={jobInputParameters}
            />
          </Suspense>
        </Tab>

        <Tab
          id={TabLocation.InputParameters}
          title={
            <Link
              to={changePathnameOnly(
                joinUrl(basePath, TabLocation.InputParameters)
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
              inputParamsData={jobInputParameters}
              jobType={jobType}
            />
          </Suspense>
        </Tab>

        <Tab
          id={TabLocation.APIRequest}
          title={
            <Link
              to={changePathnameOnly(joinUrl(basePath, TabLocation.APIRequest))}
            >
              API Request
            </Link>
          }
        >
          <HTMLHead title={[title, 'API Request']} />
          <Suspense fallback={<Loader />}>
            <APIRequest
              jobType={jobType}
              inputParamsData={jobInputParameters}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

export default PeptideSearchResult;
