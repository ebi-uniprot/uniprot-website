import { stringifyQuery } from '../../shared/utils/url';

import { Column } from '../../shared/config/columns';
import { SortableColumn } from '../types/columnTypes';
import {
  SelectedFacet,
  SortDirection,
  ReceivedFieldData,
} from '../types/resultsTypes';
import { Interactant } from '../adapters/interactionConverter';
import { InteractionType } from '../types/commentTypes';
import { ViewMode } from '../../shared/hooks/useViewMode';
import { GroupBy } from '../config/apiUrls/groupBy';

const facetsAsArray = (facetString: string): SelectedFacet[] =>
  facetString.split(',').map((stringItem) => {
    const [name, value] = stringItem.split(':');
    return {
      name,
      value,
    };
  });

export type URLResultParams = {
  query: string;
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  activeFacet?: string;
  direct?: boolean;
  columns?: Column[];
  viewMode?: ViewMode;
  groupBy?: GroupBy;
  parent?: string;
};

export type InvalidParamValue = {
  parameter: string;
  value: string | string[];
};

type UnknownParams = string[];

export const getParamsFromURL = (
  url: string
): [URLResultParams, UnknownParams] => {
  const {
    query,
    facets,
    sort,
    dir,
    activeFacet,
    direct,
    fields, // Handled in useColumnNames
    view, // Handled in useViewMode
    ids, // Handled in ToolsButton
    groupBy, // Handled in UniProtKB/groupBy
    parent, // Handled in UniProtKB/groupBy
    fromCovid19Portal, // Flag to indicate to user they have been redirected from the now obsolete Covid-19 portal
    ...restParams
  } = Object.fromEntries(new URLSearchParams(url));

  let selectedFacets: SelectedFacet[] = [];
  if (facets && typeof facets === 'string') {
    selectedFacets = facetsAsArray(facets);
  }
  const sortDirection = dir as keyof typeof SortDirection;

  const params: URLResultParams = {
    query: query || '',
    activeFacet: activeFacet || undefined,
    selectedFacets,
    sortColumn: sort as SortableColumn,
    sortDirection: sortDirection && SortDirection[sortDirection],
    // flag, so if '?direct' we get null, if not in querystring we get undefined
    direct: direct !== undefined,
    groupBy: (groupBy as GroupBy) || undefined,
    parent: parent || undefined,
  };

  const unknownParams = Object.keys(restParams);

  return [params, unknownParams];
};

const facetsAsString = (facets?: SelectedFacet[]): string | undefined =>
  facets?.length
    ? facets.map(({ name, value }) => `${name}:${value}`).join(',')
    : undefined;

type GetLocationObjForParams = {
  pathname?: string;
  query?: string;
  selectedFacets?: SelectedFacet[];
  sortColumn?: string;
  sortDirection?: SortDirection;
  activeFacet?: string;
  columns?: Column[];
  viewMode?: ViewMode;
};

export const getLocationObjForParams = ({
  pathname,
  query,
  selectedFacets,
  sortColumn,
  sortDirection,
  activeFacet,
  columns,
  viewMode,
}: GetLocationObjForParams = {}) => ({
  pathname,
  search: stringifyQuery({
    query: query || undefined,
    facets: facetsAsString(selectedFacets),
    sort: sortColumn,
    dir: sortDirection,
    activeFacet,
    fields: columns,
    view: viewMode,
  }),
});

export const getSortableColumnToSortColumn = (
  resultFields: ReceivedFieldData = []
) => {
  const sortableColumnToSortColumn = new Map<Column, string>();
  resultFields.forEach(({ fields }) => {
    fields.forEach(({ name, sortField }) => {
      if (sortField) {
        sortableColumnToSortColumn.set(name as Column, sortField);
      }
    });
  });
  return sortableColumnToSortColumn;
};

/**
 * First SELF
 * Then accessions without genes, as is
 * Then accessions with genes, ordered by gene name
 */
export const sortInteractionData = (
  interactionDataMap: Map<string, Interactant | InteractionType.SELF>
) =>
  Array.from(interactionDataMap.values()).sort((a, b) => {
    if (a !== InteractionType.SELF && b !== InteractionType.SELF) {
      return a.geneName?.localeCompare(b.geneName || '') || -1;
    }
    if (a === InteractionType.SELF) {
      return -1;
    }
    return 1;
  });
