import { useCallback, useState, FC, ChangeEvent } from 'react';
import { Loader, CodeBlock, Button, LongNumber } from 'franklin-sites';

import ColumnSelect from '../column-select/ColumnSelect';

import { urlsAreEqual } from '../../utils/url';
import fetchData from '../../utils/fetchData';

import useUserPreferences from '../../hooks/useUserPreferences';

import { getDownloadUrl } from '../../config/apiUrls';
import {
  Column,
  nsToDefaultColumns,
  nsToPrimaryKeyColumn,
} from '../../config/columns';
import {
  fileFormatsWithColumns,
  fileFormatToContentType,
  nsToFileFormatsResultsDownload,
} from '../../config/resultsDownload';

import {
  SelectedFacet,
  SortDirection,
} from '../../../uniprotkb/types/resultsTypes';
import { ContentType, FileFormat } from '../../types/resultsDownload';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';
import { Namespace } from '../../types/namespaces';

import './styles/download.scss';
import '../../styles/sticky.scss';

export const getPreviewFileFormat = (fileFormat: FileFormat) =>
  fileFormat === FileFormat.excel ? FileFormat.tsv : fileFormat;

type DownloadProps = {
  query: string;
  selectedFacets?: SelectedFacet[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  selectedEntries?: string[];
  selectedQuery?: string;
  totalNumberResults: number;
  numberSelectedEntries?: number;
  namespace: Namespace;
  onClose: () => void;
};

const Download: FC<DownloadProps> = ({
  query,
  selectedQuery,
  selectedFacets = [],
  sortColumn,
  sortDirection,
  selectedEntries = [],
  totalNumberResults,
  numberSelectedEntries,
  onClose,
  namespace,
}) => {
  const [columns] = useUserPreferences(
    `table columns for ${namespace}` as const,
    nsToDefaultColumns[namespace]
  );

  const fileFormats = nsToFileFormatsResultsDownload[namespace] as FileFormat[];

  const [selectedColumns, setSelectedColumns] = useState<Column[]>(columns);
  const [downloadAll, setDownloadAll] = useState(true);
  const [fileFormat, setFileFormat] = useState(fileFormats[0]);
  const [compressed, setCompressed] = useState(true);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [preview, setPreview] = useState({
    url: '',
    contentType: '',
    data: '',
  });

  const selectedIdField = nsToPrimaryKeyColumn[namespace] as Column;

  const urlQuery = downloadAll || !selectedQuery ? query : selectedQuery;
  const urlSelected = downloadAll || selectedQuery ? [] : selectedEntries;

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
      <h2>Download</h2>
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
        Download selected ({nSelectedEntries})
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
      {fileFormatsWithColumns.includes(fileFormat) && (
        <>
          <legend>Customize data</legend>
          <ColumnSelect
            onChange={setSelectedColumns}
            selectedColumns={selectedColumns}
            namespace={namespace}
          />
        </>
      )}
      <section className="button-group sliding-panel__button-row sticky-bottom-right">
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
