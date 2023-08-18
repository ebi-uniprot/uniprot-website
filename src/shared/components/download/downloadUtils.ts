import { Location as HistoryLocation } from 'history';

import { DOWNLOAD_SIZE_LIMIT } from './DownloadAPIURL';

import { MAX_PEPTIDE_FACETS_OR_DOWNLOAD } from '../../../tools/peptide-search/components/results/PeptideSearchResult';

import useJobFromUrl from '../../hooks/useJobFromUrl';

import { DownloadState } from './downloadReducer';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import { getDownloadUrl, DownloadUrlOptions } from '../../config/apiUrls';
import { nsToPrimaryKeyColumns } from '../../config/columns';
import { fileFormatsWithColumns } from '../../config/resultsDownload';
import { getUniprotkbFtpFilenameAndUrl } from '../../config/ftpUrls';
import { Location } from '../../../app/config/urls';

import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { DownloadProps } from './Download';

const DOWNLOAD_SIZE_LIMIT_EMBEDDINGS = 1_000_000 as const;
export const DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED = 100_000 as const;

const ID_MAPPING_ASYNC_DOWNLOAD_NAMESPACES = new Set([
  Namespace.uniparc,
  Namespace.uniprotkb,
  Namespace.uniref,
]);
const ID_MAPPING_ASYNC_DOWNLOAD_FILE_FORMATS = new Set([
  FileFormat.tsv,
  FileFormat.json,
]);

export const getPreviewFileFormat = (
  state: DownloadState
): FileFormat | undefined => {
  if (
    state.selectedFileFormat === FileFormat.excel ||
    state.selectedFileFormat === FileFormat.excelIdMappingFromTo
  ) {
    return FileFormat.tsv;
  }
  if (state.selectedFileFormat === FileFormat.embeddings) {
    return undefined;
  }
  return state.selectedFileFormat;
};

export const getDownloadCount = (
  state: DownloadState,
  props: DownloadProps<JobTypes>
) =>
  state.downloadSelect === 'all'
    ? props.totalNumberResults
    : state.nSelectedEntries || 0;

export const getIsAsyncDownloadIdMapping = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: ReturnType<typeof useJobFromUrl>
) =>
  job.jobResultsLocation === Location.IDMappingResult &&
  props.namespace === Namespace.idmapping &&
  getDownloadCount(state, props) > DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED &&
  job.jobResultsNamespace &&
  ID_MAPPING_ASYNC_DOWNLOAD_NAMESPACES.has(job.jobResultsNamespace) &&
  ID_MAPPING_ASYNC_DOWNLOAD_FILE_FORMATS.has(state.selectedFileFormat);

export const hasColumns = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: ReturnType<typeof useJobFromUrl>
) =>
  fileFormatsWithColumns.has(state.selectedFileFormat) &&
  (props.namespace !== Namespace.idmapping ||
    getIsAsyncDownloadIdMapping(state, props, job)) &&
  props.namespace !== Namespace.unisave;

export const getDownloadOptions = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: ReturnType<typeof useJobFromUrl>
) => {
  const [urlParams] = getParamsFromURL(location.search);
  // If query prop provided use this otherwise fallback to query from URL
  const query =
    state.downloadSelect === 'all'
      ? props.query || urlParams.query
      : props.selectedQuery || urlParams.query;
  const selected =
    state.downloadSelect === 'selected' &&
    !props.selectedQuery &&
    props.selectedEntries &&
    // If all history entries are selected, act as if it was a "download all"
    !(
      props.namespace === Namespace.unisave &&
      props.selectedEntries?.length === props.totalNumberResults
    )
      ? props.selectedEntries
      : [];

  // The ID Mapping URL provided from the job details is for the paginated results
  // endpoint while the stream endpoint is required for downloads
  let downloadBase = props.base;
  if (job.jobResultsLocation === Location.IDMappingResult) {
    if (job.jobResultsNamespace && !props.notCustomisable) {
      downloadBase = downloadBase?.replace('/results/', '/results/stream/');
    } else {
      downloadBase = downloadBase?.replace('/results/', '/stream/');
    }
  }

  const [selectedIdField] = nsToPrimaryKeyColumns(props.namespace);

  const downloadOptions: DownloadUrlOptions = {
    fileFormat: state.selectedFileFormat,
    compressed: state.compressed,
    selected,
    selectedIdField,
    namespace: props.namespace,
    accessions: props.accessions,
    base: downloadBase,
  };

  if (!props.inBasketMini) {
    downloadOptions.query = query;
    downloadOptions.selectedFacets = urlParams.selectedFacets;
    downloadOptions.sortColumn = urlParams.sortColumn;
    downloadOptions.sortDirection = urlParams.sortDirection;
  }

  if (hasColumns(state, props, job)) {
    downloadOptions.columns = state.selectedColumns;
  }
  return downloadOptions;
};

