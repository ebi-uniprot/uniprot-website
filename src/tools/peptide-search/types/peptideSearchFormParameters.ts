import { PepS, LEQi, SpOnly } from './peptideSearchServerParameters';
import { SelectedTaxon } from '../../types/toolsFormData';

export type FormParameters = {
  peps: PepS;
  taxIds?: SelectedTaxon[];
  lEQi: LEQi;
  spOnly: SpOnly;
};
