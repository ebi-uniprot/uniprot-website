import { type SelectedTaxon } from '../../types/jobsFormData';
import { type From, type To } from './idMappingServerParameters';

export type FormParameters = {
  from: From;
  to: To;
  ids: string[];
  taxId?: SelectedTaxon;
};
