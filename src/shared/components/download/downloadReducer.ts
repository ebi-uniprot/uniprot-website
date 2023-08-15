import { ActionType } from 'typesafe-actions';
// import { JobTypes } from '../../../tools/types/toolsJobTypes';
import * as downloadActions from './downloadActions';
import { DownloadProps, DownloadSelectOptions } from './Download';
import { Column } from '../../config/columns';
import { nsToFileFormatsResultsDownload } from '../../config/resultsDownload';
import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import { JobTypes } from '../../../tools/types/toolsJobTypes';

export type DownloadAction = ActionType<typeof downloadActions>;

type DownloadState<T extends JobTypes> = {
  props: DownloadProps<T>;
  selectedColumns: Column[];
  fileFormatOptions: FileFormat[];
  selectedFileFormat: FileFormat;
  downloadSelect: DownloadSelectOptions;
  compressed: boolean;
};

const getFileFormats = (
  namespace: Namespace,
  supportedFormats?: FileFormat[]
) => {
  const fileFormats =
    supportedFormats || nsToFileFormatsResultsDownload[namespace];

  // In this case it's a not uniprotkb/uniref/uniparc so we can only
  // provide from/to only file formats
  // if (namespace === Namespace.idmapping && !isAsyncDownloadIdMapping) {
  //   fileFormats = fileFormats.filter((ff) => !ff.includes('from/to only'));
  // }
  return fileFormats;
};

export const getDownloadInitialState = ({
  props,
  selectedColumns,
}: {
  props: DownloadProps<JobTypes>;
  selectedColumns: Column[];
}): DownloadState<JobTypes> => {
  const fileFormatOptions = getFileFormats(
    props.namespace,
    props.supportedFormats
  );
  return {
    props,
    selectedColumns,
    fileFormatOptions,
    selectedFileFormat: fileFormatOptions[0],
    downloadSelect: props?.selectedEntries?.length ? 'selected' : 'all', // Defaults to "download all" if no selection
    compressed: props.namespace !== Namespace.unisave,
  };
};

export function downloadReducer(
  state: DownloadState<JobTypes>,
  action: DownloadAction
): DownloadState<JobTypes> {
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
    default:
      return state;
  }
}
