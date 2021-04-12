import { From, To } from './idMappingServerParameters';
import { SelectedTaxon } from '../../types/toolsFormData';

export type FormParameters = {
  from: From;
  to: To;
  ids: string[];
  taxId?: SelectedTaxon;
};
