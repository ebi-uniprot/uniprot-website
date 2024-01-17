import joinUrl from 'url-join';

import {
  SelectedFacet,
  SortDirection,
  getApiSortDirection,
} from '../../../uniprotkb/types/resultsTypes';
import { stringifyUrl } from '../../utils/url';

import {
  fileFormatToUrlParameter,
  fileFormatsWithColumns,
} from '../resultsDownload';
import {
  createFacetsQueryString,
  createSelectedQueryString,
  search,
} from './search';
import { apiPrefix } from './apiPrefix';

import { Namespace } from '../../types/namespaces';
import { FileFormat } from '../../types/resultsDownload';
import { Column } from '../columns';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';

export const download = (namespace: Namespace) =>
  joinUrl(apiPrefix, namespace, 'stream');

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
  download: isDownload = true,
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

  let endpoint = download(namespace);
  if (base) {
    if (base.startsWith(apiPrefix)) {
      endpoint = base;
    } else {
      endpoint = joinUrl(apiPrefix, base);
    }
  } else if (accessions) {
    endpoint = joinUrl(apiPrefix, `/${namespace}/${accessionKey}`);
  } else if (size) {
    endpoint = search(namespace);
  }

  // fallback to json if something goes wrong
  const parameters: Parameters = {
    format: fileFormatToUrlParameter[fileFormat] || FileFormat.json,
  };

  if (isDownload) {
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
