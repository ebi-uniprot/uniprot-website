import { action } from 'typesafe-actions';

import { FieldData } from '../../../uniprotkb/types/resultsTypes';
import { FileFormat } from '../../types/resultsDownload';
import { DownloadSelectOptions, ExtraContent } from './downloadReducer';

export const UPDATE_SELECTED_COLUMNS = 'UPDATE_SELECTED_COLUMNS' as const;
export const UPDATE_SELECTED_FILE_FORMAT =
  'UPDATE_SELECTED_FILE_FORMAT' as const;
export const UPDATE_DOWNLOAD_SELECT = 'UPDATE_DOWNLOAD_SELECT' as const;
export const UPDATE_COMPRESSED = 'UPDATE_COMPRESSED' as const;
export const UPDATE_EXTRA_CONTENT = 'UPDATE_EXTRA_CONTENT' as const;
export const UPDATE_DISABLE_FORM = 'UPDATE_DISABLE_FORM' as const;
export const UPDATE_FULL_XREF = 'UPDATE_FULL_XREF' as const;

export const updateSelectedColumns = (
  columns: string[],
  fieldData: FieldData
) => action(UPDATE_SELECTED_COLUMNS, { columns, fieldData });

export const updateSelectedFileFormat = (selectedFileFormat: FileFormat) =>
  action(UPDATE_SELECTED_FILE_FORMAT, { selectedFileFormat });

export const updateDownloadSelect = (downloadSelect: DownloadSelectOptions) =>
  action(UPDATE_DOWNLOAD_SELECT, { downloadSelect });

export const updateCompressed = (compressed: boolean) =>
  action(UPDATE_COMPRESSED, { compressed });

export const updateExtraContent = (extraContent: ExtraContent) =>
  action(UPDATE_EXTRA_CONTENT, { extraContent });

export const updateDisableForm = (disableForm: boolean) =>
  action(UPDATE_DISABLE_FORM, { disableForm });

export const updateFullXref = (fullXref: boolean) =>
  action(UPDATE_FULL_XREF, { fullXref });
