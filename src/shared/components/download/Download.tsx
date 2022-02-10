import { useCallback, useState, FC, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader, CodeBlock, Button, LongNumber } from 'franklin-sites';
import cn from 'classnames';

import ColumnSelect from '../column-select/ColumnSelect';

import useLocalStorage from '../../hooks/useLocalStorage';

import { urlsAreEqual } from '../../utils/url';
import fetchData from '../../utils/fetchData';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import { getDownloadUrl } from '../../config/apiUrls';
import {
  Column,
  nsToDefaultColumns,
  nsToPrimaryKeyColumns,
} from '../../config/columns';
import {
  fileFormatsWithColumns,
  fileFormatToContentType,
  nsToFileFormatsResultsDownload,
} from '../../config/resultsDownload';

import { ContentType, FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';

import sticky from '../../styles/sticky.module.scss';
import './styles/download.scss';

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
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [preview, setPreview] = useState({
    url: '',
    contentType: '',
    data: '',
  });
  const { search: queryParamFromUrl } = useLocation();
  const {
    query: queryFromUrl,
    selectedFacets = [],
    sortColumn,
    sortDirection,
  } = getParamsFromURL(queryParamFromUrl);

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

  const handleDownloadAllChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDownloadAll(e.target.value === 'true');

  const handleCompressedChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCompressed(e.target.value === 'true');

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
  // TODO: this should useDataApi but this hook requires modification to
  // change the headers so whenever this is done replace fetchData with
  // useDataApi
  const handlePreview = useCallback(() => {
    setLoadingPreview(true);
    const headers: Record<string, string> = {};
    const accept = fileFormatToContentType[previewFileFormat];
    if (accept) {
      headers.Accept = accept;
    }
    fetchData<string>(previewUrl, headers)
      .then((response) => {
        const contentType = response.headers?.['content-type'] as ContentType;
        setPreview({
          data:
            contentType === fileFormatToContentType[FileFormat.json]
              ? JSON.stringify(response.data, null, 2)
              : response.data,
          url: response.config.url ?? '',
          contentType,
        });
      })
      .finally(() => {
        setLoadingPreview(false);
      });
  }, [previewFileFormat, previewUrl]);

  const previewContent =
    urlsAreEqual(preview.url, previewUrl, ['compressed']) &&
    preview.data &&
    preview.contentType === fileFormatToContentType[previewFileFormat]
      ? preview.data
      : '';

  let previewNode;
  if (loadingPreview) {
    previewNode = <Loader />;
  } else if (previewContent && previewContent.length) {
    previewNode = (
      <>
        <h4>Preview</h4>
        <CodeBlock lightMode data-testid="download-preview">
          {previewContent}
        </CodeBlock>
      </>
    );
  }

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
          sticky['sticky-bottom-right']
        )}
      >
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handlePreview}>
          Preview {nPreview}
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
      {previewNode && <div className="preview">{previewNode}</div>}
    </>
  );
};

export default Download;
