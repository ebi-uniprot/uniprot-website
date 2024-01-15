import { ActionType } from 'typesafe-actions';

import { JobFromUrl } from '../../hooks/useJobFromUrl';

import * as downloadActions from './downloadActions';

import {
  filterFullXrefColumns,
  fullToStandardColumnName,
  getFileFormatsOptions,
} from './downloadUtils';

import { Column } from '../../config/columns';

import { DownloadProps } from './Download';
import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import { JobTypes } from '../../../tools/types/toolsJobTypes';

export type DownloadAction = ActionType<typeof downloadActions>;

export type ExtraContent = null | 'url' | 'generate' | 'preview' | 'ftp';

export type DownloadSelectOptions = 'all' | 'selected';

export type DownloadState = {
  selectedColumns: string[];
  fileFormatOptions: FileFormat[];
  selectedFileFormat: FileFormat;
  downloadSelect: DownloadSelectOptions;
  compressed: boolean;
  extraContent: ExtraContent;
  nSelectedEntries: number;
  disableForm: boolean;
  fullXref: boolean;
};

export const getDownloadInitialState = ({
  props,
  job,
  selectedColumns,
}: {
  props: DownloadProps<JobTypes>;
  job: JobFromUrl;
  selectedColumns: Column[];
}): DownloadState => {
  const fileFormatOptions = getFileFormatsOptions(props, job);
  return {
    selectedColumns,
    fileFormatOptions,
    selectedFileFormat: fileFormatOptions[0],
    downloadSelect: props?.selectedEntries?.length ? 'selected' : 'all', // Defaults to "download all" if no selection
    compressed: props.namespace !== Namespace.unisave,
    extraContent: props.extraContent || null,
    nSelectedEntries:
      props.numberSelectedEntries || props.selectedEntries?.length || 0,
    disableForm: false,
    fullXref: false,
  };
};

export function downloadReducer(
  state: DownloadState,
  action: DownloadAction
): DownloadState {
  switch (action.type) {
    case downloadActions.UPDATE_SELECTED_COLUMNS: {
      const fullXrefColumns = filterFullXrefColumns(
        action.payload.columns,
        action.payload.fieldData
      );
      if (state.fullXref) {
        const addFullXref = action.payload.columns.map((column) => {
          if (fullXrefColumns?.includes(column)) {
            return `${column}_full`;
          }
          return column;
        });
        return {
          ...state,
          selectedColumns: addFullXref,
        };
      }
      const removeFullXref = action.payload.columns.map((column) =>
        fullToStandardColumnName(column)
      );
      return {
        ...state,
        selectedColumns: removeFullXref,
      };
    }
    case downloadActions.UPDATE_SELECTED_FILE_FORMAT:
      return {
        ...state,
        selectedFileFormat: action.payload.selectedFileFormat,
      };
    case downloadActions.UPDATE_DOWNLOAD_SELECT:
      return { ...state, downloadSelect: action.payload.downloadSelect };
    case downloadActions.UPDATE_COMPRESSED:
      return { ...state, compressed: action.payload.compressed };
    case downloadActions.UPDATE_EXTRA_CONTENT:
      return { ...state, extraContent: action.payload.extraContent };
    case downloadActions.UPDATE_DISABLE_FORM:
      return { ...state, disableForm: action.payload.disableForm };
    case downloadActions.UPDATE_FULL_XREF:
      return { ...state, fullXref: action.payload.fullXref };
    default:
      return state;
  }
}
