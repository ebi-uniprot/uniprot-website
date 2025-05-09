import { SelectedTaxon } from '../../types/jobsFormData';
import { From, To } from './idMappingServerParameters';

export type FormParameters = {
  from: From;
  to: To;
  ids: string[];
  taxId?: SelectedTaxon;
};
