import queryString from 'query-string';
import joinUrl from './testingApiUrls'; // TODO: revert import to: import joinUrl from 'url-join'

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

export const devPrefix = 'https://wwwdev.ebi.ac.uk';
export const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  // uniprotkb query builder terms
  queryBuilderTerms: (namespace: Namespace) =>
    joinUrl(devPrefix, `/uniprot/api/configure/${namespace}/search-fields`),
  // Annotation evidence used by query builder
  evidences: {
    annotation: joinUrl(
      devPrefix,
      '/uniprot/api/configure/uniprotkb/annotation_evidences'
    ),
    // Go evidences used by advanced go search
    // "itemType": "goterm",
    go: joinUrl(devPrefix, '/uniprot/api/configure/uniprotkb/go_evidences'),
  },
  // Database cross references used in the UniParc entry page
  allUniParcDatabases: joinUrl(
    devPrefix,
    'uniprot/api/configure/uniparc/allDatabases'
  ),
  // Database cross references used by query builder
  databaseXrefs: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/databases'
  ),
  // Database cross reference fields in result column configure
  // "itemType": "database",
  databaseFields: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/databasefields'
  ),
  // All result fields except supporting data reference fields
  resultsFields: (namespace: Namespace) =>
    joinUrl(devPrefix, `/uniprot/api/configure/${namespace}/result-fields`),
  // Retrieve results
  search: (namespace: Namespace = Namespace.uniprotkb) =>
    joinUrl(devPrefix, `/uniprot/api/${namespace}/search`),
  download: (namespace: Namespace) =>
    joinUrl(devPrefix, `/uniprot/api/${namespace}/stream`),
  variation: joinUrl(prodPrefix, '/proteins/api/variation'),
  features: joinUrl(prodPrefix, '/proteins/api/features'),
  accessions: joinUrl(devPrefix, '/uniprot/api/uniprotkb/accessions'),
  genecentric: (accession: string) =>
    joinUrl(devPrefix, '/uniprot/api/genecentric/', accession),
  idMappingFields: joinUrl(
    devPrefix,
    '/uniprot/api/configure/idmapping/fields'
  ),

  entry: (id: string | undefined, namespace: Namespace) =>
    id &&
    joinUrl(
      devPrefix,
      // NOTE: The inclusion of /accession/ subpath for uniprotkb is going to be reviewed by backend
      // and potentially removed to bring it in line with the other namespaces
      // NOTE: uniparc entry isn't working/deployed yet
      `/uniprot/api/${namespace}/${
        namespace === Namespace.uniprotkb ? 'accession/' : ''
      }`,
      id
    ),
  sequenceFasta: (accession: string) =>
    `${apiUrls.entry(accession, Namespace.uniprotkb)}.fasta`,
  entryDownload: (accession: string, format: FileFormat) =>
    format === FileFormat.fastaCanonicalIsoform
      ? `${apiUrls.search()}?${queryString.stringify({
          query: `accession:${accession}`,
          includeIsoform: true,
          format: fileFormatToUrlParameter[FileFormat.fastaCanonicalIsoform],
        })}`
      : `${apiUrls.entry(accession, Namespace.uniprotkb)}.${
          fileFormatToUrlParameter[format]
        }`,
  entryPublications: (accession: string) =>
    joinUrl(
      devPrefix,
      '/uniprot/api/uniprotkb/accession',
      accession,
      '/publications'
    ),
  taxonomySuggester: '/uniprot/api/suggester?dict=taxonomy&query=?',
  organismSuggester: '/uniprot/api/suggester?dict=organism&query=?',

  // TODO: move that to UniParc-specific file?
  uniparc: {
    entry: (id?: string) =>
      id && joinUrl(devPrefix, '/uniprot/api/uniparc', id),
  },
};

export default apiUrls;

