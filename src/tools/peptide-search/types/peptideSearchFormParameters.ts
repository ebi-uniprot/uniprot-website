import { peps, lEQi, spOnly } from './peptideSearchServerParameters';
import { SelectedTaxon } from '../../types/toolsFormData';

export type FormParameters = {
  peps: peps;
  taxIds?: SelectedTaxon[];
  lEQi: lEQi;
  spOnly: spOnly;
};
