import { useState, FC, ChangeEvent, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ExternalLink, LongNumber, Message } from 'franklin-sites';
import cn from 'classnames';

import ColumnSelect from '../column-select/ColumnSelect';
import DownloadPreview from './DownloadPreview';
import DownloadAPIURL from './DownloadAPIURL';
import ContactLink from '../../../contact/components/ContactLink';

import useColumnNames from '../../hooks/useColumnNames';
import useJobFromUrl from '../../hooks/useJobFromUrl';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import { getDownloadUrl, DownloadUrlOptions } from '../../config/apiUrls';
import { Column, nsToPrimaryKeyColumns } from '../../config/columns';
import {
  fileFormatsWithColumns,
  nsToFileFormatsResultsDownload,
} from '../../config/resultsDownload';

import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import { Location } from '../../../app/config/urls';

import sticky from '../../styles/sticky.module.scss';
import styles from './styles/download.module.scss';

export const getPreviewFileFormat = (fileFormat: FileFormat) =>
  fileFormat === FileFormat.excel ? FileFormat.tsv : fileFormat;

type DownloadProps = {
  query?: string;
  selectedEntries?: string[];
  selectedQuery?: string;
  totalNumberResults: number;
  numberSelectedEntries?: number;
  namespace: Namespace;
  onClose: () => void;
  accessions?: string[];
  base?: string;
  supportedFormats?: FileFormat[];
};

type ExtraContent = 'url' | 'preview';

const Download: FC<DownloadProps> = ({
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
}) => {
  const { columnNames } = useColumnNames();
  const { search: queryParamFromUrl } = useLocation();

  const fileFormats =
    supportedFormats || nsToFileFormatsResultsDownload[namespace];

  const [selectedColumns, setSelectedColumns] = useState<Column[]>(columnNames);
  // Defaults to "download all" if no selection
  const [downloadAll, setDownloadAll] = useState(!selectedEntries.length);
  const [fileFormat, setFileFormat] = useState(fileFormats[0]);
  const [compressed, setCompressed] = useState(namespace !== Namespace.unisave);
  const [extraContent, setExtraContent] = useState<null | ExtraContent>(null);
  const { jobResultsLocation, jobResultsNamespace } = useJobFromUrl();

  const [
    { query: queryFromUrl, selectedFacets = [], sortColumn, sortDirection },
  ] = getParamsFromURL(queryParamFromUrl);

  const [selectedIdField] = nsToPrimaryKeyColumns(namespace);

  // This logic is needed specifically for the proteomes components
  let urlQuery: string;
  let urlSelected: string[];
  if (downloadAll) {
    // If query prop provided use this otherwise fallback to query from URL
    urlQuery = query || queryFromUrl;
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

  const hasColumns =
    fileFormatsWithColumns.has(fileFormat) &&
    namespace !== Namespace.idmapping &&
    namespace !== Namespace.unisave;

  // The ID Mapping URL provided from the job details is for the paginated results
  // endpoint while the stream endpoint is required for downloads
  let downloadBase = base;
  if (jobResultsLocation === Location.IDMappingResult) {
    if (jobResultsNamespace) {
      downloadBase = downloadBase?.replace('/results/', '/results/stream/');
    } else {
      downloadBase = downloadBase?.replace('/results/', '/stream/');
    }
  }

  const downloadOptions: DownloadUrlOptions = {
    query: urlQuery,
    selectedFacets,
    sortColumn,
    sortDirection,
    fileFormat,
    compressed,
    selected: urlSelected,
    selectedIdField,
    namespace,
    accessions,
    base: downloadBase,
  };
  if (hasColumns) {
    downloadOptions.columns = selectedColumns;
  }
  const downloadUrl = getDownloadUrl(downloadOptions);

  const nSelectedEntries = numberSelectedEntries || selectedEntries.length;
  const nPreview = Math.min(
    10,
    downloadAll ? totalNumberResults : nSelectedEntries
  );
  const previewFileFormat = getPreviewFileFormat(fileFormat);
  const previewOptions: DownloadUrlOptions = {
    ...downloadOptions,
    fileFormat: previewFileFormat,
    compressed: false,
    size: nPreview,
    base,
  };
  if (namespace === Namespace.unisave) {
    // get only the first 10 entries instead of using the size parameters
    previewOptions.selected = previewOptions.selected.slice(0, 10);
  }

  const previewUrl = getDownloadUrl(previewOptions);

  const handleDownloadAllChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDownloadAll(e.target.value === 'true');

  const handleCompressedChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCompressed(e.target.value === 'true');

  const extraContentRef = useRef<HTMLElement>(null);

  const scrollExtraIntoView = useCallback(() => {
    extraContentRef.current?.scrollIntoView();
  }, []);

  const displayExtraContent = useCallback(
    (content: ExtraContent) => {
      setExtraContent(content);
      scrollExtraIntoView();
    },
    [scrollExtraIntoView]
  );

  return (
    <>
      <label htmlFor="data-selection-false">
        <input
          id="data-selection-false"
          type="radio"
          name="data-selection"
          value="false"
          checked={!downloadAll}
          onChange={handleDownloadAllChange}
          disabled={nSelectedEntries === 0}
        />
        Download selected (<LongNumber>{nSelectedEntries}</LongNumber>)
      </label>
      <label htmlFor="data-selection-true">
        <input
          id="data-selection-true"
          type="radio"
          name="data-selection"
          value="true"
          checked={downloadAll}
          onChange={handleDownloadAllChange}
        />
        Download all (<LongNumber>{totalNumberResults}</LongNumber>)
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
          <legend>Compressed</legend>
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
      )}
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
        <Button variant="tertiary" onClick={() => displayExtraContent('url')}>
          Generate URL for API
        </Button>
        <Button
          variant="tertiary"
          onClick={() => displayExtraContent('preview')}
        >
          Preview{' '}
          {namespace === Namespace.unisave && !selectedEntries.length
            ? 'file'
            : nPreview}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <a
          href={downloadUrl}
          className="button primary"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
        >
          Download
        </a>
      </section>
      <section ref={extraContentRef}>
        {extraContent === 'url' && (
          <DownloadAPIURL
            // Remove the download attribute as it's unnecessary for API access
            apiURL={downloadUrl.replace('download=true&', '')}
            onCopy={onClose}
            onMount={scrollExtraIntoView}
          />
        )}
        {extraContent === 'preview' && (
          <DownloadPreview
            previewUrl={previewUrl}
            previewFileFormat={previewFileFormat}
            onMount={scrollExtraIntoView}
          />
        )}
      </section>
      {jobResultsLocation === Location.IDMappingResult && (
        <Message level="warning" className="uniprot-grid-cell--span-12">
          We are experiencing issues with ID mapping downloads. If you need it,
          please use the{' '}
          <ExternalLink
            url="https://legacy.uniprot.org/uploadlists"
            rel="nofollow"
            noIcon
          >
            legacy website
          </ExternalLink>{' '}
          until the issue is resolved or <ContactLink>contact us</ContactLink>{' '}
          for help.
        </Message>
      )}
    </>
  );
};

export default Download;