const RE_QUERY = /\?$/;
export const getSuggesterUrl = (url: string, value: string) =>
  joinUrl(devPrefix, url.replace(RE_QUERY, value));

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
          facet.value.indexOf(' ') >= 0 && !facet.value.match(/^\[.*\]$/)
            ? `"${facet.value}"`
            : facet.value
        })`
    )
    .join(' AND ');

export const createSelectedQueryString = (ids: string[], idField: Column) =>
  ids
    .map((id) => `${idField}:${id}`)
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
  | LocationsFacets;
const defaultFacets = new Map<Namespace, Facets[]>([
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
]);
type QueryUrlProps = {
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
export const getAPIQueryUrl = ({
  namespace = Namespace.uniprotkb,
  query = '*',
  columns = [],
  selectedFacets = [],
  sortColumn = undefined,
  sortDirection = SortDirection.ascend,
  facets,
  size,
}: QueryUrlProps = {}) => {
  let facetField = facets;
  // if null or empty list, don't set default, only for undefined
  // note: could this be moved to useNSQuery?
  if (facetField === undefined) {
    facetField = defaultFacets.get(namespace);
  }
  return `${apiUrls.search(namespace)}?${queryString.stringify({
    size,
    query: `${[query || '*', createFacetsQueryString(selectedFacets)]
      .filter(Boolean)
      .join(' AND ')}`,
    fields: columns?.join(',') || undefined,
    facets: facetField?.join(','),
    sort:
      sortColumn &&
      `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`,
  })}`;
};

const localBlastFacets = Object.values(BlastFacet) as string[];
const excludeLocalBlastFacets = ({ name }: SelectedFacet) =>
  !localBlastFacets.includes(name);

export const getFeaturesURL = (accessions?: string[]) => {
  if (!(accessions && accessions.length)) {
    return null;
  }
  return `${apiUrls.features}?${queryString.stringify({
    // sort to improve possible cache hit
    accession: Array.from(accessions).sort().join(','),
  })}`;
};

type GetOptions = {
  columns?: string[];
  selectedFacets?: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  facets?: Facets[];
  size?: number;
};

export const getAccessionsURL = (
  accessions?: string[],
  {
    columns = [],
    selectedFacets = [],
    sortColumn = undefined,
    sortDirection = SortDirection.ascend,
    facets = defaultFacets.get(Namespace.uniprotkb),
    size,
  }: GetOptions = {}
) => {
  if (!(accessions && accessions.length)) {
    return undefined;
  }
  return `${apiUrls.accessions}?${queryString.stringify({
    size,
    // sort to improve possible cache hit
    accessions: Array.from(accessions).sort().join(','),
    facetFilter:
      createFacetsQueryString(selectedFacets.filter(excludeLocalBlastFacets)) ||
      undefined,
    fields: (columns && columns.join(',')) || undefined,
    facets: facets?.join(',') || undefined,
    sort:
      sortColumn &&
      `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`,
  })}`;
};

type GetUniProtPublicationsQueryUrl = {
  accession: string;
  selectedFacets: SelectedFacet[];
  size?: number;
};
export const getUniProtPublicationsQueryUrl = ({
  accession,
  selectedFacets,
  size,
}: GetUniProtPublicationsQueryUrl) =>
  `${apiUrls.entryPublications(accession)}?${queryString.stringify({
    facets: 'types,categories,is_large_scale',
    facetFilter:
      selectedFacets
        .map((facet) => `(${facet.name}:"${facet.value}")`)
        .join(' AND ') || undefined,
    size,
  })}`;

type GetDownloadUrlProps = {
  query: string;
  columns: string[];
  selectedFacets: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  fileFormat: FileFormat;
  compressed: boolean;
  size?: number;
  selected: string[];
  selectedIdField: Column;
  namespace: Namespace;
};

export const getDownloadUrl = ({
  query,
  columns,
  selectedFacets,
  sortColumn,
  sortDirection = SortDirection.ascend,
  fileFormat,
  compressed = false,
  size,
  selected = [],
  selectedIdField,
  namespace,
}: GetDownloadUrlProps) => {
  // If the consumer of this fn has passed specified a size we have to use the search endpoint
  // otherwise use download/stream which is much quicker but doesn't allow specification of size
  const endpoint = size
    ? apiUrls.search(namespace)
    : apiUrls.download(namespace);
  type Parameters = {
    query: string;
    format: string;
    // TODO: change to set of possible fields (if possible, depending on namespace)
    fields?: string;
    sort?: string;
    includeIsoform?: boolean;
    size?: number;
    compressed?: boolean;
    download: true;
  };
  const parameters: Parameters = {
    query: selected.length
      ? createSelectedQueryString(selected, selectedIdField)
      : `${query}${createFacetsQueryString(selectedFacets)}`,
    // fallback to json if something goes wrong
    format: fileFormatToUrlParameter[fileFormat] || FileFormat.json,
    download: true,
  };
  const isColumnFileFormat = fileFormatsWithColumns.includes(fileFormat);
  if (isColumnFileFormat && sortColumn) {
    parameters.sort = `${sortColumn} ${getApiSortDirection(
      SortDirection[sortDirection]
    )}`;
  }
  if (fileFormat === FileFormat.fastaCanonicalIsoform) {
    parameters.includeIsoform = true;
  }
  if (isColumnFileFormat && columns) {
    parameters.fields = columns.join(',');
  }
  if (size && !selected.length) {
    parameters.size = size;
  }
  if (compressed) {
    parameters.compressed = true;
  }
  return `${endpoint}?${queryString.stringify(parameters)}`;
};

export const getProteinsApiUrl = (accession: string) =>
  `https://www.ebi.ac.uk/proteins/api/proteins/${accession}`;

export const getClustersForProteins = (accessions: string[]) =>
  joinUrl(
    devPrefix,
    `/uniprot/api/uniref/search?query=(${accessions
      .map((accession) => `uniprot_id:${accession}`)
      .join(' OR ')})`
  );
