import deepFreeze from 'deep-freeze';

export enum AlignFieldTypes {
  textarea,
  select,
}

export type AlignFormValue = {
  fieldName: string;
  selected?: string | boolean | number;
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
  userSelected?: boolean;
};

export enum AlignFields {
  sequence = 'Sequence',
  name = 'Name',
  order = 'Output sequence order',
  iterations = 'Iterations',
}

export type AlignFormValues = Record<AlignFields, Readonly<AlignFormValue>>;

const formData: Readonly<AlignFormValues> = deepFreeze({
  [AlignFields.sequence]: {
    fieldName: 'sequence',
    selected: '',
  },
  [AlignFields.name]: {
    fieldName: 'name',
    selected: '',
  },
  [AlignFields.order]: {
    fieldName: 'order',
    values: [
      { value: 'aligned', label: 'from alignment' },
      { value: 'input', label: 'same as input' },
    ],
    selected: 'aligned',
  },
  [AlignFields.iterations]: {
    fieldName: 'iterations',
    values: [
      { value: 0 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ],
    selected: 0,
  },
});

export default formData;
