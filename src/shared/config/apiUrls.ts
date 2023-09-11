import joinUrl from 'url-join';

import { fromCleanMapper } from '../utils/getIdKey';
import { stringifyUrl } from '../utils/url';
import {
  getApiSortDirection,
  SortDirection,
  SelectedFacet,
} from '../../uniprotkb/types/resultsTypes';
import { SortableColumn } from '../../uniprotkb/types/columnTypes';
import { BlastFacet } from '../../tools/blast/types/blastResults';
import { Namespace } from '../types/namespaces';
import { Column } from './columns';
import { FileFormat } from '../types/resultsDownload';
import {
  fileFormatToUrlParameter,
  fileFormatsWithColumns,
} from './resultsDownload';

// Main data
import {
  Facets as UniProtKBFacets,
  defaultFacets as uniProtKBDefaultFacets,
} from '../../uniprotkb/config/UniProtKBFacetConfiguration';
import {
  Facets as UniRefFacets,
  defaultFacets as uniRefDefaultFacets,
} from '../../uniref/config/UniRefFacetConfiguration';
import {
  Facets as UniParcFacets,
  defaultFacets as uniParcDefaultFacets,
} from '../../uniparc/config/UniParcFacetConfiguration';
import {
  Facets as ProteomesFacets,
  defaultFacets as proteomesDefaultFacets,
} from '../../proteomes/config/ProteomesFacetConfiguration';
// Supporting data
import {
  Facets as TaxonomyFacets,
  defaultFacets as taxonomyDefaultFacets,
} from '../../supporting-data/taxonomy/config/TaxonomyFacetConfiguration';
import {
  Facets as KeywordsFacets,
  defaultFacets as keywordsDefaultFacets,
} from '../../supporting-data/keywords/config/KeywordsFacetConfiguration';
import {
  Facets as CitationsFacets,
  defaultFacets as citationsDefaultFacets,
} from '../../supporting-data/citations/config/CitationsFacetConfiguration';
import {
  Facets as DiseasesFacets,
  defaultFacets as diseasesDefaultFacets,
} from '../../supporting-data/diseases/config/DiseasesFacetConfiguration';
import {
  Facets as DatabaseFacets,
  defaultFacets as databaseDefaultFacets,
} from '../../supporting-data/database/config/DatabaseFacetConfiguration';
import {
  Facets as LocationsFacets,
  defaultFacets as locationsDefaultFacets,
} from '../../supporting-data/locations/config/LocationsFacetConfiguration';

import {
  Facets as UniRuleFacets,
  defaultFacets as uniRuleDefaultFacets,
} from '../../automatic-annotations/unirule/config/UniRuleFacetConfiguration';
import {
  Facets as ARBAFacets,
  defaultFacets as arbaDefaultFacets,
} from '../../automatic-annotations/arba/config/ARBAFacetConfiguration';

// Help
import { defaultFacets as helpDefaultFacets } from '../../help/config/HelpFacetConfiguration';

// Injected by webpack
export const apiPrefix = API_PREFIX;

