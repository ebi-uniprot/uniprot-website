import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';
import { action } from 'typesafe-actions';
import { BlastFields, BlastFormValue } from '../config/FoldseekFormData';

export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const UPDATE_PARSED_SEQUENCES = 'UPDATE_PARSED_SEQUENCES';
export const UPDATE_SENDING = 'UPDATE_SENDING';
export const RESET = 'RESET';

export const updateSelected = (
  id: BlastFields,
  selected: BlastFormValue['selected']
) => action(UPDATE_SELECTED, { id, selected });

export const updateParsedSequences = (parsedSequences: SequenceObject[]) =>
  action(UPDATE_PARSED_SEQUENCES, parsedSequences);

export const updateSending = () => action(UPDATE_SENDING);

export const resetFormState = () => action(RESET);
