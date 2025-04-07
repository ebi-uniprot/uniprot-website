import { SelectedTaxon } from '../../types/jobsFormData';
import { lEQi, peps, spOnly } from './peptideSearchServerParameters';

export type FormParameters = {
  peps: peps;
  taxIds?: SelectedTaxon[];
  lEQi: lEQi;
  spOnly: spOnly;
};
