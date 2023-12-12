import { useMemo, lazy, Suspense } from 'react';
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
import useMatchWithRedirect from '../../../../shared/hooks/useMatchWithRedirect';
import usePaginatedAccessions from '../../../../shared/hooks/usePaginatedAccessions';

import HTMLHead from '../../../../shared/components/HTMLHead';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import { SidebarLayout } from '../../../../shared/components/layouts/SideBarLayout';
import NoResultsPage from '../../../../shared/components/error-pages/NoResultsPage';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import { DowntimeWarning } from '../../../components/DowntimeWarning';

import toolsURLs from '../../../config/urls';
import { apiPrefix } from '../../../../shared/config/apiUrls';
import {
  Namespace,
  namespaceAndToolsLabels,
} from '../../../../shared/types/namespaces';
import {
  Location,
  changePathnameOnly,
  LocationToPath,
} from '../../../../app/config/urls';
import peptideSearchConverter from '../../adapters/peptideSearchConverter';

import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { SearchResults } from '../../../../shared/types/results';
import { PeptideSearchResults } from '../../types/peptideSearchResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { FormParameters } from '../../types/peptideSearchFormParameters';
import {
  TaxonomyAPIModel,
  TaxonomyDatum,
} from '../../../../supporting-data/taxonomy/adapters/taxonomyConverter';

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

enum ServerJobParameters {
  QueryPetides = 'QueryPetides',
  TaxonIds = 'TaxonIds',
  lEqi = 'lEqi',
  swissProtOnly = 'swissProtOnly',
}

export const MAX_PEPTIDE_FACETS_OR_DOWNLOAD = 1_000;

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
    headers: { accept: 'text/plain' },
  });

  const { data: jobParameters } = useDataApi<PeptideSearchResults>(
    urls.detailsUrl?.(jobID),
    {
      headers: { accept: 'text/plain' },
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
  const {
    loading: facetInititialLoading,
    headers: facetHeaders,
    isStale: facetHasStaleData,
  } = facetApiObject;
  const facetTotal = facetHeaders?.['x-total-results'];

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

  let total: undefined | number;
  if (resultsDataTotal !== undefined) {
    total = +resultsDataTotal;
  }
  // needs to be set at the end to avoid being overidden
  if (facetTotal !== undefined) {
    total = +facetTotal;
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
      <DowntimeWarning>Peptide Search service</DowntimeWarning>
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
