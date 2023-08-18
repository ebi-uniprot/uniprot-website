import { useState, ChangeEvent } from 'react';
import { Button, LongNumber } from 'franklin-sites';
import cn from 'classnames';

import ColumnSelect from '../../../shared/components/column-select/ColumnSelect';
import DownloadAPIURL from '../../../shared/components/download/DownloadAPIURL';
import DownloadPreview from '../../../shared/components/download/DownloadPreview';
import { IsoformStatistics } from './ComponentsButtons';

import useColumnNames from '../../../shared/hooks/useColumnNames';

import {
  DownloadUrlOptions,
  getDownloadUrl,
} from '../../../shared/config/apiUrls';
import { Column, nsToPrimaryKeyColumns } from '../../../shared/config/columns';
import { fileFormatsWithColumns } from '../../../shared/config/resultsDownload';
import { fileFormatsResultsDownloadForRedundant } from '../../config/download';
import { fileFormatsResultsDownload as fileFormatsUniPortKBResultsDownload } from '../../../uniprotkb/config/download';

import { Namespace } from '../../../shared/types/namespaces';
import { FileFormat } from '../../../shared/types/resultsDownload';
import {
  DownloadPanelFormCloseReason,
  DownloadMethod,
} from '../../../shared/utils/gtagEvents';
import { ProteomeType } from '../../adapters/proteomesConverter';

import sticky from '../../../shared/styles/sticky.module.scss';
import styles from '../../../shared/components/download/styles/download.module.scss';

export const getPreviewFileFormat = (
  fileFormat: FileFormat
): FileFormat | undefined =>
  fileFormat === FileFormat.excel ? FileFormat.tsv : fileFormat;

type DownloadProps = {
  query: string;
  selectedEntries?: string[];
  selectedQuery: string;
  totalNumberResults: number;
  numberSelectedEntries: number;
  onClose: (
    panelCloseReason: DownloadPanelFormCloseReason,
    downloadMethod?: DownloadMethod
  ) => void;
  proteomeType: ProteomeType;
  superkingdom: string;
  isoformStats: IsoformStatistics;
};

type ExtraContent = 'url' | 'preview';

type DownloadSelectOptions = 'all' | 'selected' | 'reviewed';

const ComponentsDownload = ({
  query,
  selectedQuery,
  selectedEntries = [],
  totalNumberResults,
  numberSelectedEntries,
  onClose,
  proteomeType,
  superkingdom,
  isoformStats,
}: DownloadProps) => {
  const namespace =
    // Excluded not supported at the moment, need to wait for TRM-28011
    proteomeType === 'Redundant proteome'
      ? Namespace.uniparc
      : Namespace.uniprotkb;

  const { columnNames } = useColumnNames({ namespaceOverride: namespace });

  const [selectedColumns, setSelectedColumns] = useState<Column[]>(columnNames);
  // Defaults to "download all" if no selection
  const [downloadSelect, setDownloadSelect] = useState<DownloadSelectOptions>(
    selectedEntries.length ? 'selected' : 'all'
  );

  const fileFormats =
    proteomeType === 'Redundant proteome'
      ? fileFormatsResultsDownloadForRedundant
      : [
          FileFormat.fasta,
          ...fileFormatsUniPortKBResultsDownload.filter(
            (format) => !format.includes('FASTA')
          ),
        ];

  const [fileFormat, setFileFormat] = useState(fileFormats[0]);
  const [compressed, setCompressed] = useState(true);
  const [extraContent, setExtraContent] = useState<null | ExtraContent>(null);
  const [includeIsoform, setIncludeIsoform] = useState(false);

  const [selectedIdField] = nsToPrimaryKeyColumns(namespace);

  const downloadOptions: DownloadUrlOptions = {
    query:
      (downloadSelect === 'selected' && selectedQuery) ||
      (downloadSelect === 'reviewed' && `${query} AND reviewed=true`) ||
      query,
    fileFormat,
    compressed,
    selected:
      downloadSelect === 'selected' && !selectedQuery ? selectedEntries : [],
    selectedIdField,
    namespace,
  };

  const hasColumns = fileFormatsWithColumns.has(fileFormat);

  if (hasColumns) {
    downloadOptions.columns = selectedColumns;
  }

  const showReviewedOption = superkingdom === 'eukaryota';
  let fileFormatOptions = fileFormats;
  const nSelectedEntries = numberSelectedEntries || selectedEntries.length;
  let downloadCount;
  switch (downloadSelect) {
    case 'all':
      downloadCount = totalNumberResults;
      if (showReviewedOption) {
        downloadOptions.fileFormat = FileFormat.fastaCanonicalIsoform;
        fileFormatOptions = [FileFormat.fasta];
      }
      break;
    case 'reviewed':
      // Once we have the counts, we should update the downloadCount accordingly
      downloadCount = isoformStats?.reviewed || 0;
      if (includeIsoform) {
        downloadOptions.fileFormat = FileFormat.fastaCanonicalIsoform;
        fileFormatOptions = [FileFormat.fasta];
      } else {
        downloadOptions.fileFormat = FileFormat.fastaCanonical;
      }
      break;
    case 'selected':
      downloadCount = nSelectedEntries;
      break;
    default:
      downloadCount = 0;
      break;
  }

  const downloadUrl = getDownloadUrl(downloadOptions);

  const nPreview = Math.min(10, downloadCount);
  const previewFileFormat = getPreviewFileFormat(fileFormat);
  const previewUrl =
    previewFileFormat &&
    getDownloadUrl({
      ...downloadOptions,
      selected: downloadOptions.selected.slice(0, 10), // get only the first 10 entries instead of using the size parameters
      fileFormat: previewFileFormat,
      compressed: false,
      size: nPreview,
    });

  const handleDownloadAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDownloadSelect(e.target.name as DownloadSelectOptions);
  };

  const handleCompressedChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCompressed(e.target.value === 'true');

  const handleIsoformSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target.checked) {
      fileFormatOptions = [FileFormat.fasta];
      setIncludeIsoform(true);
    } else {
      setIncludeIsoform(false);
    }
  };

  let extraContentNode: JSX.Element | null = null;
  if (extraContent === 'url') {
    extraContentNode = (
      <DownloadAPIURL
        // Remove the download attribute as it's unnecessary for API access
        apiURL={downloadUrl.replace('download=true&', '')}
        onCopy={() => onClose('copy', 'api-url')}
      />
    );
  } else if (extraContent === 'preview') {
    extraContentNode = (
      <DownloadPreview
        previewUrl={previewUrl}
        previewFileFormat={previewFileFormat}
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
          disabled={nSelectedEntries === 0}
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
          >
            {fileFormatOptions.map((format) => (
              <option value={format} key={format}>
                {format}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
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
          />
          No
        </label>
      </fieldset>
      {hasColumns && (
        <>
          <legend>Customize columns</legend>
          <ColumnSelect
            onChange={setSelectedColumns}
            selectedColumns={selectedColumns}
            namespace={namespace}
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
        <Button variant="tertiary" onClick={() => setExtraContent('preview')}>
          Preview {selectedEntries.length ? nPreview : 'file'}
        </Button>
        <Button variant="secondary" onClick={() => onClose('cancel')}>
          Cancel
        </Button>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href={downloadUrl}
          className={cn('button', 'primary')}
          title="Download file"
          target="_blank"
          rel="noreferrer"
          onClick={() => onClose('download', 'sync')}
        >
          Download
        </a>
      </section>
      <section>{extraContentNode}</section>
    </>
  );
};

export default ComponentsDownload;
