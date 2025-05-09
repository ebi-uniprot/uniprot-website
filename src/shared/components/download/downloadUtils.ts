import { Location as HistoryLocation } from 'history';

import { Location } from '../../../app/config/urls';
import { fileFormatsUnenrichedResultsDownload } from '../../../jobs/id-mapping/config/download';
import { JobTypes } from '../../../jobs/types/jobTypes';
import { FieldData, FieldDatum } from '../../../uniprotkb/types/resultsTypes';
import { reUniProtKBAccession } from '../../../uniprotkb/utils/regexes';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import apiUrls from '../../config/apiUrls/apiUrls';
import { nsToPrimaryKeyColumns } from '../../config/columns';
import { getUniprotFtpFilenamesAndUrls } from '../../config/ftpUrls';
import {
  DOWNLOAD_SIZE_LIMIT,
  DOWNLOAD_SIZE_LIMIT_EMBEDDINGS,
  DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED,
  MAX_PEPTIDE_FACETS_OR_DOWNLOAD,
} from '../../config/limits';
import {
  fileFormatsWithColumns,
  nsToFileFormatsResultsDownload,
} from '../../config/resultsDownload';
import { JobFromUrl } from '../../hooks/useJobFromUrl';
import { Namespace } from '../../types/namespaces';
import { DownloadUrlOptions } from '../../types/results';
import { FileFormat } from '../../types/resultsDownload';
import { DownloadProps } from './Download';
import { DownloadState } from './downloadReducer';

const ID_MAPPING_ASYNC_DOWNLOAD_NAMESPACES = new Set([
  Namespace.uniparc,
  Namespace.uniprotkb,
  Namespace.uniref,
]);
const ID_MAPPING_ASYNC_DOWNLOAD_FILE_FORMATS = new Set([
  FileFormat.tsv,
  FileFormat.json,
]);

const reSubsequence = /\[\d{1,5}-\d{1,5}\]/;
const reSubsequenceFrom = new RegExp(
  `(${reUniProtKBAccession.source})${reSubsequence.source}`,
  'i'
);

export const isSubsequenceFrom = (ids: string) =>
  // Note that current API implementation expects from IDs to be either:
  //  1. 100% subsequence
  //  2. 100% normal
  // eg no mixture in one job
  // When the API does support a mixture we'll need the actual results
  // to determine if any of the successful mapped IDs are subsequence.
  // Until then we can just rely on the job submission IDs.
  ids.split(',').every((id) => id.match(reSubsequenceFrom));

export const getAccessionFromSubSequenceMap = (
  entries?: string[],
  subSeqMap?: Map<string, string>
) => Array.from(new Set(entries?.map((e) => subSeqMap?.get(e) || e)));

export const getFileFormatsOptions = (
  props: DownloadProps<JobTypes>,
  job: JobFromUrl
) => {
  const fileFormatsOptions = nsToFileFormatsResultsDownload[props.namespace];
  if (job.jobResultsLocation === Location.IDMappingResult) {
    if (!job.jobResultsNamespace) {
      return fileFormatsUnenrichedResultsDownload;
    }
    if (
      job.jobResultsNamespace === Namespace.uniprotkb &&
      props?.inputParamsData &&
      'ids' in props.inputParamsData &&
      isSubsequenceFrom(props.inputParamsData.ids)
    ) {
      return [FileFormat.fastaSubsequence, ...fileFormatsOptions];
    }
    // TODO: remove filter once the API supports embeddings id mapping downloads
    if (job.jobResultsNamespace === Namespace.uniprotkb) {
      return fileFormatsOptions.filter((ff) => ff !== FileFormat.embeddings);
    }
  }
  return fileFormatsOptions;
};

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

export const getCountForCustomisableSet = (
  state: DownloadState,
  props: DownloadProps<JobTypes>
) => {
  let totalCount = props.totalNumberResults;
  let selectedCount = state.nSelectedEntries;
  if (props.accessionSubSequenceMap) {
    // Basket view
    if (state.selectedFileFormat !== FileFormat.fastaCanonical) {
      totalCount = getAccessionFromSubSequenceMap(
        props.accessions,
        props.accessionSubSequenceMap
      ).length;
      selectedCount = props.selectedEntries?.length
        ? getAccessionFromSubSequenceMap(
            props.selectedEntries,
            props.accessionSubSequenceMap
          ).length
        : 0;
    }
  }
  return {
    totalCount,
    selectedCount,
  };
};

export const getDownloadCount = (
  state: DownloadState,
  props: DownloadProps<JobTypes>
) => {
  // Count will vary if there is subsequence in the basket
  if (props.accessionSubSequenceMap) {
    if (state.selectedFileFormat === FileFormat.fastaCanonical) {
      return state.downloadSelect === 'all'
        ? props.accessions?.length || 0
        : props.selectedEntries?.length || 0;
    }
    return getAccessionFromSubSequenceMap(
      state.downloadSelect === 'all' ? props.accessions : props.selectedEntries,
      props.accessionSubSequenceMap
    ).length;
  }

  return state.downloadSelect === 'all'
    ? props.totalNumberResults
    : state.nSelectedEntries || 0;
};

export const isAsyncDownloadIdMapping = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: JobFromUrl
) =>
  Boolean(
    job.jobResultsLocation === Location.IDMappingResult &&
      props.namespace === Namespace.idmapping &&
      getDownloadCount(state, props) >
        DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED &&
      job.jobResultsNamespace &&
      ID_MAPPING_ASYNC_DOWNLOAD_NAMESPACES.has(job.jobResultsNamespace) &&
      ID_MAPPING_ASYNC_DOWNLOAD_FILE_FORMATS.has(state.selectedFileFormat)
  );

