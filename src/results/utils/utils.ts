import { getQueryUrl } from '../../utils/apiUrls';
import {
  SortDirection,
  SortableColumn,
  SelectedFacet,
  getApiSortDirection,
} from '../types/resultsTypes';

export const createFacetsQueryString = (facets: SelectedFacet[]) =>
  facets.reduce(
    (queryAccumulator, facet) =>
      `${queryAccumulator} AND (${facet.name}:${facet.value})`,
    ''
  );

export const getAPIQueryUrl = (
  queryString: string,
  columns: string[],
  selectedFacets: SelectedFacet[],
  sortColumn: SortableColumn | undefined = undefined,
  sortDirection: SortDirection | undefined = SortDirection.ascend
) => {
  const facetsQueryString = createFacetsQueryString(selectedFacets);
  return getQueryUrl(
    `${queryString}${facetsQueryString}`,
    columns,
    sortColumn,
    getApiSortDirection(SortDirection[sortDirection])
  );
};
