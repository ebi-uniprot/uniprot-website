import { action } from 'typesafe-actions';
import {
  AsyncDownloadFields,
  AsyncDownloadFormValue,
} from '../config/asyncDownloadFormData';
import { DownloadUrlOptions } from '../../../shared/config/apiUrls';

export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const UPDATE_DOWNLOAD_URL_OPTIONS = 'UPDATE_DOWNLOAD_URL_OPTIONS';
export const UPDATE_COUNT = 'UPDATE_COUNT';
export const UPDATE_SENDING = 'UPDATE_SENDING';
export const RESET = 'RESET';

export const updateSelected = (
  id: AsyncDownloadFields,
  selected: AsyncDownloadFormValue['selected']
) => action(UPDATE_SELECTED, { id, selected });

export const updateDownloadUrlOptions = (
  downloadUrlOptions: DownloadUrlOptions
) =>
  action(UPDATE_DOWNLOAD_URL_OPTIONS, {
    downloadUrlOptions,
  });

export const updateSending = () => action(UPDATE_SENDING);

export const resetFormState = () => action(RESET);
