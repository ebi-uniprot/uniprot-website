import { FC, useEffect, useState } from 'react';

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

const Results: FC = () => {
  const [total, setTotal] = useState<number>();
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  // Query for facets
  const { url: initialApiFacetUrl } = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
  });
  const dataApiObject = useDataApiWithStale<Response['data']>(
    initialApiFacetUrl
  );
  const facetTotal = dataApiObject.headers?.['x-totalrecords'];

  // Query for results data
  const { url: initialApiUrl, direct } = useNSQuery();
  const resultsDataObject = usePagination(initialApiUrl);
  const resultsDataTotal = resultsDataObject.total;

  useEffect(() => {
    // Set the total to the first one to bring results back
    if (facetTotal || resultsDataTotal) {
      setTotal((total) => {
        if (facetTotal && total !== +facetTotal) {
          return +facetTotal;
        }
        if (resultsDataTotal && total !== +resultsDataTotal) {
          return +resultsDataTotal;
        }
        return total;
      });
    }
  }, [facetTotal, resultsDataTotal]);

  if (total === 0) {
    return <NoResultsPage />;
  }

  return (
    <SideBarLayout
      sidebar={<ResultsFacets dataApiObject={dataApiObject} total={total} />}
    >
      <ResultsDataHeader total={total} selectedEntries={selectedEntries} />
      <ResultsData
        resultsDataObject={resultsDataObject}
        direct={direct}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
      />
    </SideBarLayout>
  );
};

export default Results;
