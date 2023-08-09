import { useState, FC, ChangeEvent } from 'react';
import {
  generatePath,
  Link,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
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

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import { getDownloadUrl, DownloadUrlOptions } from '../../config/apiUrls';
import { Column, nsToPrimaryKeyColumns } from '../../config/columns';
import {
  fileFormatsWithColumns,
  nsToFileFormatsResultsDownload,
} from '../../config/resultsDownload';
import { getUniprotkbFtpFilenameAndUrl } from '../../config/ftpUrls';
import { Location, LocationToPath } from '../../../app/config/urls';
import { fileFormatsResultsDownload as fileFormatsProteomeResultsDownload } from '../../../proteomes/config/download';

import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import {
  DownloadMethod,
  DownloadPanelFormCloseReason,
} from '../../utils/gtagEvents';
import { IsoformStatistics } from '../../../proteomes/components/entry/ComponentsButtons';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { PublicServerParameters } from '../../../tools/types/toolsServerParameters';

import sticky from '../../styles/sticky.module.scss';
import styles from './styles/download.module.scss';

const proteomesFileFormats = [
  FileFormat.fasta,
  ...fileFormatsProteomeResultsDownload,
];

const DOWNLOAD_SIZE_LIMIT_EMBEDDINGS = 1_000_000 as const;
export const DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED = 100_000 as const;

const ID_MAPPING_ASYNC_DOWNLOAD_NAMESPACES = new Set([
  Namespace.uniparc,
  Namespace.uniprotkb,
  Namespace.uniref,
]);
const ID_MAPPING_ASYNC_DOWNLOAD_FILE_FORMATS = new Set([
  FileFormat.tsv, // async
  FileFormat.json, // async
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

type DownloadProps<T extends JobTypes> = {
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
  excludeColumns?: boolean;
  inBasketMini?: boolean;
  showReviewedOption?: boolean;
  isoformStats?: IsoformStatistics;
  jobType?: T;
  inputParamsData?: PublicServerParameters[T];
};

type ExtraContent = 'url' | 'generate' | 'preview' | 'ftp';

type DownloadSelectOptions = 'all' | 'selected' | 'reviewed';

const Download: FC<DownloadProps<JobTypes>> = ({
  query,
  selectedQuery,
  selectedEntries = [],
  totalNumberResults,
  numberSelectedEntries,
  onClose,
  namespace,
  accessions,
  base,
  supportedFormats,
  notCustomisable,
  excludeColumns = false,
  inBasketMini = false,
  showReviewedOption = false,
  isoformStats,
  jobType,
  inputParamsData,
}) => {
  const { columnNames } = useColumnNames();
  const { search: queryParamFromUrl } = useLocation();
  // If it's a large ID Mapping job to uniprot/uniref/uniparc, the variable
  // namespace will still be id-mapping so get it directly from the URL.
  const idMappingResultMatch = useRouteMatch<{ namespace: Namespace }>(
    LocationToPath[Location.IDMappingResult]
  );
  let fileFormats =
    supportedFormats || nsToFileFormatsResultsDownload[namespace];

  const [selectedColumns, setSelectedColumns] = useState<Column[]>(columnNames);
  // Defaults to "download all" if no selection
  const [downloadSelect, setDownloadSelect] = useState<DownloadSelectOptions>(
    selectedEntries.length ? 'selected' : 'all'
  );
  const [fileFormat, setFileFormat] = useState(fileFormats[0]);
  const [compressed, setCompressed] = useState(namespace !== Namespace.unisave);
  const [extraContent, setExtraContent] = useState<null | ExtraContent>(null);
  const [includeIsoform, setIncludeIsoform] = useState(false);
  const { jobResultsLocation, jobResultsNamespace } = useJobFromUrl();

  const [
    { query: queryFromUrl, selectedFacets = [], sortColumn, sortDirection },
  ] = getParamsFromURL(queryParamFromUrl);

  const [selectedIdField] = nsToPrimaryKeyColumns(namespace);

  // This logic is needed specifically for the proteomes components
  let urlQuery: string;
  let urlSelected: string[];
  if (downloadSelect === 'all') {
    // If query prop provided use this otherwise fallback to query from URL
    urlQuery = query || queryFromUrl;
    urlSelected = [];
  } else if (downloadSelect === 'reviewed') {
    urlQuery = `${query || queryFromUrl} AND reviewed=true`;
    urlSelected = [];
  } else {
    // Download selected
    // If selectedQuery prop provided use this otherwise fallback to query from URL
    urlQuery = selectedQuery || queryFromUrl;
    // If selectedQuery prop provided assume this already specifies how to select
    // a subset of entries.
    urlSelected = selectedQuery ? [] : selectedEntries;
    if (
      namespace === Namespace.unisave &&
      selectedEntries.length === totalNumberResults
    ) {
      // If all history entries are selected, act as if it was a "download all"
      urlSelected = [];
    }
  }
  // The ID Mapping URL provided from the job details is for the paginated results
  // endpoint while the stream endpoint is required for downloads
  let downloadBase = base;
  if (jobResultsLocation === Location.IDMappingResult) {
    if (jobResultsNamespace && !notCustomisable) {
      downloadBase = downloadBase?.replace('/results/', '/results/stream/');
    } else {
      downloadBase = downloadBase?.replace('/results/', '/stream/');
    }
  }

  const downloadOptions: DownloadUrlOptions = {
    fileFormat,
    compressed,
    selected: urlSelected,
    selectedIdField,
    namespace,
    accessions,
    base: downloadBase,
  };

  const nSelectedEntries = numberSelectedEntries || selectedEntries.length;
  let downloadCount;
  switch (downloadSelect) {
    case 'all':
      downloadCount = totalNumberResults;
      if (showReviewedOption) {
        // downloadCount = isoformStats?.allWithIsoforms;
        downloadOptions.fileFormat = FileFormat.fastaCanonicalIsoform;
        fileFormats = [FileFormat.fasta];
      }
      break;
    case 'reviewed':
      // Once we have the counts, we should update the downloadCount accordingly
      downloadCount = isoformStats?.reviewed || 0;
      if (includeIsoform) {
        // downloadCount = isoformStats?.reviewedWithIsoforms || 0;
        downloadOptions.fileFormat = FileFormat.fastaCanonicalIsoform;
        fileFormats = [FileFormat.fasta];
      } else {
        // downloadCount = isoformStats?.reviewed || 0;
        downloadOptions.fileFormat = FileFormat.fastaCanonical;
        fileFormats = proteomesFileFormats;
      }
      break;
    case 'selected':
      downloadCount = nSelectedEntries;
      break;
    default:
      downloadCount = 0;
      break;
  }

  const isIDMappingResult = jobType === JobTypes.ID_MAPPING;
  const isAsyncDownloadIdMapping =
    isIDMappingResult &&
    namespace === Namespace.idmapping &&
    downloadCount > DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED &&
    idMappingResultMatch?.params?.namespace &&
    ID_MAPPING_ASYNC_DOWNLOAD_NAMESPACES.has(
      idMappingResultMatch?.params?.namespace
    ) &&
    ID_MAPPING_ASYNC_DOWNLOAD_FILE_FORMATS.has(fileFormat);

  // In this case it's a not uniprotkb/uniref/uniparc so we can only
  // provide from/to only file formats
  if (namespace === Namespace.idmapping && !isAsyncDownloadIdMapping) {
    fileFormats = fileFormats.filter((ff) => !ff.includes('from/to only'));
  }

  const hasColumns =
    fileFormatsWithColumns.has(fileFormat) &&
    ((excludeColumns && namespace !== Namespace.idmapping) ||
      isAsyncDownloadIdMapping);

  if (!inBasketMini) {
    downloadOptions.query = urlQuery;
    downloadOptions.selectedFacets = selectedFacets;
    downloadOptions.sortColumn = sortColumn;
    downloadOptions.sortDirection = sortDirection;
  }

  if (hasColumns) {
    downloadOptions.columns = selectedColumns;
  }

  const downloadUrl = getDownloadUrl(downloadOptions);
  const nPreview = Math.min(10, downloadCount);
  const previewFileFormat = getPreviewFileFormat(fileFormat);
  const previewOptions: DownloadUrlOptions | undefined = previewFileFormat && {
    ...downloadOptions,
    fileFormat: previewFileFormat,
    compressed: false,
    size: nPreview,
    base,
  };
  if (previewOptions && namespace === Namespace.unisave) {
    // get only the first 10 entries instead of using the size parameters
    previewOptions.selected = previewOptions.selected.slice(0, 10);
  }

  const previewUrl = previewOptions && getDownloadUrl(previewOptions);

  const handleDownloadAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDownloadSelect(e.target.name as DownloadSelectOptions);
  };

  const handleCompressedChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCompressed(e.target.value === 'true');

  const handleIsoformSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target.checked) {
      fileFormats = [FileFormat.fasta];
      setIncludeIsoform(true);
    } else {
      fileFormats = proteomesFileFormats;
      setIncludeIsoform(false);
    }
  };

  const isUniprotkb = namespace === Namespace.uniprotkb;
  const isEmbeddings = fileFormat === FileFormat.embeddings;
  const tooLargeForEmbeddings =
    isEmbeddings && downloadCount > DOWNLOAD_SIZE_LIMIT_EMBEDDINGS;

  const isAsyncDownload =
    (isEmbeddings && isUniprotkb) ||
    (isUniprotkb && downloadCount > DOWNLOAD_SIZE_LIMIT) ||
    isAsyncDownloadIdMapping;
  const ftpFilenameAndUrl =
    namespace === Namespace.uniprotkb && !isIDMappingResult
      ? getUniprotkbFtpFilenameAndUrl(downloadUrl, fileFormat)
      : null;

  // Peptide search download for matches exceeding the threshold
  const redirectToIDMapping =
    jobResultsLocation === Location.PeptideSearchResult &&
    downloadCount > MAX_PEPTIDE_FACETS_OR_DOWNLOAD;

  const disableSearch = isEmbeddings || redirectToIDMapping;
  const disableStream = disableSearch || isAsyncDownload;

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
        disableSearch={disableSearch}
        disableStream={disableStream}
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
  } else if (extraContent === 'preview') {
    extraContentNode = (
      <DownloadPreview
        previewUrl={previewUrl}
        previewFileFormat={previewFileFormat}
        disable={isAsyncDownloadIdMapping}
      />
    );
  }

  const downloadHref =
    isAsyncDownload || ftpFilenameAndUrl ? undefined : downloadUrl;

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
      {showReviewedOption && isoformStats && (
        <div>
          <label htmlFor="data-selection-reviewed">
            <input
              id="data-selection-reviewed"
              type="radio"
              name="reviewed"
              value="false"
              checked={downloadSelect === 'reviewed'}
              onChange={handleDownloadAllChange}
              disabled={redirectToIDMapping}
            />
            Download only reviewed (Swiss-Prot) canonical proteins (
            {/* <LongNumber>{includeIsoform ? isoformStats?.reviewedWithIsoforms : isoformStats?.reviewed}</LongNumber>) */}
            <LongNumber>{isoformStats?.reviewed || 0}</LongNumber>
            {includeIsoform ? ' + isoforms' : ''})
          </label>
          <label className={styles['isoform-option']}>
            <input
              type="checkbox"
              name="reviewed-isoform"
              onChange={handleIsoformSelect}
              disabled={downloadSelect !== 'reviewed'}
            />
            Include reviewed (Swiss-Prot) isoforms
          </label>
        </div>
      )}
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
        Download all{' '}
        {showReviewedOption
          ? 'reviewed (Swiss-Prot) and unreviewed (TrEMBL) proteins'
          : ''}{' '}
        {/* (<LongNumber>{showReviewedOption ? isoformStats?.allWithIsoforms : totalNumberResults}</LongNumber>) */}
        (<LongNumber>{totalNumberResults}</LongNumber>{' '}
        {showReviewedOption ? ' + isoforms' : ''})
      </label>
      <fieldset>
        <label>
          Format
          <select
            id="file-format-select"
            data-testid="file-format-select"
            value={fileFormat}
            onChange={(e) => setFileFormat(e.target.value as FileFormat)}
            disabled={redirectToIDMapping}
          >
            {fileFormats.map((format) => (
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

      {hasColumns && (
        <>
          <legend>Customize columns</legend>
          <ColumnSelect
            onChange={setSelectedColumns}
            selectedColumns={selectedColumns}
            namespace={
              isAsyncDownloadIdMapping
                ? idMappingResultMatch.params.namespace
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
        <Button variant="tertiary" onClick={() => setExtraContent('url')}>
          Generate URL for API
        </Button>
        <Button
          variant="tertiary"
          onClick={() => setExtraContent('preview')}
          disabled={redirectToIDMapping}
        >
          Preview{' '}
          {namespace === Namespace.unisave && !selectedEntries.length
            ? 'file'
            : nPreview}
        </Button>
        <Button variant="secondary" onClick={() => onClose('cancel')}>
          Cancel
        </Button>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href={downloadHref}
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
              setExtraContent('ftp');
            } else if (isAsyncDownload) {
              setExtraContent('generate');
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