export const getPreviewOptions = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: ReturnType<typeof useJobFromUrl>
) => {
  const previewFileFormat = getPreviewFileFormat(state);
  const previewOptions: DownloadUrlOptions | undefined = previewFileFormat && {
    ...getDownloadOptions(state, props, location, job),
    fileFormat: previewFileFormat,
    compressed: false,
    size: Math.min(10, getDownloadCount(state, props)),
    base: props.base,
  };
  if (previewOptions && props.namespace === Namespace.unisave) {
    // get only the first 10 entries instead of using the size parameters
    previewOptions.selected = previewOptions.selected.slice(0, 10);
  }
  return previewOptions;
};

export const getIsAsyncDownload = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: ReturnType<typeof useJobFromUrl>
) =>
  (props.namespace === Namespace.uniprotkb &&
    (state.selectedFileFormat === FileFormat.embeddings ||
      getDownloadCount(state, props) > DOWNLOAD_SIZE_LIMIT)) ||
  getIsAsyncDownloadIdMapping(state, props, job);

export const getFtpFilenameAndUrl = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: ReturnType<typeof useJobFromUrl>
) =>
  props.namespace === Namespace.uniprotkb &&
  job.jobResultsLocation !== Location.IDMappingResult
    ? getUniprotkbFtpFilenameAndUrl(
        getDownloadUrl(getDownloadOptions(state, props, location, job)),
        state.selectedFileFormat
      )
    : null;

export const getColumnsNamespace = (
  props: DownloadProps<JobTypes>,
  job: ReturnType<typeof useJobFromUrl>
) => job?.jobResultsNamespace || props.namespace;

export const getIsEmbeddings = (state: DownloadState) =>
  state.selectedFileFormat === FileFormat.embeddings;

export const getIsTooLargeForEmbeddings = (
  state: DownloadState,
  props: DownloadProps<JobTypes>
) =>
  getIsEmbeddings(state) &&
  getDownloadCount(state, props) > DOWNLOAD_SIZE_LIMIT_EMBEDDINGS;

export const getExtraContent = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: ReturnType<typeof useJobFromUrl>
) => {
  if (
    (state.extraContent === 'ftp' || state.extraContent === 'url') &&
    getFtpFilenameAndUrl(state, props, location, job)
  ) {
    return 'ftp';
  }
  if (
    state.extraContent === 'url' ||
    // Hopefully temporary, this is because of restrictions on embeddings
    (state.extraContent === 'generate' &&
      getIsTooLargeForEmbeddings(state, props))
  ) {
    return 'url';
  }
  if (
    state.extraContent === 'generate' &&
    getIsAsyncDownload(state, props, job)
  ) {
    return 'generate';
  }
  if (
    state.extraContent === 'preview' &&
    getPreviewOptions(state, props, location, job)
  ) {
    return 'preview';
  }
  return null;
};

export const getRedirectToIDMapping = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: ReturnType<typeof useJobFromUrl>
) =>
  // Peptide search download for matches exceeding the threshold
  job.jobResultsLocation === Location.PeptideSearchResult &&
  getDownloadCount(state, props) > MAX_PEPTIDE_FACETS_OR_DOWNLOAD;
