import { SelectedTaxon } from '../../types/jobsFormData';
import {
  Alignments,
  Database,
  Exp,
  Filter,
  GapAlign,
  HSPs,
  Matrix,
  Program,
  Scores,
  Sequence,
  SType,
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
