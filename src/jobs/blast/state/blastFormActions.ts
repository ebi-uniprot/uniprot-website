import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';
import { action } from 'typesafe-actions';

import {
  BlastFields,
  BlastFormValue,
  BlastFormValues,
} from '../config/BlastFormData';

export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const UPDATE_PARSED_SEQUENCES = 'UPDATE_PARSED_SEQUENCES';
export const SET_SUBMIT_DISABLED = 'SET_SUBMIT_DISABLED';
export const UPDATE_SENDING = 'UPDATE_SENDING';
export const RESET = 'RESET';

export const updateSelected = (
  id: BlastFields,
  selected: BlastFormValue['selected']
) => action(UPDATE_SELECTED, { id, selected });

export const updateParsedSequences = (
  parsedSequences: SequenceObject[],
  fromSequenceSearchLoader = false
) =>
  action(UPDATE_PARSED_SEQUENCES, {
    parsedSequences,
    fromSequenceSearchLoader,
  });

export const setSubmitDisabled = (submitDisabled: boolean) =>
  action(SET_SUBMIT_DISABLED, submitDisabled);

export const updateSending = () => action(UPDATE_SENDING);

export const resetFormState = (formValues?: Readonly<BlastFormValues>) =>
  action(RESET, formValues);
