/* eslint-disable camelcase */
/* Results as given by the server */

import { EnrichedBlastHit } from '../components/results/BlastResult';
import { Program, SType, Filter, Matrix } from './blastServerParameters';

// Definitions taken from https://www.ncbi.nlm.nih.gov/data_specs/dtd/NCBI_BlastOutput2.mod.dtd
export type BlastHsp = {
  hsp_num: number; // HSP (High-scoring Segment Pair) number (integer)
  hsp_score: number; // score of HSP (real)
  hsp_bit_score: number; // score (in bits) of HSP (real)
  hsp_expect: number; // expectation (real)
  hsp_align_len: number; // length of the alignment used (integer)
  hsp_identity: number; // number of identities in HSP (integer)
  hsp_positive: number; // number of positives in HSP (integer)
  hsp_gaps: number; // number of gaps in HSP (integer)
  hsp_query_frame: string; // translation frame of query (integer)
  hsp_hit_frame: string; // translation frame of subject (integer)
  hsp_strand: string; // strand of query (used for blastn jobs)
  hsp_query_from: number; // start of HSP in query (integer)
  hsp_query_to: number; // end of HSP (integer)
  hsp_hit_from: number; // start of HSP in subject (integer)
  hsp_hit_to: number; // end of HSP in subject (integer)
  hsp_qseq: string; // alignment string for the query (with gaps) (PCDATA)
  hsp_mseq: string; // (assuming this is the hsp_midline in NCBI) formating middle line (PCDATA)
  hsp_hseq: string; // alignment string for subject (=hit) (with gaps) (PCDATA)
};

export type BlastHit = {
  hit_num: number;
  hit_def: string;
  hit_db: string;
  hit_id: string;
  hit_acc: string;
  hit_desc: string;
  hit_url: string;
  hit_uni_de: string;
  hit_uni_os: string;
  hit_uni_ox: string;
  hit_uni_gn?: string;
  hit_uni_pe: string;
  hit_uni_sv: string;
  hit_len: number;
  hit_hsps: BlastHsp[];
};

export type DB = {
  name: string;
  stype: SType;
  created: string;
};

export type BlastResults = {
  program: Program;
  version: string;
  command: string;
  query_def: string;
  query_stype: SType;
  query_len: number;
  db_count: number;
  db_num: number;
  db_len: number;
  dbs: DB[];
  expect_upper: number;
  filter: Filter;
  gap_extend: number;
  gap_open: number;
  matrix: Matrix;
  start: string; // date, job start
  end: string; // date, job completion
  search: string; // duration, job duration
  hits: EnrichedBlastHit[];
};

export enum BlastFacet {
  IDENTITY = 'identity',
  SCORE = 'score',
  EVALUE = 'evalue',
}
