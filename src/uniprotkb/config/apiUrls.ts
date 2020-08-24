import queryString from 'query-string';
import joinUrl from 'url-join';

import {
  getApiSortDirection,
  SortDirection,
  SelectedFacet,
  FileFormat,
  fileFormatsWithColumns,
  fileFormatToUrlParameter,
} from '../types/resultsTypes';
import { SortableColumn } from '../types/columnTypes';
import { BlastFacet } from '../../tools/blast/types/blastResults';

export const devPrefix = 'https://wwwdev.ebi.ac.uk';
export const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  // uniprotkb advanced search terms
  advancedSearchTerms: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/search_terms'
  ),
  // Annotation evidence used by advanced search
  evidences: {
    annotation: joinUrl(
      devPrefix,
      '/uniprot/api/configure/uniprotkb/annotation_evidences'
    ),
    // Go evidences used by advanced go search
    // "itemType": "goterm",
    go: joinUrl(devPrefix, '/uniprot/api/configure/uniprotkb/go_evidences'),
  },
  // Database cross references used by advanced search

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
  // All result fields except database cross reference fields
  resultsFields: joinUrl(
    devPrefix,
    '/uniprot/api/configure/uniprotkb/result-fields'
  ),
  // Retrieve results
  search: joinUrl(devPrefix, '/uniprot/api/uniprotkb/search'),
  download: joinUrl(devPrefix, '/uniprot/api/uniprotkb/stream'),
  variation: joinUrl(prodPrefix, '/proteins/api/variation'),
  features: joinUrl(prodPrefix, '/proteins/api/features'),
  accessions: joinUrl(devPrefix, '/uniprot/api/uniprotkb/accessions'),

  entry: (accession: string) =>
    joinUrl(devPrefix, '/uniprot/api/uniprotkb/accession', accession),
  sequenceFasta: (accession: string) => `${apiUrls.entry(accession)}.fasta`,
  entryDownload: (accession: string, format: FileFormat) =>
    format === FileFormat.fastaCanonicalIsoform
      ? `${apiUrls.search}?${queryString.stringify({
          query: `accession:${accession}`,
          includeIsoform: true,
          format: fileFormatToUrlParameter.get(
            FileFormat.fastaCanonicalIsoform
          ),
        })}`
      : `${apiUrls.entry(accession)}.${fileFormatToUrlParameter.get(format)}`,
  entryPublications: (accession: string) =>
    joinUrl(
      devPrefix,
      '/uniprot/api/uniprotkb/accession',
      accession,
      '/publications'
    ),
  organismSuggester: '/uniprot/api/suggester?dict=organism&query=?',
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

export const createAccessionsQueryString = (accessions: string[]) =>
  accessions
    .map((accession) => `accession:${accession}`)
    .sort() // to improve possible cache hit
    .join(' OR ');

const defaultFacets = [
  'reviewed',
  'model_organism',
  'proteins_with',
  'existence',
  'annotation_score',
  'length',
];
// TODO: should probably change those params to an object
export const getAPIQueryUrl = (
  query: string,
  columns: string[] = [],
  selectedFacets: SelectedFacet[] = [],
  sortColumn: SortableColumn | undefined = undefined,
  sortDirection: SortDirection | undefined = SortDirection.ascend,
  facets: string[] = defaultFacets,
  size?: number
) => {
  return `${apiUrls.search}?${queryString.stringify({
    size,
    query: `${[query || '*', createFacetsQueryString(selectedFacets)]
      .filter(Boolean)
      .join(' AND ')}`,
    fields: (columns && columns.join(',')) || undefined,
    facets: facets.join(',') || undefined,
    sort:
      sortColumn &&
      `${sortColumn} ${getApiSortDirection(SortDirection[sortDirection])}`,
  })}`;
};

const localBlastFacets = Object.values(BlastFacet) as string[];
const excludeLocalBlastFacets = ({ name }: SelectedFacet) =>
  !localBlastFacets.includes(name);

type GetOptions = {
  columns?: string[];
  selectedFacets?: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  facets?: string[];
  size?: number;
};

export const getFeaturesURL = (accessions?: string[]) => {
  if (!(accessions && accessions.length)) {
    return null;
  }
  return `${apiUrls.features}?${queryString.stringify({
    // sort to improve possible cache hit
    accession: Array.from(accessions).sort().join(','),
  })}`;
};

export const getAccessionsURL = (
  accessions?: string[],
  {
    columns = [],
    selectedFacets = [],
    sortColumn = undefined,
    sortDirection = SortDirection.ascend,
    facets = defaultFacets,
    size,
  }: GetOptions = {}
) => {
  if (!(accessions && accessions.length)) {
    return null;
  }
  return `${apiUrls.accessions}?${queryString.stringify({
    size,
    // sort to improve possible cache hit
    accessions: Array.from(accessions).sort().join(','),
    facetFilter:
      createFacetsQueryString(selectedFacets.filter(excludeLocalBlastFacets)) ||
      undefined,
    fields: (columns && columns.join(',')) || undefined,
    facets: facets.join(',') || undefined,
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
    facets: 'source,category,study_type',
    query:
      selectedFacets
        .map((facet) => `(${facet.name}:"${facet.value}")`)
        .join(' AND ') || undefined,
    size,
  })}`;

export const getDownloadUrl = ({
  query,
  columns,
  selectedFacets,
  sortColumn,
  sortDirection = SortDirection.ascend,
  fileFormat,
  compressed = false,
  size,
  selectedAccessions = [],
}: {
  query: string;
  columns: string[];
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  fileFormat: FileFormat;
  compressed: boolean;
  size?: number;
  selectedAccessions: string[];
}) => {
  const parameters: {
    query: string;
    format: string;
    fields?: string;
    sort?: string;
    includeIsoform?: boolean;
    size?: number;
    compressed?: boolean;
    download: true;
  } = {
    query: selectedAccessions.length
      ? createAccessionsQueryString(selectedAccessions)
      : `${query}${createFacetsQueryString(selectedFacets)}`,
    // fallback to json if something goes wrong
    format: fileFormatToUrlParameter.get(fileFormat) || 'json',
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
  if (size && !selectedAccessions.length) {
    parameters.size = size;
  }
  if (compressed) {
    parameters.compressed = true;
  }
  return `${apiUrls.download}?${queryString.stringify(parameters)}`;
};

export const literatureApiUrls = {
  literature: joinUrl(devPrefix, '/uniprot/api/literature'),
};

export const getPublicationURL = (id: string) =>
  joinUrl(literatureApiUrls.literature, id);

export const getPublicationsURL = (ids: string[]) =>
  `${literatureApiUrls.literature}/search?query=(${ids
    .map((id) => `id:${id}`)
    .join(' OR ')})`;

export const getProteinsApiUrl = (accession: string) =>
  `https://www.ebi.ac.uk/proteins/api/proteins/${accession}`;
