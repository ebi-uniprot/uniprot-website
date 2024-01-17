import joinUrl from 'url-join';

import { fromCleanMapper } from '../../utils/getIdKey';
import { stringifyUrl } from '../../utils/url';

import { apiPrefix } from './apiPrefix';

// Main data
import {
  Facets as UniProtKBFacets,
  defaultFacets as uniProtKBDefaultFacets,
} from '../../../uniprotkb/config/UniProtKBFacetConfiguration';
import {
  Facets as UniRefFacets,
  defaultFacets as uniRefDefaultFacets,
} from '../../../uniref/config/UniRefFacetConfiguration';
import {
  Facets as UniParcFacets,
  defaultFacets as uniParcDefaultFacets,
} from '../../../uniparc/config/UniParcFacetConfiguration';
import {
  Facets as ProteomesFacets,
  defaultFacets as proteomesDefaultFacets,
} from '../../../proteomes/config/ProteomesFacetConfiguration';
// Supporting data
import {
  Facets as TaxonomyFacets,
  defaultFacets as taxonomyDefaultFacets,
} from '../../../supporting-data/taxonomy/config/TaxonomyFacetConfiguration';
import {
  Facets as KeywordsFacets,
  defaultFacets as keywordsDefaultFacets,
} from '../../../supporting-data/keywords/config/KeywordsFacetConfiguration';
import {
  Facets as CitationsFacets,
  defaultFacets as citationsDefaultFacets,
} from '../../../supporting-data/citations/config/CitationsFacetConfiguration';
import {
  Facets as DiseasesFacets,
  defaultFacets as diseasesDefaultFacets,
} from '../../../supporting-data/diseases/config/DiseasesFacetConfiguration';
import {
  Facets as DatabaseFacets,
  defaultFacets as databaseDefaultFacets,
} from '../../../supporting-data/database/config/DatabaseFacetConfiguration';
import {
  Facets as LocationsFacets,
  defaultFacets as locationsDefaultFacets,
} from '../../../supporting-data/locations/config/LocationsFacetConfiguration';

import {
  Facets as UniRuleFacets,
  defaultFacets as uniRuleDefaultFacets,
} from '../../../automatic-annotations/unirule/config/UniRuleFacetConfiguration';
import {
  Facets as ARBAFacets,
  defaultFacets as arbaDefaultFacets,
} from '../../../automatic-annotations/arba/config/ARBAFacetConfiguration';
import { BlastFacet } from '../../../tools/blast/types/blastResults';
import {
  SelectedFacet,
  SortDirection,
  getApiSortDirection,
} from '../../../uniprotkb/types/resultsTypes';
import { Namespace } from '../../types/namespaces';
import { Column } from '../columns';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';

// Retrieve results
export const search = (namespace: Namespace = Namespace.uniprotkb) =>
  joinUrl(apiPrefix, namespace, 'search');

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

type Facets =
  | UniProtKBFacets
  | UniRefFacets
  | UniParcFacets
  | ProteomesFacets
  | TaxonomyFacets
  | KeywordsFacets
  | CitationsFacets
  | DiseasesFacets
  | DatabaseFacets
  | LocationsFacets
  | UniRuleFacets
  | ARBAFacets;

export const defaultFacets = new Map<Namespace, Facets[]>([
  // Main data
  [Namespace.uniprotkb, uniProtKBDefaultFacets],
  [Namespace.uniref, uniRefDefaultFacets],
  [Namespace.uniparc, uniParcDefaultFacets],
  [Namespace.proteomes, proteomesDefaultFacets],
  // Supporting data
  [Namespace.taxonomy, taxonomyDefaultFacets],
  [Namespace.keywords, keywordsDefaultFacets],
  [Namespace.citations, citationsDefaultFacets],
  [Namespace.diseases, diseasesDefaultFacets],
  [Namespace.database, databaseDefaultFacets],
  [Namespace.locations, locationsDefaultFacets],
  // Annotations
  [Namespace.unirule, uniRuleDefaultFacets],
  [Namespace.arba, arbaDefaultFacets],
]);

type ApiUrlOptions = {
  namespace?: Namespace;
  query?: string;
  // TODO: change to set of possible fields (if possible, depending on namespace)
  columns?: Column[] | null;
  selectedFacets?: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  facets?: Facets[] | null;
  size?: number;
};

export const getAPIQueryParams = ({
  namespace = Namespace.uniprotkb,
  query = '*',
  columns = [],
  selectedFacets = [],
  sortColumn = undefined,
  sortDirection = SortDirection.ascend,
  facets,
  size,
}: ApiUrlOptions = {}) => {
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
      sortColumn && (sortColumn as string) !== 'score'
        ? `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`
        : undefined,
  };
};

export const getAPIQueryUrl = (options: ApiUrlOptions = {}) =>
  stringifyUrl(
    search(options.namespace || Namespace.uniprotkb),
    getAPIQueryParams(options)
  );

const localBlastFacets = Object.values(BlastFacet) as string[];
const excludeLocalBlastFacets = ({ name }: SelectedFacet) =>
  !localBlastFacets.includes(name);

type GetOptions = {
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

export const getAccessionsURL = (
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
  }: GetOptions = {}
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
