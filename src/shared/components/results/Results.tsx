import { FC, useEffect, useState } from 'react';

import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNSQuery from '../../hooks/useNSQuery';

import ResultsData from './ResultsData';
import ResultsFacets from './ResultsFacets';
import SideBarLayout from '../layouts/SideBarLayout';

import Response from '../../../uniprotkb/types/responseTypes';

const Results: FC = () => {
  const [total, setTotal] = useState<number>();
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

  return (
    <SideBarLayout
      sidebar={<ResultsFacets dataApiObject={dataApiObject} total={total} />}
    >
      <ResultsData />
    </SideBarLayout>
  );
};

export default Results;
