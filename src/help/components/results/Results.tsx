import { RouteChildrenProps } from 'react-router-dom';
import qs from 'query-string';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ResultsDataHeader from '../../../shared/components/results/ResultsDataHeader';
// import ResultsData from '../../../shared/components/results/ResultsData';
import ResultsFacets from '../../../shared/components/results/ResultsFacets';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help } from '../../../shared/config/apiUrls';

const Results = ({ location }: RouteChildrenProps) => {
  const searchObject = qs.parse(location.search, { parseNumbers: true });

  console.log(searchObject.facets, [searchObject.facets].flat());
  console.log(
    ...[searchObject.facets]
      .flat()
      .map((facet) => `(${facet})`)
      .flat()
  );
  const facetApiObject = useDataApiWithStale(help.search(searchObject, true));
  const resultsDataObject = useDataApiWithStale(help.search(searchObject));

  console.log(facetApiObject);
  console.log(resultsDataObject);

  return (
    <SideBarLayout sidebar={<ResultsFacets dataApiObject={facetApiObject} />}>
      <ResultsDataHeader total={0} selectedEntries={[]} />
      <ul>
        {resultsDataObject.data?.results.map((result) => (
          <li key={result.id}>{result.id}</li>
        ))}
      </ul>
    </SideBarLayout>
  );
};

export default Results;
