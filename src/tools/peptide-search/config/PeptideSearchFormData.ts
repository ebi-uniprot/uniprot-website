import { FormParameters } from '../types/peptideSearchFormParameters';
import { SelectedTaxon } from '../../types/toolsFormData';

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
    selected: '' as string,
  }),
  [PeptideSearchFields.taxIds]: Object.freeze({
    fieldName: 'taxIds',
  }),
  [PeptideSearchFields.lEQi]: Object.freeze({
    fieldName: 'lEQi',
    selected: 'off',
    values: Object.freeze([{ value: 'on' }, { value: 'off' }] as Array<{
      value: FormParameters['lEQi'];
    }>),
  }),
  [PeptideSearchFields.spOnly]: Object.freeze({
    fieldName: 'spOnly',
    selected: 'off',
    values: Object.freeze([{ value: 'on' }, { value: 'off' }] as Array<{
      value: FormParameters['spOnly'];
    }>),
  }),
  [PeptideSearchFields.name]: Object.freeze({
    fieldName: 'name',
    selected: '',
  }),
});

export default formData;
