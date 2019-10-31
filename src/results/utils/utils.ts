import { getQueryUrl } from '../../utils/apiUrls';
import {
  SortDirection,
  SelectedFacet,
  getApiSortDirection,
} from '../types/resultsTypes';
import { SortableColumn } from '../../model/types/ColumnTypes';

export const createFacetsQueryString = (facets: SelectedFacet[]) =>
  /**
   * Add double quotes to facet values which contain
   * spaces as otherwise the backend doesn't escape special characters
   * such as '.' or '-'.
   * Single word values shouldn't have double quotes as they can be boolean.
   * Range queries (/^\[.*]$/) should not have double quotes either.
   * */

  facets.reduce(
    (queryAccumulator, facet) =>
      `${queryAccumulator} AND (${facet.name}:${
        facet.value.indexOf(' ') >= 0 && !facet.value.match(/^\[.*\]$/)
          ? `"${facet.value}"`
          : facet.value
      })`,
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
