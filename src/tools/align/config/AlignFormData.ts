import { FormParameters } from '../types/alignFormParameters';

export type AlignFormValue = {
  fieldName: string;
  selected?: string | boolean | number;
  type?: AlignFieldTypes;
  values?: { label?: string; value?: string | boolean | number }[];
};

export enum AlignFields {
  sequence = 'Sequence',
  name = 'Name',
  order = 'Output sequence order',
  iterations = 'Iterations',
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
  [AlignFields.order]: Object.freeze({
    fieldName: 'order',
    type: AlignFieldTypes.select,
    values: Object.freeze([
      { value: 'aligned', label: 'from alignment' },
      { value: 'input', label: 'same as input' },
    ] as Array<{ label?: string; value: FormParameters['order'] }>),
    selected: 'aligned',
  }),
  [AlignFields.iterations]: Object.freeze({
    fieldName: 'iterations',
    type: AlignFieldTypes.select,
    values: Object.freeze([
      { value: 0 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
    ] as Array<{ value: FormParameters['iterations'] }>),
    selected: 0,
  }),
}) as Readonly<AlignFormValues>;
