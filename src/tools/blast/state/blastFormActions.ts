// import { BlastFormValue } from '../config/BlastFormData';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';
import { action } from 'typesafe-actions';
import { BlastFormValue } from '../config/BlastFormData';

import { BlastFormActionPayloadId } from './blastFormReducer';

export const UPDATE = 'UPDATE';
export const RESET = 'RESET';

export type BlastUpdateFormValue =
  | BlastFormValue['selected']
  | SequenceObject[];

export const updateFormState = (
  id: BlastFormActionPayloadId,
  value: BlastUpdateFormValue
) => action(UPDATE, { id, value });

export const resetFormState = () => action(RESET);
