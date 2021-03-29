export enum IDMappingFields {
  ids = 'IDs',
  fromDb = 'From Database',
  toDb = 'To Database',
  name = 'Name',
}

export type IDMappingFormValue = {
  fieldName: string;
  selected: string;
};

export type IDMappingFormValues = Record<
  IDMappingFields,
  Readonly<IDMappingFormValue>
>;

const formData: Readonly<IDMappingFormValues> = Object.freeze({
  [IDMappingFields.ids]: Object.freeze({
    fieldName: 'ids',
    selected: '',
  }),
  [IDMappingFields.fromDb]: Object.freeze({
    fieldName: 'fromDb',
    selected: 'UniProtKB_AC-ID',
  }),
  [IDMappingFields.toDb]: Object.freeze({
    fieldName: 'toDb',
    selected: 'UniRef90',
  }),
  [IDMappingFields.name]: Object.freeze({
    fieldName: 'name',
    selected: '',
  }),
});

export default formData;
