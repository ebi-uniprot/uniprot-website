import cn from 'classnames';
import { Button, LongNumber } from 'franklin-sites';
import {
  type ChangeEvent,
  type JSX,
  useEffect,
  useMemo,
  useState,
} from 'react';

import ColumnSelect from '../../../shared/components/column-select/ColumnSelect';
import { proteomeFastaOption } from '../../../shared/components/download/Download';
import DownloadAPIURL from '../../../shared/components/download/DownloadAPIURL';
import DownloadPreview from '../../../shared/components/download/DownloadPreview';
import styles from '../../../shared/components/download/styles/download.module.scss';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import {
  type Column,
  nsToPrimaryKeyColumns,
} from '../../../shared/config/columns';
import { fileFormatsWithColumns } from '../../../shared/config/resultsDownload';
import useColumnNames from '../../../shared/hooks/useColumnNames';
import sticky from '../../../shared/styles/sticky.module.scss';
import { type Statistics } from '../../../shared/types/apiModel';
import { Namespace } from '../../../shared/types/namespaces';
import { type DownloadUrlOptions } from '../../../shared/types/results';
import { FileFormat } from '../../../shared/types/resultsDownload';
import {
  type DownloadMethod,
  type DownloadPanelFormCloseReason,
} from '../../../shared/utils/gtagEvents';
import { fileFormatsResultsDownload as fileFormatsUniPortKBResultsDownload } from '../../../uniprotkb/config/download';
import { fileFormatsResultsDownloadForRedundant } from '../../config/download';

const getPreviewFileFormat = (
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
  proteomeStatistics: Statistics;
  isUniparcSearch: boolean;
};

type ExtraContent = 'url' | 'preview';

type DownloadSelectOptions = 'all' | 'selected' | 'reviewed';

const isUniparcProteomeHeaderApplicable = (
  namespace: Namespace,
  numberSelectedEntries: number,
  totalEntries: number
) =>
  namespace === Namespace.uniparc &&
  (!numberSelectedEntries || numberSelectedEntries === totalEntries);

