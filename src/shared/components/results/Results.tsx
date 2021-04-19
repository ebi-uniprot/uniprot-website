import { FC, useEffect, useState } from 'react';

import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNSQuery from '../../hooks/useNSQuery';
import useItemSelect from '../../hooks/useItemSelect';

import ResultsData from './ResultsData';
import ResultsFacets from './ResultsFacets';
import SideBarLayout from '../layouts/SideBarLayout';
import NoResultsPage from '../error-pages/NoResultsPage';
import ResultsDataHeader from './ResultsDataHeader';

import Response from '../../../uniprotkb/types/responseTypes';

const Results: FC = () => {
  const [total, setTotal] = useState<number>();
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  const { url: initialApiUrl } = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
  });

  const dataApiObject = useDataApiWithStale<Response['data']>(initialApiUrl);

  const facetTotal = dataApiObject.headers?.['x-totalrecords'];

  useEffect(() => {
    if (facetTotal) {
      setTotal((total) => {
        if (total !== +facetTotal) {
          return +facetTotal;
        }
        return undefined;
      });
    }
  }, [facetTotal]);

  if (total === 0) {
    return <NoResultsPage />;
  }

  return (
    <SideBarLayout
      sidebar={<ResultsFacets dataApiObject={dataApiObject} total={total} />}
    >
      <ResultsDataHeader total={total} selectedEntries={selectedEntries} />
      <ResultsData
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
      />
    </SideBarLayout>
  );
};

export default Results;