const apiUrls = {
  // uniprotkb query builder terms
  queryBuilderTerms: (namespace: Namespace) =>
    joinUrl(apiPrefix, 'configure', namespace, 'search-fields'),
  // Annotation evidence used by query builder
  evidences: {
    annotation: joinUrl(apiPrefix, 'configure/uniprotkb/annotation_evidences'),
    // Go evidences used by advanced go search
    // "itemType": "goterm",
    go: joinUrl(apiPrefix, 'configure/uniprotkb/go_evidences'),
  },
  // Database cross references used
  allDatabases: (namespace: Namespace) =>
    joinUrl(apiPrefix, 'configure', namespace, 'allDatabases'),
  // Database cross references used by query builder
  databaseXrefs: joinUrl(apiPrefix, 'configure/uniprotkb/databases'),
  // All result fields except supporting data reference fields
  resultsFields: (namespace: Namespace, isEntry?: boolean) =>
    joinUrl(
      apiPrefix,
      'configure',
      namespace,
      isEntry ? 'entry-' : '',
      'result-fields'
    ),
  // Retrieve results
  search: (namespace: Namespace = Namespace.uniprotkb) =>
    joinUrl(apiPrefix, namespace, 'search'),
  download: (namespace: Namespace) => joinUrl(apiPrefix, namespace, 'stream'),
  variation: 'https://www.ebi.ac.uk/proteins/api/variation', // TODO: Back end plan to add this endpoint to the k8s deployment (uniprot/beta/api). When this happens update this URL accordingly
  genecentric: (accession: string) =>
    stringifyUrl(joinUrl(apiPrefix, 'genecentric/search'), {
      query: `accession:${accession}`,
    }),
  idMappingFields: joinUrl(apiPrefix, 'configure/idmapping/fields'),
  entry: (id: string | undefined, namespace: Namespace, columns?: Column[]) => {
    if (!id) {
      return undefined;
    }
    const url = joinUrl(apiPrefix, namespace, id);
    if (columns?.length) {
      return stringifyUrl(url, { fields: columns.join(',') });
    }
    return url;
  },
  sequenceFasta: (accession: string) =>
    `${apiUrls.entry(accession, Namespace.uniprotkb)}.fasta`,
  entryDownload: (
    accession: string,
    format: FileFormat,
    namespace: Namespace = Namespace.uniprotkb
  ) =>
    format === FileFormat.fastaCanonicalIsoform
      ? stringifyUrl(apiUrls.search(namespace), {
          query: `accession:${accession}`,
          includeIsoform: true,
          format: fileFormatToUrlParameter[FileFormat.fastaCanonicalIsoform],
        })
      : `${apiUrls.entry(accession, namespace)}.${
          fileFormatToUrlParameter[format]
        }`,
  entryPublications: (accession: string) =>
    joinUrl(apiPrefix, 'uniprotkb', accession, 'publications'),
  taxonomySuggester: 'suggester?dict=taxonomy&query=?',
  organismSuggester: 'suggester?dict=organism&query=?',

  contact: {
    token: joinUrl(apiPrefix, 'contact', 'token'),
    send: joinUrl(apiPrefix, 'contact', 'send'),
  },

  statistics: (releaseNumber: string, type: 'reviewed' | 'unreviewed') =>
    joinUrl(apiPrefix, 'statistics', 'releases', releaseNumber, type),
};

export default apiUrls;

const RE_QUERY = /\?$/;
export const getSuggesterUrl = (url: string, value: string) =>
  joinUrl(apiPrefix, url.replace(RE_QUERY, value));

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
    sort: sortColumn
      ? `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`
      : undefined,
  };
};

