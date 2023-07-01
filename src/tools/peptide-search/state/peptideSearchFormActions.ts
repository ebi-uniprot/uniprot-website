import { action } from 'typesafe-actions';

import {
  PeptideSearchFields,
  PeptideSearchFormValue,
} from '../config/PeptideSearchFormData';

export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export const UPDATE_PEPTIDE_SEQUENCES = 'UPDATE_PEPTIDE_SEQUENCES';
export const UPDATE_SENDING = 'UPDATE_SENDING';
export const RESET = 'RESET';

export const updateSelected = (
  id: PeptideSearchFields,
  selected: PeptideSearchFormValue['selected']
) => action(UPDATE_SELECTED, { id, selected });

export const updatePeptideSequences = (peps: string) =>
  action(UPDATE_PEPTIDE_SEQUENCES, peps);

export const updateSending = () => action(UPDATE_SENDING);

export const resetFormState = () => action(RESET);