export const hasColumns = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: JobFromUrl
) =>
  fileFormatsWithColumns.has(state.selectedFileFormat) &&
  (props.namespace !== Namespace.idmapping ||
    isAsyncDownloadIdMapping(state, props, job)) &&
  props.namespace !== Namespace.unisave;

export const showColumnSelect = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: JobFromUrl
) => hasColumns(state, props, job) && !state.disableForm;

export const fullToStandardColumnName = (column: string) =>
  column.includes('_full') ? column.replace('_full', '') : column;

export const isXrefWithFullOption = (
  fieldData: FieldData | FieldDatum,
  id: string
): boolean | undefined => {
  if (Array.isArray(fieldData)) {
    for (const item of fieldData) {
      const isFull = isXrefWithFullOption(item, id);
      if (isFull) {
        return true;
      }
    }
  } else if (fieldData.items) {
    return isXrefWithFullOption(fieldData.items, id);
  } else if (fieldData.id === id) {
    return fieldData.addAsterisk;
  }
  return false;
};

export const filterFullXrefColumns = (
  columns: string[],
  fieldData: FieldData
) =>
  columns
    .map((column) => fullToStandardColumnName(column))
    .filter((column) => isXrefWithFullOption(fieldData, column));

export const getDownloadOptions = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: JobFromUrl
) => {
  const [urlParams] = getParamsFromURL(location.search);

  // Subsequence map is passed from the basket alone and subsequences are considered only in file format FASTA(Canonical)
  const subSequenceCompatible =
    props.accessionSubSequenceMap &&
    state.selectedFileFormat !== FileFormat.fastaCanonical;

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
  if (isAsyncDownloadIdMapping(state, props, job)) {
    downloadBase = undefined;
  } else if (job.jobResultsLocation === Location.IDMappingResult) {
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
    selected: subSequenceCompatible
      ? getAccessionFromSubSequenceMap(selected, props.accessionSubSequenceMap)
      : selected,
    selectedIdField,
    namespace: props.namespace,
    accessions: subSequenceCompatible
      ? getAccessionFromSubSequenceMap(
          props.accessions,
          props.accessionSubSequenceMap
        )
      : props.accessions,
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
  job: JobFromUrl
) => {
  if (isAsyncDownloadIdMapping(state, props, job)) {
    return undefined;
  }
  const previewFileFormat = getPreviewFileFormat(state);
  if (!previewFileFormat) {
    return undefined;
  }
  const previewOptions: DownloadUrlOptions = {
    ...getDownloadOptions(state, props, location, job),
    fileFormat: previewFileFormat,
    compressed: false,
    size: Math.min(10, getDownloadCount(state, props)),
    base: props.base,
  };
  if (props.namespace === Namespace.unisave) {
    if (props.selectedEntries?.length) {
      previewOptions.selected = props.selectedEntries.reverse().slice(0, 10);
    } else if (props.base) {
      previewOptions.base = props.base.replace('/unisave/', '/uniprotkb/');
      previewOptions.version = 'last';
    }
    previewOptions.size = undefined;
  }
  return previewOptions;
};

export const getPreviewCount = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: JobFromUrl
) => {
  const previewOptions = getPreviewOptions(state, props, location, job);
  if (!previewOptions) {
    return null;
  }
  if (
    props.namespace === Namespace.unisave &&
    previewOptions?.selected.length
  ) {
    return previewOptions.selected.length;
  }
  return previewOptions?.size || 'file';
};

export const getFtpFilenamesAndUrls = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: JobFromUrl
) =>
  job.jobResultsLocation !== Location.IDMappingResult
    ? getUniprotFtpFilenamesAndUrls(
        props.namespace,
        apiUrls.results.download(
          getDownloadOptions(state, props, location, job)
        ),
        state.selectedFileFormat
      )
    : null;

export const getIsAsyncDownload = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: JobFromUrl
) =>
  (props.namespace === Namespace.uniprotkb &&
    ((state.selectedFileFormat === FileFormat.embeddings &&
      !getFtpFilenamesAndUrls(state, props, location, job)) ||
      getDownloadCount(state, props) > DOWNLOAD_SIZE_LIMIT)) ||
  (props.namespace === Namespace.uniparc &&
    getDownloadCount(state, props) > DOWNLOAD_SIZE_LIMIT) ||
  (props.namespace === Namespace.uniref &&
    getDownloadCount(state, props) > DOWNLOAD_SIZE_LIMIT) ||
  isAsyncDownloadIdMapping(state, props, job);

export const getColumnsNamespace = (
  props: DownloadProps<JobTypes>,
  job: JobFromUrl
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
  job: JobFromUrl
) => {
  if (
    (state.extraContent === 'ftp' || state.extraContent === 'url') &&
    getFtpFilenamesAndUrls(state, props, location, job)
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
    getIsAsyncDownload(state, props, location, job)
  ) {
    return 'generate';
  }
  if (state.extraContent === 'preview') {
    return 'preview';
  }
  return null;
};

export const getIsUniParcLightResponse = (
  state: DownloadState,
  props: DownloadProps<JobTypes>
) =>
  props.namespace === Namespace.uniparc &&
  (state.selectedFileFormat === FileFormat.json ||
    state.selectedFileFormat === FileFormat.xml ||
    state.selectedFileFormat === FileFormat.rdfXml);

export const getRedirectToIDMapping = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: JobFromUrl
) =>
  // Peptide search download for matches exceeding the threshold
  job.jobResultsLocation === Location.PeptideSearchResult &&
  getDownloadCount(state, props) > MAX_PEPTIDE_FACETS_OR_DOWNLOAD;