export const getAPIQueryUrl = (options: ApiUrlOptions = {}) =>
  stringifyUrl(
    apiUrls.search(options.namespace || Namespace.uniprotkb),
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

type GetUniProtPublicationsQueryUrl = {
  accession: string;
  facets?: string[];
  selectedFacets: SelectedFacet[];
  size?: number;
};
export const getUniProtPublicationsQueryUrl = ({
  accession,
  facets,
  selectedFacets,
  size,
}: GetUniProtPublicationsQueryUrl) =>
  stringifyUrl(apiUrls.entryPublications(accession), {
    facets: facets?.join(','),
    facetFilter:
      selectedFacets
        .map((facet) => `(${facet.name}:"${facet.value}")`)
        .join(' AND ') || undefined,
    size,
  });

type Parameters = {
  query?: string;
  accessions?: string;
  upis?: string;
  ids?: string;
  versions?: string; // UniSave-specific
  uniqueSequences?: boolean; // UniSave-specific
  format: string;
  // TODO: change to set of possible fields (if possible, depending on namespace)
  fields?: string;
  sort?: string;
  includeIsoform?: boolean;
  subsequence?: boolean;
  size?: number;
  compressed?: boolean;
  download?: true;
  jobId?: string;
};

export type DownloadUrlOptions = {
  base?: string;
  query?: string;
  columns?: string[];
  selectedFacets?: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  fileFormat: FileFormat;
  compressed: boolean;
  size?: number;
  selected: string[];
  selectedIdField: Column;
  namespace: Namespace;
  accessions?: string[];
  download?: boolean;
  jobId?: string; // ID Mapping Async Download
  version?: string;
};

export const getDownloadUrl = ({
  base,
  query,
  columns,
  selectedFacets = [],
  sortColumn,
  sortDirection = SortDirection.ascend,
  fileFormat,
  compressed = false,
  size,
  selected = [],
  selectedIdField,
  namespace,
  accessions,
  download = true,
  jobId,
}: DownloadUrlOptions) => {
  // If the consumer of this fn has specified a size we have to use the search endpoint
  // otherwise use download/stream which is much quicker but doesn't allow specification of size

  // for UniProtKB
  let accessionKey: keyof Parameters = 'accessions'; // This changes depending on the endpoint...
  if (namespace === Namespace.uniref) {
    accessionKey = 'ids';
  } else if (namespace === Namespace.uniparc) {
    accessionKey = 'upis';
  }

  let endpoint = apiUrls.download(namespace);
  if (base) {
    if (base.startsWith(apiPrefix)) {
      endpoint = base;
    } else {
      endpoint = joinUrl(apiPrefix, base);
    }
  } else if (accessions) {
    endpoint = joinUrl(apiPrefix, `/${namespace}/${accessionKey}`);
  } else if (size) {
    endpoint = apiUrls.search(namespace);
  }

  // fallback to json if something goes wrong
  const parameters: Parameters = {
    format: fileFormatToUrlParameter[fileFormat] || FileFormat.json,
  };

  if (download) {
    parameters.download = true;
  }

  if (accessions) {
    parameters[accessionKey] = Array.from(
      selected.length ? selected : accessions
    )
      .sort()
      .join(',');
    parameters.query = [query, createFacetsQueryString(selectedFacets)]
      .filter(Boolean)
      .join(' AND ');
  } else if (namespace === Namespace.unisave) {
    parameters.versions = selected.length ? selected.join(',') : undefined;
    if (fileFormat === FileFormat.fasta) {
      parameters.uniqueSequences = true;
    }
  } else {
    parameters.query = selected.length
      ? createSelectedQueryString(selected, selectedIdField)
      : [query && `(${query})`, createFacetsQueryString(selectedFacets)]
          .filter(Boolean)
          .join(' AND ');
  }
  // If nullish, just set to undefined to remove from the URL
  parameters.query ||= undefined;

  if (sortColumn) {
    parameters.sort = `${sortColumn} ${getApiSortDirection(
      SortDirection[sortDirection]
    )}`;
  }

  // Can't customise columns on UniSave
  if (
    fileFormatsWithColumns.has(fileFormat) &&
    columns &&
    namespace !== Namespace.unisave
  ) {
    parameters.fields = columns.join(',');
  }

  if (fileFormat === FileFormat.fastaCanonicalIsoform) {
    parameters.includeIsoform = true;
  } else if (fileFormat === FileFormat.fastaSubsequence) {
    parameters.subsequence = true;
  }

  if (size && !selected.length) {
    parameters.size = size;
  }

  if (compressed) {
    parameters.compressed = true;
  }

  // ID Mapping Async Download
  if (jobId) {
    parameters.jobId = jobId;
  }
  return stringifyUrl(endpoint, parameters);
};

const proteinsApiPrefix = 'https://www.ebi.ac.uk/proteins/api';
export const proteinsApi = {
  proteins: (accession: string) =>
    joinUrl(proteinsApiPrefix, 'proteins', accession),
  proteomicsPtm: (accession: string) =>
    joinUrl(proteinsApiPrefix, 'proteomics-ptm', accession),
};

// Help endpoints
export const help = {
  accession: (accession?: string) =>
    accession && joinUrl(apiPrefix, 'help', accession),
  search: ({
    query,
    sort,
    fields,
    queryFacets,
    facets = helpDefaultFacets,
    size,
  }: Record<string, string[] | string | null>) =>
    stringifyUrl(joinUrl(apiPrefix, 'help/search'), {
      query: [
        query || '*',
        ...(Array.isArray(queryFacets)
          ? queryFacets
          : (queryFacets || '').split(',')
        )
          .filter(Boolean)
          // Sort in order to improve cache hits
          .sort()
          .map((facet) => {
            const [facetName, facetValue] = (facet || '').split(':');
            return `(${facetName}:${
              facetValue.includes(' ') ? `"${facetValue}"` : facetValue
            })`;
          }),
      ]
        .filter(Boolean)
        .join(' AND '),
      sort,
      fields,
      facets,
      size,
    }),
};

// News endpoints
export const news = {
  accession: (accession?: string) =>
    accession && joinUrl(apiPrefix, 'release-notes', accession),
  search: ({ query, sort }: Record<string, string[] | string | null>) =>
    stringifyUrl(joinUrl(apiPrefix, 'release-notes/search'), {
      query: [query || '*'].filter(Boolean).join(' AND '),
      sort:
        sort || `release_date ${getApiSortDirection(SortDirection.descend)}`,
    }),
};

export const unisave = {
  accession: (
    accession: string,
    {
      format,
      entryVersions,
      download,
      includeContent,
    }: {
      format: 'json' | 'fasta' | 'txt';
      entryVersions?: number | number[];
      download?: boolean;
      includeContent?: boolean;
    } = { format: 'json' }
  ) =>
    accession &&
    stringifyUrl(joinUrl(apiPrefix, 'unisave', accession), {
      format,
      versions: entryVersions,
      download: download ? 'true' : undefined,
      includeContent: includeContent ? 'true' : undefined,
    }),
  status: (accession: string) =>
    accession && joinUrl(apiPrefix, 'unisave', accession, 'status'),
  diff: (accession: string, version1: number, version2: number) =>
    accession &&
    stringifyUrl(joinUrl(apiPrefix, 'unisave', accession, 'diff'), {
      version1,
      version2,
    }),
};
