import joinUrl from 'url-join';

import {
  createFacetsQueryString,
  excludeLocalBlastFacets,
  stringifyUrl,
} from '../../utils/url';

import { apiPrefix } from './apiPrefix';
import { defaultFacets } from '../facets';

import {
  SelectedFacet,
  SortDirection,
  getApiSortDirection,
} from '../../../uniprotkb/types/resultsTypes';
import { Namespace } from '../../types/namespaces';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';
import { Facets } from '../../types/facets';

// Retrieve results
export const search = (namespace: Namespace = Namespace.uniprotkb) =>
  joinUrl(apiPrefix, namespace, 'search');

type AccessionsOptions = {
  namespace?: Namespace;
  columns?: string[];
  selectedFacets?: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  facets?: Facets[] | null;
  size?: number;
  query?: string;
  noSort?: boolean;
};

export const accessions = (
  accessions?: string[],
  {
    namespace = Namespace.uniprotkb,
    columns = [],
    selectedFacets = [],
    sortColumn = undefined,
    sortDirection = SortDirection.ascend,
    facets,
    size,
    query,
    noSort,
  }: AccessionsOptions = {}
) => {
  if (!accessions?.length) {
    return undefined;
  }
  const finalFacets =
    facets === undefined ? defaultFacets.get(namespace) : facets;
  // for UniProtKB
  let key = 'accessions'; // This changes depending on the endpoint...
  if (namespace === Namespace.uniref) {
    key = 'ids';
  } else if (namespace === Namespace.uniparc) {
    key = 'upis';
  }
  let accs = accessions;
  if (!noSort) {
    // sort to improve possible cache hit
    accs = Array.from(accessions).sort();
  }
  return stringifyUrl(joinUrl(apiPrefix, namespace, key), {
    size,
    [key]: accs.join(','),
    query: [
      query && `(${query})`,
      createFacetsQueryString(selectedFacets.filter(excludeLocalBlastFacets)) ||
        undefined,
    ]
      .filter(Boolean)
      .join(' AND '),
    fields: (columns && columns.join(',')) || undefined,
    facets: finalFacets?.join(',') || undefined,
    sort:
      sortColumn &&
      `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`,
  });
};
