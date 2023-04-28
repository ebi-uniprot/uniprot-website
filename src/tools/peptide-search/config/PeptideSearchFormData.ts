import deepFreeze from 'deep-freeze';

import { SelectedTaxon } from '../../types/toolsFormData';

export type PeptideSearchFormValue = {
  fieldName: string;
  selected?: string | SelectedTaxon[] | boolean | number;
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
  userSelected?: boolean;
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

const formData: Readonly<PeptideSearchFormValues> = deepFreeze({
  [PeptideSearchFields.peps]: {
    fieldName: 'peps',
    selected: '',
  },
  [PeptideSearchFields.taxIds]: {
    fieldName: 'taxIds',
  },
  [PeptideSearchFields.lEQi]: {
    fieldName: 'lEQi',
    selected: 'off',
    values: [{ value: 'on' }, { value: 'off' }],
  },
  [PeptideSearchFields.spOnly]: {
    fieldName: 'spOnly',
    selected: 'off',
    values: [{ value: 'on' }, { value: 'off' }],
  },
  [PeptideSearchFields.name]: {
    fieldName: 'name',
    selected: '',
  },
});

export default formData;
