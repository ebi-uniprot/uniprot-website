import { type SelectedTaxon } from '../../types/jobsFormData';
import {
  type Alignments,
  type Database,
  type Exp,
  type Filter,
  type GapAlign,
  type HSPs,
  type Matrix,
  type Program,
  type Scores,
  type Sequence,
  type SType,
} from './blastServerParameters';

export type FormParameters = {
  stype: SType;
  program: Extract<Program, 'blastp' | 'blastx'>;
  sequence: Sequence;
  database: Database;
  taxIDs: SelectedTaxon[];
  negativeTaxIDs: SelectedTaxon[];
  threshold: Exp;
  matrix: Matrix;
  filter: Filter;
  gapped: GapAlign;
  hits: Scores | Alignments;
  hsps: HSPs;
};
