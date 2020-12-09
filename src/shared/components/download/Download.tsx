import React, { Fragment, useCallback, useState } from 'react';
import { Loader, CodeBlock, Button, LongNumber } from 'franklin-sites';

import { urlsAreEqual } from '../../utils/url';
import fetchData from '../../utils/fetchData';
import ColumnSelect from '../column-select/ColumnSelect';
import useNS from '../../hooks/useNS';

import { getDownloadUrl } from '../../config/apiUrls';
import { Column, nsToPrimaryKeyColumn } from '../../config/columns';

import { SortableColumn } from '../../../uniprotkb/types/columnTypes';
import {
  SelectedFacet,
  SortDirection,
} from '../../../uniprotkb/types/resultsTypes';
import {
  fileFormatsWithColumns,
  fileFormatToContentType,
  nsToFileFormatsResultsDownload,
} from '../../config/resultsDownload';

import './styles/download.scss';
import '../../styles/sticky.scss';
import { ContentType, FileFormat } from '../../types/resultsDownload';

export const getPreviewFileFormat = (fileFormat: FileFormat) =>
  fileFormat === FileFormat.excel ? FileFormat.tsv : fileFormat;

type DownloadProps = {
  query: string;
  selectedFacets?: SelectedFacet[];
  selectedColumns?: Column[];
  sortColumn?: SortableColumn;
  sortDirection?: SortDirection;
  selectedEntries: string[];
  totalNumberResults: number;
  onClose: () => void;
};

const Download: React.FC<DownloadProps> = ({
  query,
  selectedFacets = [],
  selectedColumns: initialSelectedColumns = [],
  sortColumn,
  sortDirection,
  selectedEntries = [],
  totalNumberResults,
  onClose,
}) => {
  const namespace = useNS();
  if (!namespace) {
    throw new Error('No namespace provided');
  }
  const fileFormats = nsToFileFormatsResultsDownload[namespace] as FileFormat[];
  const [selectedColumns, setSelectedColumns] = useState<Column[]>(
    initialSelectedColumns
  );
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

  const downloadUrl = getDownloadUrl({
    query,
    columns: selectedColumns,
    selectedFacets,
    sortColumn,
    sortDirection,
    fileFormat,
    compressed,
    selected: downloadAll ? [] : selectedEntries,
    selectedIdField,
    namespace,
  });

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
    selected: downloadAll ? [] : selectedEntries,
    selectedIdField,
    namespace,
  });
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
      <div className="preview">
        <h4>Preview</h4>
        <div className="preview__container">
          <CodeBlock lightMode data-testid="download-preview">
            {previewContent}
          </CodeBlock>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <form data-testid="download-form">
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
          <Fragment>
            <legend>Customize data</legend>
            <ColumnSelect
              onChange={setSelectedColumns}
              selectedColumns={selectedColumns}
            />
          </Fragment>
        )}
        <section className="button-group sliding-panel__button-row sticky-bottom-right">
          <Button variant="secondary" type="button" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="secondary" type="button" onClick={handlePreview}>
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
      </form>
      {previewNode}
    </Fragment>
  );
};

export default Download;
