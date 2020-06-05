import { Program } from '../types/blastServerParameters';
import { FormParameters } from '../types/blastFormParameters';

export type SelectedTaxon = { label: string; id: string };

export type BlastFormValue = {
  fieldName: string;
  selected?: string | SelectedTaxon[] | boolean | number;
  type?: BlastFieldTypes;
  values?: { label?: string; value?: string | boolean | number }[];
};

export enum BlastFields {
  program = 'Program',
  stype = 'Sequence type',
  sequence = 'Sequence',
  taxons = 'Taxons',
  targetDb = 'Target database',
  threshold = 'E-Threshold',
  matrix = 'Matrix',
  filter = 'Filter',
  gapped = 'Gapped',
  hits = 'Hits',
  name = 'Name',
}

export enum BlastFieldTypes {
  textarea,
  select,
  autocomplete,
}

export type BlastFormValues = { [x in BlastFields]: BlastFormValue };

export default Object.freeze({
  [BlastFields.program]: Object.freeze({
    fieldName: 'program',
    values: Object.freeze([
      { value: 'blastp' },
      { value: 'blastx' },
      { value: 'blastn' },
      { value: 'tblastx' },
      { value: 'tblastn' },
    ] as Array<{ value: FormParameters['program'] }>),
    selected: 'blastp' as Program,
  }),
  [BlastFields.stype]: Object.freeze({
    fieldName: 'stype',
    values: Object.freeze([
      { value: 'protein', label: 'Protein' },
      { value: 'dna', label: 'DNA/RNA' },
    ] as Array<{ label: string; value: FormParameters['stype'] }>),
    selected: 'protein' as FormParameters['stype'],
  }),
  [BlastFields.sequence]: Object.freeze({
    fieldName: 'sequence',
    type: BlastFieldTypes.textarea,
    selected: '',
  }),
  [BlastFields.targetDb]: Object.freeze({
    fieldName: 'database',
    type: BlastFieldTypes.select,
    selected: 'uniprotkb_refprotswissprot',
    values: Object.freeze([
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
      { value: 'UniRef100' },
      { value: 'UniRef90' },
      { value: 'UniRef50' },
      { value: 'uniparc', label: 'UniParc' },
    ] as Array<{ label?: string; value: FormParameters['database'] }>),
  }),
  [BlastFields.taxons]: Object.freeze({
    fieldName: 'taxids',
    type: BlastFieldTypes.autocomplete,
  }),
  // 'exp' parameter
  [BlastFields.threshold]: Object.freeze({
    fieldName: 'threshold',
    type: BlastFieldTypes.select,
    selected: '10',
    values: Object.freeze([
      { label: '0.0001', value: '1e-4' },
      { label: '0.001', value: '1e-3' },
      { label: '0.01', value: '1e-2' },
      { label: '0.1', value: '1e-1' },
      { label: '1', value: '1' },
      { value: '10' },
      { value: '100' },
      { value: '1000' },
    ] as Array<{ label?: string; value: FormParameters['threshold'] }>),
  }),
  [BlastFields.matrix]: Object.freeze({
    fieldName: 'matrix',
    type: BlastFieldTypes.select,
    selected: 'auto',
    values: Object.freeze([
      // "auto" will be replaced by the correct matrix value on submission
      // but we need to have a distinc value here to not have 2 <option> with
      // same values
      { label: 'Auto - PAM30', value: 'auto' },
      { value: 'BLOSUM45' },
      { value: 'BLOSUM62' },
      { value: 'BLOSUM80' },
      { value: 'PAM70' },
      { value: 'PAM30' },
    ] as Array<{ label?: string; value: FormParameters['matrix'] | 'auto' }>),
  }),
  [BlastFields.filter]: Object.freeze({
    fieldName: 'filter',
    type: BlastFieldTypes.select,
    selected: 'F',
    values: Object.freeze([
      { value: 'F', label: 'None' },
      { value: 'T', label: 'Filter low complexity regions' },
    ] as Array<{ label?: string; value: FormParameters['filter'] }>),
  }),
  // 'gapalign'
  [BlastFields.gapped]: Object.freeze({
    fieldName: 'gapped',
    type: BlastFieldTypes.select,
    selected: true,
    values: Object.freeze([
      { value: true, label: 'yes' },
      { value: false, label: 'no' },
    ] as Array<{ label?: string; value: FormParameters['gapped'] }>),
  }),
  // Note: this corresponds to BOTH 'alignments' AND 'scores' AT THE SAME TIME!
  [BlastFields.hits]: Object.freeze({
    fieldName: 'hits',
    type: BlastFieldTypes.select,
    selected: 250,
    values: Object.freeze([
      { value: 50 },
      { value: 100 },
      { value: 250 },
      { value: 500 },
      { value: 750 },
      { value: 1000 },
    ] as Array<{ value: FormParameters['hits'] }>),
  }),
  [BlastFields.name]: Object.freeze({
    fieldName: 'name',
    type: BlastFieldTypes.textarea,
  }),
}) as Readonly<BlastFormValues>;
