/* Results as given by the server */

import { Program, SType, Filter, Matrix } from './blastServerParameters';

export type BlastHsp = {
  hsp_num: number;
  hsp_score: number;
  hsp_bit_score: number;
  hsp_expect: number;
  hsp_align_len: number;
  hsp_identity: number;
  hsp_positive: number;
  hsp_gaps: number;
  hsp_query_frame: string;
  hsp_hit_frame: string;
  hsp_strand: string;
  hsp_query_from: number;
  hsp_query_to: number;
  hsp_hit_from: number;
  hsp_hit_to: number;
  hsp_qseq: string;
  hsp_mseq: string;
  hsp_hseq: string;
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
  hit_uni_gn: string;
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
  hits: BlastHit[];
};
