import React, { useState } from 'react';
import DownloadView from './DownloadView';
import { UniProtKBColumn, SortableColumn } from '../../types/columnTypes';
import {
  FileFormat,
  fileFormatToContentType,
  SelectedFacet,
  SortDirection,
} from '../../types/resultsTypes';
import { getDownloadUrl } from '../../../shared/config/apiUrls';
import { urlsAreEqual } from '../../../shared/utils/url';
import fetchData from '../../../shared/utils/fetchData';
import { Column } from '../../../shared/config/columns';
import { downloadFileInNewTab } from '../../../shared/utils/utils';
// import { Namespace } from '../../../shared/types/namespaces';

export const getPreviewFileFormat = (fileFormat: FileFormat) =>
  fileFormat === FileFormat.excel ? FileFormat.tsv : fileFormat;

type DownloadTableProps = {
  // tableColumns: Partial<Record<Namespace, UniProtKBColumn[] | UniRefColumn[]>>;
  query: string;
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  selectedEntries: string[];
  totalNumberResults: number;
  onClose: () => void;
};

const Download: React.FC<DownloadTableProps> = ({
  // tableColumns,
  query = '',
  selectedFacets = [],
  sortColumn = UniProtKBColumn.accession as SortableColumn,
  sortDirection = SortDirection.ascend,
  selectedEntries = [],
  totalNumberResults = 0,
  onClose,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<Column[]>(
    // TODO temporary casting to UniProtKBColumn to make TS happy
    // tableColumns[Namespace.uniprotkb] as UniProtKBColumn[]
    []
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

  if (!selectedColumns) {
    // TODO could return an error here
    return null;
  }

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
    compressed,
    size: nPreview,
    selectedAccessions: downloadAll ? [] : selectedEntries,
  });
  const handlePreview = () => {
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
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      })
      .finally(() => {
        setLoadingPreview(false);
      });
  };
  const showPreview =
    urlsAreEqual(preview.url, previewUrl, ['compressed']) &&
    preview.data &&
    preview.contentType === fileFormatToContentType.get(previewFileFormat);
  return (
    <DownloadView
      onSubmit={handleSubmit}
      onCancel={onClose}
      onPreview={handlePreview}
      selectedColumns={selectedColumns}
      downloadAll={downloadAll}
      fileFormat={fileFormat}
      compressed={compressed}
      onSelectedColumnsChange={setSelectedColumns}
      nSelectedEntries={nSelectedEntries}
      onDownloadAllChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setDownloadAll(e.target.value === 'true')
      }
      onFileFormatChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setFileFormat(e.target.value as FileFormat)
      }
      onCompressedChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setCompressed(e.target.value === 'true')
      }
      preview={showPreview ? preview.data : ''}
      loadingPreview={loadingPreview}
      nPreview={nPreview}
      totalNumberResults={totalNumberResults}
    />
  );
};

export default Download;
