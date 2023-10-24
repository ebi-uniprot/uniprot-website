import {
  SType,
  Database,
  Exp,
  Matrix,
  Filter,
  GapAlign,
  Scores,
  Alignments,
  Program,
  Sequence,
  HSPs,
} from './blastServerParameters';
import { SelectedTaxon } from '../../types/toolsFormData';

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