const ComponentsDownload = ({
  query,
  selectedQuery,
  selectedEntries = [],
  totalNumberResults,
  numberSelectedEntries,
  onClose,
  proteomeStatistics,
  isUniparcSearch,
}: DownloadProps) => {
  const namespace = isUniparcSearch ? Namespace.uniparc : Namespace.uniprotkb;

  const { columnNames } = useColumnNames({ namespaceOverride: namespace });

  const [selectedColumns, setSelectedColumns] = useState<Column[]>(columnNames);
  // Defaults to "download all" if no selection
  const [downloadSelect, setDownloadSelect] = useState<DownloadSelectOptions>(
    selectedEntries.length ? 'selected' : 'all'
  );

  const fileFormats = useMemo(
    () =>
      isUniparcSearch
        ? fileFormatsResultsDownloadForRedundant
        : [
            FileFormat.fasta,
            ...fileFormatsUniPortKBResultsDownload.filter(
              (format) => !format.includes('FASTA')
            ),
          ],
    [isUniparcSearch]
  );

  const [fileFormat, setFileFormat] = useState(fileFormats[0]);
  const [compressed, setCompressed] = useState(true);
  const [extraContent, setExtraContent] = useState<null | ExtraContent>(null);
  const [includeIsoform, setIncludeIsoform] = useState(false);
  const [uniparcProteomeFasta, setUniparcProteomeFasta] = useState(false);

  useEffect(
    () =>
      setUniparcProteomeFasta(
        isUniparcProteomeHeaderApplicable(
          namespace,
          numberSelectedEntries,
          totalNumberResults
        )
      ),
    [namespace, numberSelectedEntries, totalNumberResults]
  );

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
    uniparcProteomeFastaHeader: uniparcProteomeFasta,
  };

  const isoformsAvailable = Boolean(proteomeStatistics.isoformProteinCount);
  const nSelectedEntries = numberSelectedEntries || selectedEntries.length;
  let downloadCount;
  switch (downloadSelect) {
    case 'all':
      downloadCount =
        totalNumberResults +
        ((includeIsoform && proteomeStatistics.isoformProteinCount) || 0);
      break;
    case 'reviewed':
      downloadCount =
        proteomeStatistics.reviewedProteinCount +
        ((includeIsoform && proteomeStatistics.isoformProteinCount) || 0);
      break;
    case 'selected':
      /* The isoform counts for selected entries is not available here. We show only (+ isoforms) in the select option 
       and the download count is used only for the preview purpose. I guess it is okay not to fret too much about it here.
       */
      downloadCount = nSelectedEntries;
      break;
    default:
      downloadCount = 0;
      break;
  }

  if (includeIsoform) {
    downloadOptions.fileFormat = FileFormat.fastaCanonicalIsoform;
  }

  const hasColumns = fileFormatsWithColumns.has(fileFormat);

  if (hasColumns) {
    downloadOptions.columns = selectedColumns;
  }

  const downloadUrl = apiUrls.results.download(downloadOptions);

  const nPreview = Math.min(10, downloadCount);
  const previewFileFormat = getPreviewFileFormat(fileFormat);
  const previewUrl =
    previewFileFormat &&
    apiUrls.results.download({
      ...downloadOptions,
      selected: downloadOptions.selected.slice(0, 10), // get only the first 10 entries instead of using the size parameters
      fileFormat: previewFileFormat,
      compressed: false,
      size: nPreview,
    });

  const handleDownloadAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDownloadSelect(e.target.name as DownloadSelectOptions);
  };

  const handleCompressedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCompressed(e.target.value === 'true');
  };

  const handleFastaHeaderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUniparcProteomeFasta(e.target.checked === true);
  };

  const handleIsoformSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target.checked) {
      setIncludeIsoform(true);
      setFileFormat(FileFormat.fasta);
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
        Download selected{' ('}
        <LongNumber>{nSelectedEntries}</LongNumber>
        {!isUniparcSearch && (
          <>{includeIsoform && nSelectedEntries ? ' + isoforms' : ''}</>
        )}
        )
      </label>
      {isUniparcSearch ? (
        <label htmlFor="data-selection-all">
          <input
            id="data-selection-all"
            type="radio"
            name="all"
            value="true"
            checked={downloadSelect === 'all'}
            onChange={handleDownloadAllChange}
          />
          Download all (<LongNumber>{totalNumberResults}</LongNumber>)
        </label>
      ) : (
        <>
          <label htmlFor="data-selection-reviewed">
            <input
              id="data-selection-reviewed"
              type="radio"
              name="reviewed"
              value="false"
              checked={downloadSelect === 'reviewed'}
              onChange={handleDownloadAllChange}
            />
            Download only reviewed (Swiss-Prot){' '}
            {isoformsAvailable ? ' canonical ' : ''} proteins (
            <LongNumber>
              {includeIsoform
                ? (proteomeStatistics.reviewedProteinCount || 0) +
                  (proteomeStatistics.isoformProteinCount || 0)
                : proteomeStatistics.reviewedProteinCount || 0}
            </LongNumber>
            )
          </label>
          <label htmlFor="data-selection-true">
            <input
              id="data-selection-true"
              type="radio"
              name="all"
              value="true"
              checked={downloadSelect === 'all'}
              onChange={handleDownloadAllChange}
            />
            Download all reviewed (Swiss-Prot) and unreviewed (TrEMBL) proteins
            (
            <LongNumber>
              {totalNumberResults +
                ((includeIsoform && proteomeStatistics.isoformProteinCount) ||
                  0)}
            </LongNumber>
            )
          </label>
          {isoformsAvailable && (
            <div className={styles['isoform-option']}>
              Additional sequence data
              <label htmlFor="data-selection-isoform">
                <input
                  id="data-selection-isoform"
                  type="checkbox"
                  name="reviewed-isoform"
                  onChange={handleIsoformSelect}
                />
                Include reviewed (Swiss-Prot) isoforms ―{' '}
                <i>this option will limit file formats to FASTA</i>
              </label>
            </div>
          )}
        </>
      )}
      <fieldset>
        <label>
          Format
          <select
            id="file-format-select"
            data-testid="file-format-select"
            value={fileFormat}
            onChange={(e) => setFileFormat(e.target.value as FileFormat)}
          >
            {fileFormats.map((format) => (
              <option
                value={format}
                key={format}
                disabled={includeIsoform && format !== FileFormat.fasta}
              >
                {format}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      {isUniparcProteomeHeaderApplicable(
        namespace,
        numberSelectedEntries,
        totalNumberResults
      ) && proteomeFastaOption(uniparcProteomeFasta, handleFastaHeaderChange)}
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
          <legend data-article-id="customize">Customize columns</legend>
          <ColumnSelect
            onColumnChange={setSelectedColumns}
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
