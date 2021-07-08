import { FormParameters } from '../types/peptideSearchFormParameters';
import { SelectedTaxon } from '../../types/toolsFormData';

export type PeptideSearchFormValue = {
  fieldName: string;
  selected?: string | SelectedTaxon[] | boolean | number;
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
};

export enum PeptideSearchFields {
  peps = 'Peptide sequences',
  taxIds = 'Taxons',
  lEQi = 'Treat isoleucine and leucine as equivalent',
  spOnly = 'Search UniProt Reviewed (Swiss-Prot) only',
  name = 'Name',
}

export type PeptideSearchFormValues = Record<
  PeptideSearchFields,
  Readonly<PeptideSearchFormValue>
>;

const formData: Readonly<PeptideSearchFormValues> = Object.freeze({
  [PeptideSearchFields.peps]: Object.freeze({
    fieldName: 'peps',
    selected: '',
  }),
  [PeptideSearchFields.taxIds]: Object.freeze({
    fieldName: 'taxIds',
  }),
  [PeptideSearchFields.lEQi]: Object.freeze({
    fieldName: 'lEQi',
    selected: 'off',
    values: Object.freeze<
      Array<{
        value: FormParameters['lEQi'];
      }>
    >([{ value: 'on' }, { value: 'off' }]),
  }),
  [PeptideSearchFields.spOnly]: Object.freeze({
    fieldName: 'spOnly',
    selected: 'off',
    values: Object.freeze<
      Array<{
        value: FormParameters['spOnly'];
      }>
    >([{ value: 'on' }, { value: 'off' }]),
  }),
  [PeptideSearchFields.name]: Object.freeze({
    fieldName: 'name',
    selected: '',
  }),
});

export default formData;
