/* eslint-disable react/no-unused-prop-types */
import { ChangeEvent, useReducer } from 'react';
import { Location as HistoryLocation } from 'history';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { Button, DownloadIcon, LongNumber, Message } from 'franklin-sites';
import cn from 'classnames';

import ColumnSelect from '../column-select/ColumnSelect';
import DownloadPreview from './DownloadPreview';
import DownloadAPIURL, { DOWNLOAD_SIZE_LIMIT } from './DownloadAPIURL';
import ExternalLink from '../ExternalLink';

import { MAX_PEPTIDE_FACETS_OR_DOWNLOAD } from '../../../tools/peptide-search/components/results/PeptideSearchResult';

import useColumnNames from '../../hooks/useColumnNames';
import useJobFromUrl from '../../hooks/useJobFromUrl';

import AsyncDownloadForm from '../../../tools/async-download/components/AsyncDownloadForm';

import {
  DownloadState,
  downloadReducer,
  getDownloadInitialState,
} from './downloadReducer';
import {
  updateSelectedFileFormat,
  updateSelectedColumns,
  updateDownloadSelect,
  updateCompressed,
  updateExtraContent,
} from './downloadActions';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import { getDownloadUrl, DownloadUrlOptions } from '../../config/apiUrls';
import { nsToPrimaryKeyColumns } from '../../config/columns';
import { fileFormatsWithColumns } from '../../config/resultsDownload';
import { getUniprotkbFtpFilenameAndUrl } from '../../config/ftpUrls';
import { Location, LocationToPath } from '../../../app/config/urls';

import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import {
  DownloadMethod,
  DownloadPanelFormCloseReason,
} from '../../utils/gtagEvents';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { PublicServerParameters } from '../../../tools/types/toolsServerParameters';

import sticky from '../../styles/sticky.module.scss';
import styles from './styles/download.module.scss';

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
  fileFormat: FileFormat
): FileFormat | undefined => {
  if (
    fileFormat === FileFormat.excel ||
    fileFormat === FileFormat.excelIdMappingFromTo
  ) {
    return FileFormat.tsv;
  }
  if (fileFormat === FileFormat.embeddings) {
    return undefined;
  }
  return fileFormat;
};

export type DownloadSelectOptions = 'all' | 'selected';

const getDownloadCount = (
  state: DownloadState,
  props: DownloadProps<JobTypes>
) =>
  state.downloadSelect === 'all'
    ? props.totalNumberResults
    : state.nSelectedEntries || 0;

const getIsAsyncDownloadIdMapping = (
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

const hasColumns = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: ReturnType<typeof useJobFromUrl>
) =>
  fileFormatsWithColumns.has(state.selectedFileFormat) &&
  (props.namespace !== Namespace.idmapping ||
    getIsAsyncDownloadIdMapping(state, props, job)) &&
  props.namespace !== Namespace.unisave;

const getDownloadOptions = (
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

const getPreviewOptions = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: ReturnType<typeof useJobFromUrl>
) => {
  const previewFileFormat = getPreviewFileFormat(state.selectedFileFormat);
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

const getIsAsyncDownload = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  job: ReturnType<typeof useJobFromUrl>
) =>
  (props.namespace === Namespace.uniprotkb &&
    (state.selectedFileFormat === FileFormat.embeddings ||
      getDownloadCount(state, props) > DOWNLOAD_SIZE_LIMIT)) ||
  getIsAsyncDownloadIdMapping(state, props, job);

const getFtpFilenameAndUrl = (
  state: DownloadState,
  props: DownloadProps<JobTypes>,
  location: HistoryLocation<unknown>,
  job: ReturnType<typeof useJobFromUrl>
) =>
  props.namespace === Namespace.uniprotkb &&
  job.jobResultsLocation === Location.IDMappingResult
    ? getUniprotkbFtpFilenameAndUrl(
        getDownloadUrl(getDownloadOptions(state, props, location, job)),
        state.selectedFileFormat
      )
    : null;

export type DownloadProps<T extends JobTypes> = {
  query?: string;
  selectedEntries?: string[];
  selectedQuery?: string;
  totalNumberResults: number;
  numberSelectedEntries?: number;
  namespace: Namespace;
  onClose: (
    panelCloseReason: DownloadPanelFormCloseReason,
    downloadMethod?: DownloadMethod
  ) => void;
  accessions?: string[];
  base?: string;
  supportedFormats?: FileFormat[];
  notCustomisable?: boolean;
  inBasketMini?: boolean;
  showReviewedOption?: boolean;
  jobType?: T;
  inputParamsData?: PublicServerParameters[T];
};

