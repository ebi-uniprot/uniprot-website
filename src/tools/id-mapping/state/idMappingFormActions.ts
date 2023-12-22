import { action } from 'typesafe-actions';

import {
  IDMappingFormValue,
  IDMappingFormValues,
  IDMappingFields,
} from '../config/idMappingFormData';

export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const UPDATE_PARSED_IDS = 'UPDATE_PARSED_IDS';
export const UPDATE_SENDING = 'UPDATE_SENDING';
export const RESET = 'RESET';

export const updateSelected = (
  id: IDMappingFields,
  selected: IDMappingFormValue['selected']
) => action(UPDATE_SELECTED, { id, selected });

export const updateInputTextIDs = (textIDs: string) =>
  action(UPDATE_PARSED_IDS, textIDs);

export const updateSending = () => action(UPDATE_SENDING);

export const resetFormState = (formValues?: Readonly<IDMappingFormValues>) =>
  action(RESET, formValues);
