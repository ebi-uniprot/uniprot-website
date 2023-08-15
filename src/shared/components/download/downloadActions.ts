import { action } from 'typesafe-actions';

import { Column } from '../../config/columns';
import { FileFormat } from '../../types/resultsDownload';

export const UPDATE_SELECTED_COLUMNS = 'UPDATE_SELECTED_COLUMNS' as const;
export const UPDATE_SELECTED_FILE_FORMAT =
  'UPDATE_SELECTED_FILE_FORMAT' as const;

export const updateSelectedColumns = (columns: Column[]) =>
  action(UPDATE_SELECTED_COLUMNS, { columns });

export const updateSelctedFileFormat = (selectedFileFormat: FileFormat) =>
  action(UPDATE_SELECTED_FILE_FORMAT, { selectedFileFormat });
