import { Program } from '../types/blastServerParameters';
import { FormParameters } from '../types/blastFormParameters';
import { SelectedTaxon } from '../../types/toolsFormData';

export type BlastFormValue = {
  fieldName: string;
  selected?: string | SelectedTaxon[] | boolean | number;
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
};

export enum BlastFields {
  program = 'Program',
  stype = 'Sequence type',
  sequence = 'Sequence',
  taxons = 'Taxons',
  excludedtaxons = 'Excluded taxons',
  database = 'Target database',
  threshold = 'E-Threshold',
  matrix = 'Matrix',
  filter = 'Filter',
  gapped = 'Gapped',
  hits = 'Hits',
  name = 'Name',
}

export type BlastFormValues = Record<BlastFields, Readonly<BlastFormValue>>;

const formData: Readonly<BlastFormValues> = Object.freeze({
  [BlastFields.program]: Object.freeze({
    fieldName: 'program',
    values: Object.freeze<
      Array<{
        value: FormParameters['program'];
      }>
    >([{ value: 'blastp' }, { value: 'blastx' }]),
    selected: 'blastp' as Program,
  }),
  [BlastFields.stype]: Object.freeze({
    fieldName: 'stype',
    values: Object.freeze<
      Array<{ label: string; value: FormParameters['stype'] }>
    >([
      { value: 'protein', label: 'Protein' },
      { value: 'dna', label: 'DNA/RNA' },
    ]),
    selected: 'protein' as FormParameters['stype'],
  }),
  [BlastFields.sequence]: Object.freeze({
    fieldName: 'sequence',
    selected: '',
  }),
  [BlastFields.database]: Object.freeze({
    fieldName: 'database',
    selected: 'uniprotkb_refprotswissprot',
    values: Object.freeze<
      Array<{ label: string; value: FormParameters['database'] }>
    >([
      {
        value: 'uniprotkb_refprotswissprot',
        label: 'UniProtKB reference proteomes + Swiss-Prot',
      },
      { value: 'uniprotkb', label: 'UniProtKB' },
      { value: 'uniprotkb_pdb', label: 'UniProtKB with 3D structure (PDB)' },
      {
        value: 'uniprotkb_reference_proteomes',
        label: 'UniProtKB reference proteomes',
      },
      { value: 'uniprotkb_swissprot', label: 'UniProtKB Swiss-Prot' },
      { value: 'uniref100', label: 'UniRef100' },
      { value: 'uniref90', label: 'UniRef90' },
      { value: 'uniref50', label: 'UniRef50' },
      { value: 'uniparc', label: 'UniParc' },
    ]),
  }),
  [BlastFields.taxons]: Object.freeze({
    fieldName: 'taxIDs',
  }),
  [BlastFields.excludedtaxons]: Object.freeze({
    fieldName: 'negativeTaxIDs',
  }),
  // 'exp' parameter
  [BlastFields.threshold]: Object.freeze({
    fieldName: 'threshold',
    selected: '10',
    values: Object.freeze<
      Array<{ label?: string; value: FormParameters['threshold'] }>
    >([
      { label: '0.0001', value: '1e-4' },
      { label: '0.001', value: '1e-3' },
      { label: '0.01', value: '1e-2' },
      { label: '0.1', value: '1e-1' },
      { label: '1', value: '1.0' },
      { value: '10' },
      { value: '100' },
      { value: '1000' },
    ]),
  }),
  [BlastFields.matrix]: Object.freeze({
    fieldName: 'matrix',
    selected: 'auto',
    values: Object.freeze<
      Array<{ label?: string; value: FormParameters['matrix'] | 'auto' }>
    >([
      // "auto" will be replaced by the correct matrix value on submission
      // but we need to have a distinc value here to not have 2 <option> with
      // same values
      { label: 'Auto - PAM30', value: 'auto' },
      { value: 'BLOSUM45' },
      { value: 'BLOSUM62' },
      { value: 'BLOSUM80' },
      { value: 'PAM70' },
      { value: 'PAM30' },
    ]),
  }),
  [BlastFields.filter]: Object.freeze({
    fieldName: 'filter',
    selected: 'F',
    values: Object.freeze<
      Array<{ label: string; value: FormParameters['filter'] }>
    >([
      { value: 'F', label: 'None' },
      { value: 'T', label: 'Filter low complexity regions' },
    ]),
  }),
  // 'gapalign'
  [BlastFields.gapped]: Object.freeze({
    fieldName: 'gapped',
    selected: true,
    values: Object.freeze<
      Array<{ label: string; value: FormParameters['gapped'] }>
    >([
      { value: true, label: 'yes' },
      { value: false, label: 'no' },
    ]),
  }),
  // Note: this corresponds to BOTH 'alignments' AND 'scores' AT THE SAME TIME!
  [BlastFields.hits]: Object.freeze({
    fieldName: 'hits',
    selected: 250,
    values: Object.freeze<Array<{ value: FormParameters['hits'] }>>([
      { value: 50 },
      { value: 100 },
      { value: 250 },
      { value: 500 },
      { value: 750 },
      { value: 1000 },
    ]),
  }),
  [BlastFields.name]: Object.freeze({
    fieldName: 'name',
    selected: '',
  }),
});

export default formData;
