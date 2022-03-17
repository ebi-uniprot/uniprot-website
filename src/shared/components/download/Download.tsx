import { useState, FC, ChangeEvent, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, LongNumber } from 'franklin-sites';
import cn from 'classnames';

import ColumnSelect from '../column-select/ColumnSelect';
import DownloadPreview from './DownloadPreview';
import DownloadAPIURL from './DownloadAPIURL';

import useColumnNames from '../../hooks/useColumnNames';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import { getDownloadUrl } from '../../config/apiUrls';
import { Column, nsToPrimaryKeyColumns } from '../../config/columns';
import {
  fileFormatsWithColumns,
  nsToFileFormatsResultsDownload,
} from '../../config/resultsDownload';

import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';

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
}) => {
  const { columnNames } = useColumnNames();

  const { search: queryParamFromUrl } = useLocation();

  const fileFormats = nsToFileFormatsResultsDownload[namespace];

  const [selectedColumns, setSelectedColumns] = useState<Column[]>(columnNames);
  // Defaults to "download all" if no selection
  const [downloadAll, setDownloadAll] = useState(!selectedEntries.length);
  const [fileFormat, setFileFormat] = useState(fileFormats[0]);
  const [compressed, setCompressed] = useState(namespace !== Namespace.unisave);
  const [extraContent, setExtraContent] = useState<null | ExtraContent>(null);

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
  }

  const downloadUrl = getDownloadUrl({
    query: urlQuery,
    columns: selectedColumns,
    selectedFacets,
    sortColumn,
    sortDirection,
    fileFormat,
    compressed,
    selected: urlSelected,
    selectedIdField,
    namespace,
    accessions,
    base,
  });

  const nSelectedEntries = numberSelectedEntries || selectedEntries.length;
  const nPreview = Math.min(
    10,
    downloadAll ? totalNumberResults : nSelectedEntries
  );

  const previewFileFormat = getPreviewFileFormat(fileFormat);
  const previewUrl = getDownloadUrl({
    query: urlQuery,
    columns: selectedColumns,
    selectedFacets,
    sortColumn,
    sortDirection,
    fileFormat: previewFileFormat,
    compressed: false,
    size: nPreview,
    selected: urlSelected,
    selectedIdField,
    namespace,
    accessions,
    base,
  });

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
      {fileFormatsWithColumns.has(fileFormat) &&
        namespace !== Namespace.idmapping &&
        namespace !== Namespace.unisave && (
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
          Preview {namespace === Namespace.unisave ? 'file' : nPreview}
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
    </>
  );
};

export default Download;
