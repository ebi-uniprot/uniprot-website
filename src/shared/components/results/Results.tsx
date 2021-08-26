import { useLocation } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import useNS from '../../hooks/useNS';
import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNSQuery from '../../hooks/useNSQuery';
import useItemSelect from '../../hooks/useItemSelect';
import usePagination from '../../hooks/usePagination';

import HTMLHead from '../HTMLHead';
import ResultsData from './ResultsData';
import ResultsFacets from './ResultsFacets';
import SideBarLayout from '../layouts/SideBarLayout';
import NoResultsPage from '../error-pages/NoResultsPage';
import ResultsDataHeader from './ResultsDataHeader';

import Response from '../../../uniprotkb/types/responseTypes';
import { NamespaceLabels, SearchableNamespace } from '../../types/namespaces';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

const Results = () => {
  const ns = useNS();
  const { search } = useLocation();
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  // Query for facets
  const initialApiFacetUrl = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
  });
  const facetApiObject =
    useDataApiWithStale<Response['data']>(initialApiFacetUrl);

  const {
    loading: facetInitialLoading,
    headers: facetHeaders,
    isStale: facetHasStaleData,
  } = facetApiObject;
  const facetTotal = facetHeaders?.['x-total-records'];

  // Query for results data
  const initialApiUrl = useNSQuery({ withFacets: false });
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

  const helmet = ns && (
    <HTMLHead
      title={`${getParamsFromURL(search).query} in ${
        NamespaceLabels[ns as SearchableNamespace]
      }${total !== undefined ? ` (${total})` : ''}`}
    />
  );

  if (facetInitialLoading && resultsDataInitialLoading && !facetHasStaleData) {
    return (
      <>
        {helmet}
        <Loader progress={resultsDataProgress} />
      </>
    );
  }

  if (
    (!resultsDataInitialLoading && !facetInitialLoading && !total) ||
    total === 0
  ) {
    return (
      <>
        {helmet}
        <NoResultsPage />
      </>
    );
  }

  return (
    <SideBarLayout sidebar={<ResultsFacets dataApiObject={facetApiObject} />}>
      {helmet}
      <ResultsDataHeader total={total} selectedEntries={selectedEntries} />
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
      />
    </SideBarLayout>
  );
};

export default Results;
