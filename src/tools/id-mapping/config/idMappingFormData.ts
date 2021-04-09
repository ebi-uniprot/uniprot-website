import { SelectedTaxon } from '../../types/toolsFormData';

export enum IDMappingFields {
  ids = 'IDs',
  fromDb = 'From Database',
  toDb = 'To Database',
  name = 'Name',
  taxons = 'Taxons',
}

export type IDMappingFormValue = {
  fieldName: string;
  selected?: string | string[] | number | SelectedTaxon;
};

export type IDMappingFormValues = Record<
  IDMappingFields,
  Readonly<IDMappingFormValue>
>;

const formData: Readonly<IDMappingFormValues> = Object.freeze({
  [IDMappingFields.ids]: Object.freeze({
    fieldName: 'ids',
    selected: [],
  }),
  [IDMappingFields.fromDb]: Object.freeze({
    fieldName: 'from',
    selected: 'UniProtKB_AC-ID',
  }),
  [IDMappingFields.toDb]: Object.freeze({
    fieldName: 'to',
    selected: 'UniRef90',
  }),
  [IDMappingFields.name]: Object.freeze({
    fieldName: 'name',
    selected: '',
  }),
  [IDMappingFields.taxons]: Object.freeze({
    fieldName: 'taxId',
  }),
});

export default formData;
