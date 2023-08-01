import { ActionType } from 'typesafe-actions';

import * as asyncDownloadFormActions from './asyncDownloadFormActions';

import {
  AsyncDownloadFields,
  AsyncDownloadFormValues,
} from '../config/asyncDownloadFormData';
import { DownloadUrlOptions } from '../../../shared/config/apiUrls';
import { FileFormat } from '../../../shared/types/resultsDownload';

type AsyncDownloadFormState = {
  formValues: AsyncDownloadFormValues;
  downloadUrlOptions: DownloadUrlOptions;
  count: number;
  jobTitle?: string;
  submitDisabled: boolean;
  sending: boolean;
};

export type AsyncDownloadFormAction = ActionType<
  typeof asyncDownloadFormActions
>;

export const isExcel = (downloadUrlOptions: DownloadUrlOptions) =>
  downloadUrlOptions.fileFormat === FileFormat.excel;

export const isUncompressed = (downloadUrlOptions: DownloadUrlOptions) =>
  !downloadUrlOptions.compressed;

export const isInvalid = (
  name: string,
  downloadUrlOptions: DownloadUrlOptions
) => !name || isExcel(downloadUrlOptions) || isUncompressed(downloadUrlOptions);

const getJobName = (
  count: number,
  downloadUrlOptions: DownloadUrlOptions,
  jobTitle?: string
) => jobTitle || `${downloadUrlOptions.namespace}-${count}`;

export const getAsyncDownloadFormInitialState = ({
  initialFormValues,
  downloadUrlOptions,
  count,
  jobTitle,
}: {
  initialFormValues: Readonly<AsyncDownloadFormValues>;
  downloadUrlOptions: DownloadUrlOptions;
  count: number;
  jobTitle?: string;
}): AsyncDownloadFormState => ({
  formValues: {
    ...initialFormValues,
    [AsyncDownloadFields.name]: {
      ...initialFormValues[AsyncDownloadFields.name],
      selected: getJobName(count, downloadUrlOptions, jobTitle),
    },
  },
  downloadUrlOptions,
  count,
  jobTitle,
  submitDisabled:
    isExcel(downloadUrlOptions) || isUncompressed(downloadUrlOptions),
  sending: false,
});

export const asyncDownloadFormUpdateUrlOptionsReducer = (
  state: AsyncDownloadFormState,
  {
    payload: { downloadUrlOptions },
  }: ActionType<typeof asyncDownloadFormActions.updateDownloadUrlOptions>
) => {
  const { formValues } = state;
  const submitDisabled = isInvalid(
    formValues[AsyncDownloadFields.name].selected,
    downloadUrlOptions
  );
  // Set Job Name, if user didn't already set
  const name =
    formValues[AsyncDownloadFields.name].userSelected &&
    formValues[AsyncDownloadFields.name].selected
      ? formValues[AsyncDownloadFields.name]
      : {
          ...formValues[AsyncDownloadFields.name],
          userSelected: false,
          selected: getJobName(state.count, downloadUrlOptions, state.jobTitle),
        };
  return {
    ...state,
    downloadUrlOptions,
    submitDisabled,
    formValues: { [AsyncDownloadFields.name]: name },
  };
};

export const asyncDownloadFormUpdateSelectedReducer = (
  state: AsyncDownloadFormState,
  {
    payload: { id, selected },
  }: ActionType<typeof asyncDownloadFormActions.updateSelected>
) => {
  let { submitDisabled } = state;
  if (id === AsyncDownloadFields.name) {
    submitDisabled = isInvalid(selected, state.downloadUrlOptions);
  }
  return {
    ...state,
    submitDisabled,
    formValues: {
      [id]: {
        ...state.formValues[id],
        selected,
        userSelected: true,
      },
    },
  };
};

export const getAsyncDownloadFormDataReducer =
  () =>
  (
    state: AsyncDownloadFormState,
    action: AsyncDownloadFormAction
  ): AsyncDownloadFormState => {
    switch (action.type) {
      case asyncDownloadFormActions.UPDATE_DOWNLOAD_URL_OPTIONS:
        return asyncDownloadFormUpdateUrlOptionsReducer(state, action);
      case asyncDownloadFormActions.UPDATE_SELECTED:
        return asyncDownloadFormUpdateSelectedReducer(state, action);
      case asyncDownloadFormActions.UPDATE_SENDING:
        return {
          ...state,
          submitDisabled: true,
          sending: true,
        };
      default:
        return state;
    }
  };
