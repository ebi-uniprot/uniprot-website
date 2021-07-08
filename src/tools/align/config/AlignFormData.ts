import { FormParameters } from '../types/alignFormParameters';

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
};

export enum AlignFields {
  sequence = 'Sequence',
  name = 'Name',
  order = 'Output sequence order',
  iterations = 'Iterations',
}

export type AlignFormValues = Record<AlignFields, Readonly<AlignFormValue>>;

const formData: Readonly<AlignFormValues> = Object.freeze({
  [AlignFields.sequence]: Object.freeze({
    fieldName: 'sequence',
    selected: '',
  }),
  [AlignFields.name]: Object.freeze({
    fieldName: 'name',
    selected: '',
  }),
  [AlignFields.order]: Object.freeze({
    fieldName: 'order',
    values: Object.freeze<
      Array<{ label: string; value: FormParameters['order'] }>
    >([
      { value: 'aligned', label: 'from alignment' },
      { value: 'input', label: 'same as input' },
    ]),
    selected: 'aligned',
  }),
  [AlignFields.iterations]: Object.freeze({
    fieldName: 'iterations',
    values: Object.freeze<Array<{ value: FormParameters['iterations'] }>>([
      { value: 0 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ]),
    selected: 0,
  }),
});

export default formData;
