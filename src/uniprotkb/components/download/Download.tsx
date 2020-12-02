import React, { Fragment, useCallback, useState } from 'react';
import { Loader } from 'franklin-sites';
import { UniProtKBColumn, SortableColumn } from '../../types/columnTypes';
import {
  FileFormat,
  fileFormatToContentType,
  fileFormatsWithColumns,
  SelectedFacet,
  SortDirection,
} from '../../types/resultsTypes';
import { getDownloadUrl } from '../../../shared/config/apiUrls';
import { urlsAreEqual } from '../../../shared/utils/url';
import fetchData from '../../../shared/utils/fetchData';
import { Column } from '../../../shared/config/columns';
import { downloadFileInNewTab } from '../../../shared/utils/utils';
import ColumnSelect from '../../../shared/components/column-select/ColumnSelect';
// import { Namespace } from '../../../shared/types/namespaces';

import './styles/download.scss';

export const getPreviewFileFormat = (fileFormat: FileFormat) =>
  fileFormat === FileFormat.excel ? FileFormat.tsv : fileFormat;

type DownloadProps = {
  query: string;
  selectedFacets: SelectedFacet[];
  selectedColumns: Column[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  selectedEntries: string[];
  totalNumberResults: number;
  onClose: () => void;
};

const Download: React.FC<DownloadProps> = ({
  query = '',
  selectedFacets = [],
  selectedColumns: initialSelectedColumns = [],
  sortColumn = UniProtKBColumn.accession as SortableColumn,
  sortDirection = SortDirection.ascend,
  selectedEntries = [],
  totalNumberResults = 0,
  onClose,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<Column[]>(
    initialSelectedColumns
  );
  const [downloadAll, setDownloadAll] = useState(true);
  const [fileFormat, setFileFormat] = useState(FileFormat.fastaCanonical);
  const [compressed, setCompressed] = useState(true);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [preview, setPreview] = useState({
    url: '',
    contentType: '',
    data: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = getDownloadUrl({
      query,
      columns: selectedColumns,
      selectedFacets,
      sortColumn,
      sortDirection,
      fileFormat,
      compressed,
      selectedAccessions: downloadAll ? [] : selectedEntries,
    });
    downloadFileInNewTab(url);
    onClose();
  };

  const handleDownloadAllChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDownloadAll(e.target.value === 'true');

  const handleCompressedChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCompressed(e.target.value === 'true');

  const nSelectedEntries = selectedEntries.length;
  const nPreview = Math.min(
    10,
    downloadAll ? totalNumberResults : nSelectedEntries
  );
  const previewFileFormat = getPreviewFileFormat(fileFormat);
  const previewUrl = getDownloadUrl({
    query,
    columns: selectedColumns,
    selectedFacets,
    sortColumn,
    sortDirection,
    fileFormat: previewFileFormat,
    compressed: false,
    size: nPreview,
    selectedAccessions: downloadAll ? [] : selectedEntries,
  });
  const handlePreview = useCallback(() => {
    setLoadingPreview(true);
    const headers: Record<string, string> = {};
    const accept = fileFormatToContentType.get(previewFileFormat);
    if (accept) {
      headers.Accept = accept;
    }
    fetchData<string>(previewUrl, headers)
      .then((response) => {
        const contentType = response.headers?.['content-type'] as FileFormat;
        setPreview({
          data:
            contentType === fileFormatToContentType.get(FileFormat.json)
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
    preview.contentType === fileFormatToContentType.get(previewFileFormat)
      ? preview.data
      : '';

  let previewNode;
  if (loadingPreview) {
    previewNode = <Loader />;
  } else if (previewContent && previewContent.length) {
    previewNode = (
      <div className="preview">
        <h4>Preview</h4>
        <div className="preview__container">
          <pre className="preview__inner" data-testid="download-preview">
            {previewContent}
          </pre>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <form onSubmit={handleSubmit} data-testid="download-form">
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
          Download all ({totalNumberResults})
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
              {Object.values(FileFormat).map((format) => (
                <option value={format} key={format}>
                  {format}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <fieldset>
          <legend>Compressed</legend>
          <label htmlFor="compressed-true">
            <input
              id="compressed-true"
              type="radio"
              name="compressed"
              value="true"
              checked={compressed}
              onChange={handleCompressedChange}
            />
            Yes
          </label>
          <label htmlFor="compressed-false">
            <input
              id="compressed-false"
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
          <fieldset>
            <legend>Customize data</legend>
            <ColumnSelect
              onChange={setSelectedColumns}
              selectedColumns={selectedColumns}
            />
          </fieldset>
        )}
        <section className="button-group side-panel__button-row">
          <button
            className="button secondary"
            type="button"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="button secondary"
            type="button"
            onClick={() => handlePreview()}
          >
            Preview {nPreview}
          </button>
          <button className="button" type="submit">
            Download
          </button>
        </section>
      </form>
      {previewNode}
    </Fragment>
  );
};

export default Download;
