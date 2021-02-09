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
} from './blastServerParameters';
import { SelectedTaxon } from '../config/BlastFormData';

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
};
