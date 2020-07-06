export type AlignFormValue = {
  fieldName: string;
  selected?: string;
  type?: AlignFieldTypes;
  values?: { label?: string; value?: string }[];
};

export enum AlignFields {
  sequence = 'Sequence',
  name = 'Name',
}

export enum AlignFieldTypes {
  textarea,
  select,
}

export type AlignFormValues = { [x in AlignFields]: AlignFormValue };

export default Object.freeze({
  [AlignFields.sequence]: Object.freeze({
    fieldName: 'sequence',
    type: AlignFieldTypes.textarea,
    selected: '',
  }),
  [AlignFields.name]: Object.freeze({
    fieldName: 'name',
    type: AlignFieldTypes.textarea,
    selected: '',
  }),
}) as Readonly<AlignFormValues>;
