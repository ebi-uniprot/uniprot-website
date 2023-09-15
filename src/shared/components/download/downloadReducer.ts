import { ActionType } from 'typesafe-actions';

import { JobFromUrl } from '../../hooks/useJobFromUrl';

import * as downloadActions from './downloadActions';

import { Column } from '../../config/columns';

import { DownloadProps } from './Download';
import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { getFileFormatsOptions } from './downloadUtils';

export type DownloadAction = ActionType<typeof downloadActions>;

export type ExtraContent = null | 'url' | 'generate' | 'preview' | 'ftp';

export type DownloadSelectOptions = 'all' | 'selected';

export type DownloadState = {
  selectedColumns: Column[];
  fileFormatOptions: FileFormat[];
  selectedFileFormat: FileFormat;
  downloadSelect: DownloadSelectOptions;
  compressed: boolean;
  extraContent: ExtraContent;
  nSelectedEntries: number;
  disableForm: boolean;
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
    extraContent: null,
    nSelectedEntries:
      props.numberSelectedEntries || props.selectedEntries?.length || 0,
    disableForm: false,
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
    case downloadActions.UPDATE_DISABLE_FORM:
      return { ...state, disableForm: action.payload.disableForm };
    default:
      return state;
  }
}
