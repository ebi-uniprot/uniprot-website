import qs from 'query-string';
import { partition } from 'lodash-es';

import { ColumnConfigurations } from '../../shared/hooks/useColumns';

import { Column } from '../../shared/config/columns';
import { SortableColumn } from '../types/columnTypes';
import {
  SelectedFacet,
  SortDirection,
  ReceivedFieldData,
} from '../types/resultsTypes';
import { Interactant } from '../adapters/interactionConverter';
import { InteractionType } from '../types/commentTypes';
import { ViewMode } from '../../shared/components/results/ResultsData';
import { Namespace } from '../../shared/types/namespaces';

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
};

type InvalidParamValues = {
  parameter: string;
  value: string | string[];
}[];

const viewModes: Set<ViewMode> = new Set(['card', 'table']);

export const getParamsFromURL = (
  url: string,
  namespace?: Namespace
): [URLResultParams, InvalidParamValues] => {
  const invalidValues = [];
  const { query, facets, sort, dir, activeFacet, direct, fields, view } =
    qs.parse(url);

  let selectedFacets: SelectedFacet[] = [];
  if (facets && typeof facets === 'string') {
    selectedFacets = facetsAsArray(facets);
  }
  const sortDirection = dir as keyof typeof SortDirection;

  const params: URLResultParams = {
    query: query && typeof query === 'string' ? query : '',
    activeFacet:
      activeFacet && typeof activeFacet === 'string' ? activeFacet : undefined,
    selectedFacets,
    sortColumn: sort as SortableColumn,
    sortDirection: sortDirection && SortDirection[sortDirection],
    // flag, so if '?direct' we get null, if not in querystring we get undefined
    direct: direct !== undefined,
  };

  if (fields && namespace) {
    const columnsAsArray = Array.isArray(fields) ? fields : fields?.split(',');
    const columnConfig = ColumnConfigurations[namespace];
    const columns = new Set(columnConfig?.keys());
    const [validColumns, invalidColumns] = partition(columnsAsArray, (column) =>
      columns.has(column) ? 'validColumns' : 'invalidColumns'
    );
    if (invalidColumns?.length) {
      invalidValues.push({ parameter: 'columns', value: invalidColumns });
    }
    params.columns = validColumns as Column[];
  }

  if (view) {
    if (typeof view === 'string' && viewModes.has(view as ViewMode)) {
      params.viewMode = view as ViewMode;
    } else {
      invalidValues.push({ parameter: 'view', value: view });
    }
  }

  return [params, invalidValues];
};

export const facetsAsString = (facets?: SelectedFacet[]): string => {
  if (!facets?.length) {
    return '';
  }
  return facets.reduce(
    (accumulator, facet, i) =>
      `${accumulator}${i > 0 ? ',' : ''}${facet.name}:${facet.value}`,
    'facets='
  );
};

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
  search: [
    `${[query && `query=${query}`, facetsAsString(selectedFacets)]
      .filter(Boolean)
      .join('&')}`,
    `${sortColumn ? `&sort=${sortColumn}` : ''}`,
    `${sortDirection ? `&dir=${sortDirection}` : ''}`,
    `${activeFacet ? `&activeFacet=${activeFacet}` : ''}`,
    `${columns ? `&fields=${columns}` : ''}`,
    `${viewMode ? `&view=${viewMode}` : ''}`,
  ].join(''),
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
