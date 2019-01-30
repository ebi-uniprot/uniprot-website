import { getQueryUrl } from '../../utils/apiUrls';
import {
  SortDirections,
  SortDirectionsType,
  sortableColumns
} from '../sortTypes';
import { Facet } from '../types/resultsTypes';

const createFacetsQueryString = (facets: Facet[]) =>
  facets.reduce(
    (queryAccumulator, facet) =>
      `${queryAccumulator} AND (${facet.name}:${facet.value})`,
    ''
  );

const getAPIQueryUrl = (
  queryString: string,
  columns: [string],
  selectedFacets: [],
  sortBy: sortableColumns | undefined = undefined,
  sortDirectionKey: keyof SortDirectionsType = SortDirections.ascend
    .app as keyof SortDirectionsType
) => {
  const facetsQueryString = createFacetsQueryString(selectedFacets);
  return getQueryUrl(
    `${queryString}${facetsQueryString}`,
    columns,
    undefined,
    sortBy,
    sortBy && sortBy in sortableColumns
      ? SortDirections[sortDirectionKey].api
      : undefined
  );
};

export { getAPIQueryUrl };
