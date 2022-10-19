import deepFreeze from 'deep-freeze';

import { Database, Program } from '../types/blastServerParameters';
import { FormParameters } from '../types/blastFormParameters';
import { SelectedTaxon } from '../../types/toolsFormData';
import { Namespace } from '../../../shared/types/namespaces';

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
  hsps = 'HSPs per hit',
  name = 'Name',
}

export type BlastFormValues = Record<BlastFields, Readonly<BlastFormValue>>;

const formData: Readonly<BlastFormValues> = deepFreeze({
  [BlastFields.program]: {
    fieldName: 'program',
    values: [{ value: 'blastp' }, { value: 'blastx' }],
    selected: 'blastp' as Program,
  },
  [BlastFields.stype]: {
    fieldName: 'stype',
    values: [
      { value: 'protein', label: 'Protein' },
      { value: 'dna', label: 'DNA/RNA' },
    ],
    selected: 'protein' as FormParameters['stype'],
  },
  [BlastFields.sequence]: {
    fieldName: 'sequence',
    selected: '',
  },
  [BlastFields.database]: {
    fieldName: 'database',
    selected: 'uniprotkb_refprotswissprot',
    values: [
      {
        value: 'uniprotkb_refprotswissprot',
        label: 'UniProtKB reference proteomes + Swiss-Prot',
      },
      { value: 'uniprotkb', label: 'UniProtKB' },
      { value: 'uniprotkb_pdb', label: 'UniProtKB with 3D structure (PDB)' },
      {
        value: 'afdb',
        label: 'UniProtKB with 3D structure predictions (AlphaFold)',
      },
      {
        value: 'uniprotkb_reference_proteomes',
        label: 'UniProtKB reference proteomes',
      },
      { value: 'uniprotkb_swissprot', label: 'UniProtKB Swiss-Prot' },
      { value: 'uniref100', label: 'UniRef100' },
      { value: 'uniref90', label: 'UniRef90' },
      { value: 'uniref50', label: 'UniRef50' },
      { value: 'uniparc', label: 'UniParc' },
    ],
  },
  [BlastFields.taxons]: {
    fieldName: 'taxIDs',
  },
  [BlastFields.excludedtaxons]: {
    fieldName: 'negativeTaxIDs',
  },
  // 'exp' parameter
  [BlastFields.threshold]: {
    fieldName: 'threshold',
    selected: '10',
    values: [
      { label: '0.0001', value: '1e-4' },
      { label: '0.001', value: '1e-3' },
      { label: '0.01', value: '1e-2' },
      { label: '0.1', value: '1e-1' },
      { label: '1', value: '1.0' },
      { value: '10' },
      { value: '100' },
      { value: '1000' },
    ],
  },
  [BlastFields.matrix]: {
    fieldName: 'matrix',
    selected: 'auto',
    values: [
      // "auto" will be replaced by the correct matrix value on submission
      // but we need to have a distinc value here to not have 2 <option> with
      // same values
      { label: 'Auto - PAM30', value: 'auto' },
      { value: 'BLOSUM45' },
      { value: 'BLOSUM62' },
      { value: 'BLOSUM80' },
      { value: 'PAM70' },
      { value: 'PAM30' },
    ],
  },
  [BlastFields.filter]: {
    fieldName: 'filter',
    selected: 'F',
    values: [
      { value: 'F', label: 'None' },
      { value: 'T', label: 'Filter low complexity regions' },
    ],
  },
  // 'gapalign'
  [BlastFields.gapped]: {
    fieldName: 'gapped',
    selected: true,
    values: [
      { value: true, label: 'yes' },
      { value: false, label: 'no' },
    ],
  },
  // Note: this corresponds to BOTH 'alignments' AND 'scores' AT THE SAME TIME!
  [BlastFields.hits]: {
    fieldName: 'hits',
    selected: 250,
    values: [
      { value: 50 },
      { value: 100 },
      { value: 250 },
      { value: 500 },
      { value: 750 },
      { value: 1000 },
    ],
  },
  [BlastFields.hsps]: {
    fieldName: 'hsps',
    selected: undefined,
    values: [
      { value: undefined, label: 'All' },
      { value: 1 },
      { value: 2 },
      { value: 5 },
      { value: 10 },
      { value: 50 },
      { value: 100 },
    ],
  },
  [BlastFields.name]: {
    fieldName: 'name',
    selected: '',
  },
});

export const excludeTaxonForDB = (db: BlastFormValue['selected']) =>
  typeof db === 'string' && /uni(ref|parc)/i.test(db);

export const databaseToNamespace = (
  database: Database
): Namespace.uniprotkb | Namespace.uniparc | Namespace.uniref | undefined => {
  if (database.startsWith(Namespace.uniprotkb) || database === 'afdb') {
    return Namespace.uniprotkb;
  }
  if (database.startsWith(Namespace.uniparc)) {
    return Namespace.uniparc;
  }
  if (database.startsWith(Namespace.uniref)) {
    return Namespace.uniref;
  }
  return undefined;
};

export default formData;
