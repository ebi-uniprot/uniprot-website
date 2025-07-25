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
import { Link } from 'react-router';

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

enum ServerJobParameters {
  QueryPetides = 'QueryPetides',
  TaxonIds = 'TaxonIds',
  lEqi = 'lEqi',
  swissProtOnly = 'swissProtOnly',
}

const PeptideSearchResult = () => {
  const match = useMatchWithRedirect(Location.PeptideSearchResult, TabLocation);

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

  const jobInputParameters: FormParameters = {
    peps: '',
    lEQi: 'off',
    spOnly: 'off',
  };
  let taxonIds = '';
  jobParameters?.split(/\n/)?.forEach((keyValuePair) => {
    const [key, value] = keyValuePair.split(':');
    switch (key) {
      case ServerJobParameters.QueryPetides:
        jobInputParameters.peps = value;
        break;
      case ServerJobParameters.TaxonIds:
        if (value) {
          taxonIds = value;
        }
        break;
      case ServerJobParameters.lEqi:
        jobInputParameters.lEQi = value === 'Y' ? 'on' : 'off';
        break;
      case ServerJobParameters.swissProtOnly:
        jobInputParameters.spOnly = value === 'Y' ? 'on' : 'off';
        break;
      default:
    }
  });

  const { data: taxonomyData, loading: taxonomyLoading } = useDataApi<
    SearchResults<TaxonomyAPIModel>
  >(
    taxonIds
      ? `${apiPrefix}/${Namespace.taxonomy}/taxonIds/${taxonIds}?fields=scientific_name`
      : undefined
  );

  if (!taxonomyLoading && taxonomyData) {
    jobInputParameters.taxIds = taxonomyData?.results?.map(
      (taxon: TaxonomyDatum) => ({
        id: taxon.taxonId.toString(),
        label: `${taxon.scientificName} [${taxon.taxonId}]`,
      })
    );
  }

  const accessions = useMemo(
    () => jobResultData?.split(',').filter(Boolean),
    [jobResultData]
  );

  const excessAccessions =
    accessions && accessions?.length > MAX_PEPTIDE_FACETS_OR_DOWNLOAD;

  // Query for facets
  const initialApiFacetUrl = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
    accessions: excessAccessions ? [] : accessions,
  });
  const facetApiObject =
    useDataApiWithStale<SearchResults<UniProtkbAPIModel>>(initialApiFacetUrl);
  const { loading: facetInititialLoading, isStale: facetHasStaleData } =
    facetApiObject;

  const converter = useMemo(() => {
    const pepSeq = jobInputParameters.peps;
    return pepSeq ? partialRight(peptideSearchConverter, pepSeq) : undefined;
  }, [jobInputParameters.peps]);

  const resultsDataObject = usePaginatedAccessions(accessions, converter);

  const {
    initialLoading: resultsDataInitialLoading,
    total: resultsDataTotal,
    progress: resultsDataProgress,
  } = resultsDataObject;

  useMarkJobAsSeen(resultsDataObject?.allResults.length, match?.params.id);

  // Don't use the response with facets for this, there's a bug returning 0 for
  // results when combining facets and isoforms
  let total: undefined | number;
  if (resultsDataTotal !== undefined) {
    total = +resultsDataTotal;
  }

  if (jobResultError || !match) {
    return (
      <ErrorHandler status={jobResultStatus} error={jobResultError} fullPage />
    );
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
        heading={namespaceAndToolsLabels[JobTypes.PEPTIDE_SEARCH]}
        headingPostscript={
          total && (
            /* Not sure why fragments and keys are needed, but otherwise gets
            the React key warnings messages and children are rendered as array */
            <small key="postscript">
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
              inputParamsData={jobInputParameters}
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
              inputParamsData={jobInputParameters}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

export default PeptideSearchResult;