const Download = (props: DownloadProps<JobTypes>) => {
  const {
    selectedEntries = [],
    totalNumberResults,
    onClose,
    namespace,
    accessions,
    showReviewedOption = false,
    jobType,
    inputParamsData,
  } = props;
  const { columnNames } = useColumnNames({ namespaceOverride: namespace });
  const location: HistoryLocation<unknown> = useLocation();
  const [state, dispatch] = useReducer(
    downloadReducer,
    { props, selectedColumns: columnNames },
    getDownloadInitialState
  );
  const {
    selectedColumns,
    fileFormatOptions,
    selectedFileFormat,
    downloadSelect,
    compressed,
    extraContent,
    nSelectedEntries,
  } = state;
  const job = useJobFromUrl();

  const handleDownloadAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDownloadSelect(e.target.name as DownloadSelectOptions));
  };
  const handleCompressedChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(updateCompressed(e.target.value === 'true'));

  const downloadCount = getDownloadCount(state, props);
  const downloadOptions = getDownloadOptions(state, props, location, job);
  const downloadUrl = getDownloadUrl(downloadOptions);
  const previewOptions = getPreviewOptions(state, props, location, job);
  const previewUrl = previewOptions && getDownloadUrl(previewOptions);
  const ftpFilenameAndUrl = getFtpFilenameAndUrl(state, props, location, job);
  const isAsyncDownloadIdMapping = getIsAsyncDownloadIdMapping(
    state,
    props,
    job
  );
  const isEmbeddings = selectedFileFormat === FileFormat.embeddings;
  const tooLargeForEmbeddings =
    isEmbeddings && downloadCount > DOWNLOAD_SIZE_LIMIT_EMBEDDINGS;
  const isAsyncDownload = getIsAsyncDownload(state, props, job);
  // Peptide search download for matches exceeding the threshold
  const redirectToIDMapping =
    job.jobResultsLocation === Location.PeptideSearchResult &&
    downloadCount > MAX_PEPTIDE_FACETS_OR_DOWNLOAD;

  let extraContentNode: JSX.Element | undefined;
  if ((extraContent === 'ftp' || extraContent === 'url') && ftpFilenameAndUrl) {
    extraContentNode = (
      <>
        <h4 data-article-id="downloads" className={styles['ftp-header']}>
          File Available On FTP Server
        </h4>
        This file is available {!isEmbeddings && 'compressed'} within the{' '}
        <Link
          to={generatePath(LocationToPath[Location.HelpEntry], {
            accession: 'downloads',
          })}
        >
          UniProtKB directory
        </Link>{' '}
        of the UniProt FTP server:
        <div className={styles['ftp-url']}>
          <ExternalLink
            url={ftpFilenameAndUrl.url}
            noIcon
            onClick={() => onClose('download', 'ftp')}
          >
            <DownloadIcon width="1em" />
            {ftpFilenameAndUrl.filename}
          </ExternalLink>
        </div>
      </>
    );
  } else if (
    extraContent === 'url' ||
    // Hopefully temporary, this is because of restrictions on embeddings
    (extraContent === 'generate' && tooLargeForEmbeddings)
  ) {
    extraContentNode = (
      <DownloadAPIURL
        // Remove the download attribute as it's unnecessary for API access
        apiURL={downloadUrl.replace('download=true&', '')}
        ftpURL={ftpFilenameAndUrl?.url}
        onCopy={() => onClose('copy', 'api-url')}
        disableSearch={isEmbeddings || redirectToIDMapping}
        disableStream={isEmbeddings || redirectToIDMapping || isAsyncDownload}
      />
    );
  } else if (extraContent === 'generate' && isAsyncDownload) {
    extraContentNode = (
      <AsyncDownloadForm
        downloadUrlOptions={downloadOptions}
        count={downloadCount}
        onClose={() => onClose('submit', 'async')}
        inputParamsData={inputParamsData}
        jobType={jobType}
      />
    );
  } else if (extraContent === 'preview' && previewOptions) {
    extraContentNode = (
      <DownloadPreview
        previewUrl={previewUrl}
        previewFileFormat={previewOptions.fileFormat}
        disable={isAsyncDownloadIdMapping}
      />
    );
  }

  return (
    <>
      <label htmlFor="data-selection-false">
        <input
          id="data-selection-false"
          type="radio"
          name="selected"
          value="false"
          checked={downloadSelect === 'selected'}
          onChange={handleDownloadAllChange}
          disabled={nSelectedEntries === 0 || redirectToIDMapping}
        />
        Download selected (<LongNumber>{nSelectedEntries}</LongNumber>)
      </label>
      <label htmlFor="data-selection-true">
        <input
          id="data-selection-true"
          type="radio"
          name="all"
          value="true"
          checked={downloadSelect === 'all'}
          onChange={handleDownloadAllChange}
          disabled={redirectToIDMapping}
        />
        Download all (<LongNumber>{totalNumberResults}</LongNumber>{' '}
        {showReviewedOption ? ' + isoforms' : ''})
      </label>
      <fieldset>
        <label>
          Format
          <select
            id="file-format-select"
            data-testid="file-format-select"
            value={selectedFileFormat}
            onChange={(e) =>
              dispatch(updateSelectedFileFormat(e.target.value as FileFormat))
            }
            disabled={redirectToIDMapping}
          >
            {fileFormatOptions.map((format) => (
              <option value={format} key={format}>
                {format}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      {/* compressed not supported in UniSave */}
      {namespace !== Namespace.unisave && (
        <fieldset>
          <legend data-article-id="compression">Compressed</legend>
          <label>
            <input
              aria-label="compressed"
              type="radio"
              name="compressed"
              value="true"
              checked={compressed}
              onChange={handleCompressedChange}
              disabled={redirectToIDMapping}
            />
            Yes
          </label>
          <label>
            <input
              aria-label="not compressed"
              type="radio"
              name="compressed"
              value="false"
              checked={!compressed}
              onChange={handleCompressedChange}
              disabled={redirectToIDMapping}
            />
            No
          </label>
        </fieldset>
      )}
      {/* Peptide search download for matches exceeding the threshold */}
      {redirectToIDMapping && (
        <Message level="warning">
          To download peptide search results of more than{' '}
          <LongNumber>{MAX_PEPTIDE_FACETS_OR_DOWNLOAD}</LongNumber> matches,
          please use the{' '}
          <Link
            to={{
              pathname: LocationToPath[Location.IDMapping],
              state: {
                parameters: {
                  ids: accessions,
                  name: `Peptide search matches`,
                },
              },
            }}
          >
            ID Mapping
          </Link>{' '}
          service.
        </Message>
      )}

      {hasColumns(state, props, job) && (
        <>
          <legend>Customize columns</legend>
          <ColumnSelect
            onChange={(columns) => dispatch(updateSelectedColumns(columns))}
            selectedColumns={selectedColumns}
            namespace={
              isAsyncDownloadIdMapping && job.jobResultsNamespace
                ? job.jobResultsNamespace
                : namespace
            }
          />
        </>
      )}
      <section
        className={cn(
          'button-group',
          'sliding-panel__button-row',
          sticky['sticky-bottom-right'],
          styles['action-buttons']
        )}
      >
        <Button
          variant="tertiary"
          onClick={() => dispatch(updateExtraContent('url'))}
        >
          Generate URL for API
        </Button>
        <Button
          variant="tertiary"
          onClick={() => dispatch(updateExtraContent('preview'))}
          disabled={redirectToIDMapping}
        >
          Preview{' '}
          {namespace === Namespace.unisave && !selectedEntries.length
            ? 'file'
            : previewOptions?.size}
        </Button>
        <Button variant="secondary" onClick={() => onClose('cancel')}>
          Cancel
        </Button>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href={isAsyncDownload || ftpFilenameAndUrl ? undefined : downloadUrl}
          className={cn('button', 'primary')}
          title={
            isAsyncDownload
              ? 'Download with a File Generation job'
              : 'Download file'
          }
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            if (ftpFilenameAndUrl) {
              dispatch(updateExtraContent('ftp'));
            } else if (isAsyncDownload) {
              dispatch(updateExtraContent('generate'));
            } else {
              onClose('download', 'sync');
            }
          }}
        >
          Download
        </a>
      </section>
      <section>{extraContentNode}</section>
    </>
  );
};

export default Download;
