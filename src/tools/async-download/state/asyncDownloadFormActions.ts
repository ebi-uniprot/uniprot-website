import { action } from 'typesafe-actions';
import {
  AsyncDownloadFields,
  AsyncDownloadFormValue,
} from '../config/asyncDownloadFormData';
import { DownloadUrlOptions } from '../../../shared/config/apiUrls';

export const UPDATE_SELECTED = 'UPDATE_SELECTED' as const;
export const UPDATE_DOWNLOAD_URL_OPTIONS =
  'UPDATE_DOWNLOAD_URL_OPTIONS' as const;
export const UPDATE_COUNT = 'UPDATE_COUNT' as const;
export const UPDATE_SENDING = 'UPDATE_SENDING' as const;
export const RESET = 'RESET' as const;
export const UPDATE_CONFIRMATION = 'UPDATE_CONFIRMATION' as const;

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

export const updateConfirmation = (show: boolean) =>
  action(UPDATE_CONFIRMATION, { show });
