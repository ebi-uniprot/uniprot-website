import deepFreeze from 'deep-freeze';

import { SelectedTaxon } from '../../types/jobsFormData';

export type IDMappingFormValue = {
  fieldName: string;
  selected?: Readonly<string | string[] | number | SelectedTaxon>;
  userSelected?: boolean;
};

export enum IDMappingFields {
  ids = 'IDs',
  fromDb = 'From Database',
  toDb = 'To Database',
  name = 'Name',
  taxons = 'Taxons',
}

export type IDMappingFormValues = Record<
  IDMappingFields,
  Readonly<IDMappingFormValue>
>;

const formData: Readonly<IDMappingFormValues> = deepFreeze({
  [IDMappingFields.ids]: {
    fieldName: 'ids',
    selected: [],
  },
  [IDMappingFields.fromDb]: {
    fieldName: 'from',
    selected: 'UniProtKB_AC-ID',
  },
  [IDMappingFields.toDb]: {
    fieldName: 'to',
    selected: 'UniProtKB',
  },
  [IDMappingFields.name]: {
    fieldName: 'name',
    selected: '',
  },
  [IDMappingFields.taxons]: {
    fieldName: 'taxId',
  },
});

export default formData;
