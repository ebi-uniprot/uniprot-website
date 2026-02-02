import { type SelectedTaxon } from '../../types/jobsFormData';
import {
  type lEQi,
  type peps,
  type spOnly,
} from './peptideSearchServerParameters';

export type FormParameters = {
  peps: peps;
  taxIds?: SelectedTaxon[];
  lEQi: lEQi;
  spOnly: spOnly;
};
