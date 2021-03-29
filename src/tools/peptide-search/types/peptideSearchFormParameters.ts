import { PepS, LEQi, SpOnly } from './peptideSearchServerParameters';
import { SelectedTaxon } from '../config/PeptideSearchFormData';

export type FormParameters = {
  peps: PepS;
  taxIds?: SelectedTaxon[];
  lEQi: LEQi;
  spOnly: SpOnly;
};
