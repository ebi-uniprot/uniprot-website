import React, { Fragment } from 'react';
import { Loader } from 'franklin-sites';
import ColumnSelectContainer from '../column-select/ColumnSelectContainer';
import { FileFormat, fileFormatsWithColumns } from '../../types/resultsTypes';
import { Column } from '../../types/columnTypes';

import './styles/download.scss';

type DownloadViewProps = {
  selectedColumns: Column[];
  onPreview: (nPreview: number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  downloadAll: boolean;
  fileFormat: FileFormat;
  compressed: boolean;
  preview: string;
  loadingPreview: boolean;
  onSelectedColumnsChange: (columns: Column[]) => void;
  onFileFormatChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDownloadAllChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompressedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nSelectedEntries: number;
  totalNumberResults: number;
  nPreview: number;
};

const DownloadView: React.FC<DownloadViewProps> = ({
  onSubmit,
  onCancel,
  onPreview,
  selectedColumns,
  downloadAll,
  fileFormat,
  compressed,
  preview,
  loadingPreview,
  onSelectedColumnsChange,
  onDownloadAllChange,
  onFileFormatChange,
  onCompressedChange,
  nSelectedEntries,
  nPreview,
  totalNumberResults,
}) => {
  let previewNode;
  if (loadingPreview) {
    previewNode = <Loader />;
  } else if (preview && preview.length) {
    previewNode = (
      <div className="preview">
        <h4>Preview</h4>
        <div className="preview__container">
          <pre className="preview__inner" data-testid="download-preview">
            {preview}
          </pre>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <form
        onSubmit={onSubmit}
        className="download"
        data-testid="download-form"
      >
        <h3>Download</h3>
        <label htmlFor="data-selection-false">
          <input
            id="data-selection-false"
            type="radio"
            name="data-selection"
            value="false"
            checked={!downloadAll}
            onChange={onDownloadAllChange}
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
            onChange={onDownloadAllChange}
          />
          Download all ({totalNumberResults})
        </label>
        <fieldset>
          <legend>Format</legend>
          <select
            id="file-format-select"
            data-testid="file-format-select"
            value={fileFormat}
            onChange={onFileFormatChange}
          >
            {Object.values(FileFormat).map((format) => (
              <option value={format} key={format}>
                {format}
              </option>
            ))}
          </select>
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
              onChange={onCompressedChange}
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
              onChange={onCompressedChange}
            />
            No
          </label>
        </fieldset>
        {fileFormatsWithColumns.includes(fileFormat) && (
          <fieldset>
            <legend>Customize data</legend>
            <ColumnSelectContainer
              onChange={onSelectedColumnsChange}
              selectedColumns={selectedColumns}
            />
          </fieldset>
        )}
        <div className="button-group customise-table--cancel-submit-buttons">
          <button className="button secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="button secondary"
            type="button"
            onClick={() => onPreview(nPreview)}
          >
            Preview {nPreview}
          </button>
          <button className="button" type="submit">
            Download
          </button>
        </div>
      </form>
      {previewNode}
    </Fragment>
  );
};

export default DownloadView;
