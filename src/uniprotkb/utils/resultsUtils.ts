import queryStringModule from 'query-string';
import { SortableColumn, Column } from '../types/columnTypes';
import {
  SelectedFacet,
  SortDirection,
  ReceivedFieldData,
} from '../types/resultsTypes';

const facetsAsArray = (facetString: string): SelectedFacet[] => {
  return facetString.split(',').map((stringItem) => {
    const [name, value] = stringItem.split(':');
    return {
      name,
      value,
    };
  });
};
export type URLResultParams = {
  query: string;
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  activeFacet?: string;
};
export const getParamsFromURL = (url: string): URLResultParams => {
  const urlParams = queryStringModule.parse(url);
  const { query, facets, sort, dir, activeFacet } = urlParams;

  let selectedFacets: SelectedFacet[] = [];
  if (facets && typeof facets === 'string') {
    selectedFacets = facetsAsArray(facets);
  }
  const sortDirection = dir as keyof typeof SortDirection;

  return {
    query: query && typeof query === 'string' ? query : '',
    activeFacet:
      activeFacet && typeof activeFacet === 'string' ? activeFacet : undefined,
    selectedFacets,
    sortColumn: sort as SortableColumn,
    sortDirection: sortDirection && SortDirection[sortDirection],
  };
};

export const facetsAsString = (facets: SelectedFacet[]): string => {
  if (!facets || facets.length <= 0) {
    return '';
  }
  return facets.reduce(
    (accumulator, facet, i) =>
      `${accumulator}${i > 0 ? ',' : ''}${facet.name}:${facet.value}`,
    '&facets='
  );
};

export const getLocationObjForParams = (
  pathname: string,
  query: string,
  selectedFacets: SelectedFacet[],
  sortColumn?: string,
  sortDirection?: SortDirection,
  activeFacet?: string
) => ({
  pathname,
  search: [
    `query=${query}${facetsAsString(selectedFacets)}`,
    `${sortColumn ? `&sort=${sortColumn}` : ''}`,
    `${sortDirection ? `&dir=${sortDirection}` : ''}`,
    `${activeFacet ? `&activeFacet=${activeFacet}` : ''}`,
  ].join(''),
});

export const getSortableColumnToSortColumn = (
  resultFields: ReceivedFieldData
) => {
  const sortableColumnToSortColumn = new Map<Column, string>();
  resultFields.forEach(({ fields }) => {
    fields.forEach(({ name, sortField }) => {
      if (sortField) sortableColumnToSortColumn.set(name, sortField);
    });
  });
  return sortableColumnToSortColumn;
};
