import { useState, FC, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, LongNumber } from 'franklin-sites';
import cn from 'classnames';

import ColumnSelect from '../column-select/ColumnSelect';
import DownloadPreview from './DownloadPreview';
import DownloadAPIURL from './DownloadAPIURL';

import useLocalStorage from '../../hooks/useLocalStorage';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import { getDownloadUrl } from '../../config/apiUrls';
import {
  Column,
  nsToDefaultColumns,
  nsToPrimaryKeyColumns,
} from '../../config/columns';
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
  const [columns] = useLocalStorage(
    `table columns for ${namespace}` as const,
    nsToDefaultColumns(namespace)
  );

  const fileFormats = nsToFileFormatsResultsDownload[namespace] as FileFormat[];

  const [selectedColumns, setSelectedColumns] = useState<Column[]>(columns);
  // Defaults to "download all" if no selection
  const [downloadAll, setDownloadAll] = useState(!selectedEntries.length);
  const [fileFormat, setFileFormat] = useState(fileFormats[0]);
  const [compressed, setCompressed] = useState(true);
  const { search: queryParamFromUrl } = useLocation();
  const [displayAPIURL, setDisplayAPIURL] = useState(false);
  const [displayPreview, setDisplayPreview] = useState(false);
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
      <fieldset>
        <legend>Compressed</legend>
        <label>
          <input
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
            type="radio"
            name="compressed"
            value="false"
            checked={!compressed}
            onChange={handleCompressedChange}
          />
          No
        </label>
      </fieldset>
      {fileFormatsWithColumns.includes(fileFormat) &&
        namespace !== Namespace.idmapping && (
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
        <Button
          variant="tertiary"
          onClick={() => {
            setDisplayAPIURL(true);
            setDisplayPreview(false);
          }}
        >
          Generate URL for API
        </Button>
        <Button
          variant="tertiary"
          onClick={() => {
            setDisplayAPIURL(false);
            setDisplayPreview(true);
          }}
        >
          Preview {nPreview}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <a
          href={downloadUrl}
          className="button"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
        >
          Download
        </a>
      </section>
      {displayAPIURL && <DownloadAPIURL apiURL={downloadUrl} />}
      {displayPreview && (
        <DownloadPreview
          previewUrl={previewUrl}
          previewFileFormat={previewFileFormat}
        />
      )}
    </>
  );
};

export default Download;
