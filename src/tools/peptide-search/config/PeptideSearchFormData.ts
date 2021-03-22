import { FormParameters } from '../types/peptideSearchFormParameters';

export type SelectedTaxon = { label: string; id: string };

export enum PeptideSearchFieldTypes {
  textarea,
  select,
  autocomplete,
}

export type PeptideSearchFormValue = {
  fieldName: string;
  selected?: string | SelectedTaxon[] | boolean | number;
  type?: PeptideSearchFieldTypes;
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
};

export enum PeptideSearchFields {
  peps = 'Peptide sequences',
  taxIds = 'Taxons',
  lEQi = 'Isoleucine leucine equivalent',
  spOnly = 'Reviewed only',
}

export type PeptideSearchFormValues = Record<
  PeptideSearchFields,
  Readonly<PeptideSearchFormValue>
>;

const formData: Readonly<PeptideSearchFormValues> = Object.freeze({
  [PeptideSearchFields.peps]: Object.freeze({
    fieldName: 'peptideSequences',
    type: PeptideSearchFieldTypes.textarea,
    selected: '',
  }),
  [PeptideSearchFields.taxIds]: Object.freeze({
    fieldName: 'taxons',
    type: PeptideSearchFieldTypes.autocomplete,
  }),
  [PeptideSearchFields.lEQi]: Object.freeze({
    fieldName: 'isoleucineLeucineEquivalent',
    type: PeptideSearchFieldTypes.select,
    selected: false,
    values: Object.freeze([
      { value: true, label: 'on' },
      { value: false, label: 'off' },
    ] as Array<{ label?: string; value: FormParameters['gapped'] }>),
  }),
  [PeptideSearchFields.spOnly]: Object.freeze({
    fieldName: 'reviewedOnly',
    type: PeptideSearchFieldTypes.select,
    selected: false,
    values: Object.freeze([
      { value: true, label: 'on' },
      { value: false, label: 'off' },
    ] as Array<{ label?: string; value: FormParameters['gapped'] }>),
  }),
});

export default formData;
