import { matchPath } from 'react-router-dom';

import { fromCleanMapper } from './getIdKey';

import {
  SelectedFacet,
  SortDirection,
  getApiSortDirection,
} from '../../uniprotkb/types/resultsTypes';
import { defaultFacets } from '../config/facets';

import { Location, LocationToPath } from '../../app/config/urls';
import { Namespace } from '../types/namespaces';
import { Column } from '../config/columns';
import { SortableColumn } from '../../uniprotkb/types/columnTypes';
import { BlastFacet } from '../../tools/blast/types/blastResults';
import { Facets } from '../types/facets';

export const getLocationForPathname = (pathname: string) => {
  const found = Object.entries(LocationToPath).find(([, path]) =>
    matchPath(pathname, { path, exact: path === '/' })
  );
  return found?.[0] as Location | undefined;
};

type QueryStringParamsRecord = Record<
  string,
  string | string[] | number | number[] | boolean | undefined | null
>;
export type QueryStringArg = string | QueryStringParamsRecord | URLSearchParams;

export const stringifyQuery = (...args: QueryStringArg[]) => {
  // This returns a query string by iterating over the args and creating a combined
  // URLSearchParams instance. If a parameter key already exists it will be overwritten
  // by the new value. If the new value is undefined or null then the parameter will
  // be removed. Arrays will be returned as comma separated strings.
  const combined = new URLSearchParams();
  for (const arg of args) {
    const iter =
      // Query string
      (typeof arg === 'string' && new URLSearchParams(arg)) ||
      // URLSearchParams
      (arg instanceof URLSearchParams && arg) ||
      // QueryStringParamsRecord
      (typeof arg === 'object' && arg !== null && Object.entries(arg)) ||
      // Fallback
      [];
    for (const [k, v] of iter) {
      if (typeof v !== 'undefined' && v !== null) {
        combined.set(k, v.toString());
      } else if (combined.has(k)) {
        combined.delete(k);
      }
    }
  }
  combined.sort();
  return combined.toString();
};

export const stringifyUrl = (base: string, ...args: QueryStringArg[]) => {
  const query = stringifyQuery(...args);
  return query ? `${base}?${query}` : base;
};

export const splitUrl = (url: string) => {
  const [base, query] = url.split('?');
  return { base, query };
};

export const createFacetsQueryString = (facets: SelectedFacet[]) =>
  /**
   * Add double quotes to facet values which contain
   * spaces as otherwise the backend doesn't escape special characters
   * such as '.' or '-'.
   * Single word values shouldn't have double quotes as they can be boolean.
   * Range queries (/^\[.*]$/) should not have double quotes either.
   * */
  facets
    .map(
      (facet) =>
        `(${facet.name}:${
          facet.value.includes(' ') && !facet.value.match(/^\[.*\]$/)
            ? `"${facet.value}"`
            : facet.value
        })`
    )
    .join(' AND ');

export const createSelectedQueryString = (ids: string[], idField: Column) =>
  Array.from(new Set(ids.map((id) => `${idField}:${fromCleanMapper(id)}`)))
    .sort() // to improve possible cache hit
    .join(' OR ');

export type SearchOptions = {
  namespace?: Namespace;
  query?: string;
  // TODO: change to set of possible fields (if possible, depending on namespace)
  columns?: Column[] | null;
  selectedFacets?: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  facets?: Facets[] | null;
  size?: number;
  noSort?: boolean;
};

export const getSearchParams = ({
  namespace = Namespace.uniprotkb,
  query = '*',
  columns = [],
  selectedFacets = [],
  sortColumn = undefined,
  sortDirection = SortDirection.ascend,
  facets,
  size,
  noSort,
}: SearchOptions = {}) => {
  let facetField = facets;
  // if null or empty list, don't set default, only for undefined
  // note: could this be moved to useNSQuery?
  if (facetField === undefined) {
    facetField = defaultFacets.get(namespace);
  }
  return {
    size,
    query: `${[query && `(${query})`, createFacetsQueryString(selectedFacets)]
      .filter(Boolean)
      .join(' AND ')}`,
    fields: columns?.join(',') || undefined,
    facets: facetField?.join(','),
    sort:
      // 'score' is invalid, but it's a user input so it might still happen
      sortColumn && (sortColumn as string) !== 'score' && !noSort
        ? `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`
        : undefined,
  };
};

const localBlastFacets = Object.values(BlastFacet) as string[];
export const excludeLocalBlastFacets = ({ name }: SelectedFacet) =>
  !localBlastFacets.includes(name);
