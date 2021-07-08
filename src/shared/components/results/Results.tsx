import { Loader } from 'franklin-sites';

import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNSQuery from '../../hooks/useNSQuery';
import useItemSelect from '../../hooks/useItemSelect';
import usePagination from '../../hooks/usePagination';

import ResultsData from './ResultsData';
import ResultsFacets from './ResultsFacets';
import SideBarLayout from '../layouts/SideBarLayout';
import NoResultsPage from '../error-pages/NoResultsPage';
import ResultsDataHeader from './ResultsDataHeader';

import Response from '../../../uniprotkb/types/responseTypes';

const Results = () => {
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
    loading: facetInititialLoading,
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

  if (
    facetInititialLoading &&
    resultsDataInitialLoading &&
    !facetHasStaleData
  ) {
    return <Loader progress={resultsDataProgress} />;
  }

  if (
    (!resultsDataInitialLoading && !facetInititialLoading && !total) ||
    total === 0
  ) {
    return <NoResultsPage />;
  }

  return (
    <SideBarLayout sidebar={<ResultsFacets dataApiObject={facetApiObject} />}>
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
