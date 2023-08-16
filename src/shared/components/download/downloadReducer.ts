import { ActionType } from 'typesafe-actions';

import * as downloadActions from './downloadActions';

import { Column } from '../../config/columns';
import { nsToFileFormatsResultsDownload } from '../../config/resultsDownload';

import { DownloadProps, DownloadSelectOptions } from './Download';
import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import { JobTypes } from '../../../tools/types/toolsJobTypes';

export type DownloadAction = ActionType<typeof downloadActions>;

export type ExtraContent = null | 'url' | 'generate' | 'preview' | 'ftp';

export type DownloadState = {
  selectedColumns: Column[];
  fileFormatOptions: FileFormat[];
  selectedFileFormat: FileFormat;
  downloadSelect: DownloadSelectOptions;
  compressed: boolean;
  extraContent: ExtraContent;
  nSelectedEntries: number;
};

export const getDownloadInitialState = ({
  props,
  selectedColumns,
}: {
  props: DownloadProps<JobTypes>;
  selectedColumns: Column[];
}): DownloadState => {
  const fileFormatOptions =
    props.supportedFormats || nsToFileFormatsResultsDownload[props.namespace];
  return {
    selectedColumns,
    fileFormatOptions,
    selectedFileFormat: fileFormatOptions[0],
    downloadSelect: props?.selectedEntries?.length ? 'selected' : 'all', // Defaults to "download all" if no selection
    compressed: props.namespace !== Namespace.unisave,
    extraContent: null,
    nSelectedEntries:
      props.numberSelectedEntries || props.selectedEntries?.length || 0,
  };
};

export function downloadReducer(
  state: DownloadState,
  action: DownloadAction
): DownloadState {
  switch (action.type) {
    case downloadActions.UPDATE_SELECTED_COLUMNS:
      return {
        ...state,
        selectedColumns: action.payload.columns,
      };
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
    default:
      return state;
  }
}
