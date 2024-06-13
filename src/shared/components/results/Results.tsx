import { useLocation } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import useNS from '../../hooks/useNS';
import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNSQuery from '../../hooks/useNSQuery';
import useItemSelect from '../../hooks/useItemSelect';
import usePagination from '../../hooks/usePagination';
import useDataApi from '../../hooks/useDataApi';

import HTMLHead from '../HTMLHead';
import ResultsData from './ResultsData';
import ResultsFacets from './ResultsFacets';
import { SidebarLayout } from '../layouts/SideBarLayout';
import NoResultsPage from '../error-pages/full-pages/NoResultsPage';
import ErrorHandler from '../error-pages/ErrorHandler';
import ErrorBoundary from '../error-component/ErrorBoundary';
import ResultsDataHeader from './ResultsDataHeader';
import SearchSuggestions from './SearchSuggestions';
import DidYouMean from './DidYouMean';

import {
  escapeInvalidSearchFieldQueryWithColon,
  getParamsFromURL,
  isInvalidSearchFieldQueryWithColon,
} from '../../../uniprotkb/utils/resultsUtils';

import {
  searchableNamespaceLabels,
  SearchableNamespace,
  Namespace,
} from '../../types/namespaces';
import { SearchResults, Suggestion } from '../../types/results';
import { APIModel } from '../../types/apiModel';

const Results = () => {
  const ns = useNS();
  const { search } = useLocation();
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();

  // Query for facets
  const initialApiFacetUrl = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
  });
  const facetApiObject =
    useDataApiWithStale<SearchResults<APIModel>>(initialApiFacetUrl);

  const {
    loading: facetInitialLoading,
    headers: facetHeaders,
    isStale: facetHasStaleData,
  } = facetApiObject;
  const facetTotal = facetHeaders?.['x-total-results'];

  // Query for results data
  const initialApiUrl = useNSQuery({
    withFacets: false,
    size: ns === Namespace.uniparc ? 10 : undefined,
  });
  const resultsDataObject = usePagination(initialApiUrl);
  const {
    initialLoading: resultsDataInitialLoading,
    total: resultsDataTotal,
    progress: resultsDataProgress,
  } = resultsDataObject;

  let total: undefined | number;
  if (facetTotal !== undefined) {
    total = +facetTotal;
  }
  if (resultsDataTotal !== undefined) {
    total = +resultsDataTotal;
  }

  const [params] = getParamsFromURL(search);

  // Some cross references legitimately have colons in their ids eg PTHR34313:SF2
  // The API returns "'PTHR34313' is not a valid search field" on those occassions
  // so to assist the users, escape the colon PTHR34313\:SF2 and try a head request.
  // If something found then suggest this with the DidYouMean suggestions.
  const invalidSearchFieldQueryWithColon = isInvalidSearchFieldQueryWithColon(
    params.query,
    facetApiObject?.error?.response?.data?.messages,
    ns
  );
  const escapedColonQuery = escapeInvalidSearchFieldQueryWithColon(
    params.query
  );
  const escapedColonQueryUrl = useNSQuery(
    invalidSearchFieldQueryWithColon
      ? {
          overrideQuery: escapedColonQuery,
          withFacets: false,
          size: 0,
        }
      : undefined
  );
  const escapedColonQueryData = useDataApi(
    invalidSearchFieldQueryWithColon ? escapedColonQueryUrl : null,
    {
      method: 'HEAD',
    }
  );
  const escapedColonQueryTotal =
    escapedColonQueryData?.headers?.['x-total-results'];

  const helmet = ns && (
    <HTMLHead
      title={`${params.query} in ${
        searchableNamespaceLabels[ns as SearchableNamespace]
      } search${total !== undefined ? ` (${total})` : ''}`}
      titleLoading={resultsDataInitialLoading}
    >
      <meta
        name="description"
        content={`Search results in the ${
          searchableNamespaceLabels[ns as SearchableNamespace]
        } dataset of UniProt`}
      />
      <link
        rel="canonical"
        href={`${window.location.origin}${window.location.pathname}?query=*`}
      />
    </HTMLHead>
  );

  if (
    facetInitialLoading &&
    resultsDataInitialLoading &&
    !facetHasStaleData &&
    escapedColonQueryData.loading
  ) {
    return (
      <>
        {helmet}
        <Loader progress={resultsDataProgress} />
      </>
    );
  }

  if (
    !resultsDataObject.allResults.length &&
    resultsDataObject.error &&
    !invalidSearchFieldQueryWithColon
  ) {
    return (
      <ErrorHandler
        status={resultsDataObject.status}
        error={resultsDataObject.error}
        fullPage
      />
    );
  }

  const suggestions: Suggestion[] =
    (!facetHasStaleData && facetApiObject.data?.suggestions) || [];

  if (escapedColonQueryTotal) {
    suggestions.unshift({
      query: escapedColonQuery,
      hits: escapedColonQueryTotal,
    });
  }

  if (
    (!resultsDataInitialLoading && !facetInitialLoading && !total) ||
    total === 0
  ) {
    return (
      <>
        {helmet}
        <NoResultsPage>
          <DidYouMean suggestions={suggestions} />
        </NoResultsPage>
      </>
    );
  }

  return (
    <SidebarLayout sidebar={<ResultsFacets dataApiObject={facetApiObject} />}>
      {helmet}
      <ResultsDataHeader
        total={total}
        loadedTotal={resultsDataObject.allResults.length}
        selectedEntries={selectedEntries}
      >
        <ErrorBoundary fallback={null}>
          {params.selectedFacets.length ? null : (
            <SearchSuggestions
              query={params.query}
              namespace={ns}
              total={total}
            />
          )}
        </ErrorBoundary>
      </ResultsDataHeader>
      <ResultsData
        resultsDataObject={resultsDataObject}
        setSelectedItemFromEvent={setSelectedItemFromEvent}
        setSelectedEntries={setSelectedEntries}
      />
    </SidebarLayout>
  );
};

export default Results;
