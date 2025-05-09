/* eslint-disable camelcase */

import { BlastResults } from '../../../../types/blastResults';

const mock: BlastResults = {
  program: 'blastp',
  version: 'BLASTP 2.9.0+',
  command:
    '/nfs/public/ro/es/appbin/linux-x86_64/ncbi-blast-2.9.0+/bin/blastp -db &quot;uniprotkb&quot; -query ncbiblast-R20200520-172712-0387-63342738-np2.sequence  -num_threads 32 -outfmt 11 -out ncbiblast-R20200520-172712-0387-63342738-np2.archive -seg no -comp_based_stats F',
  query_def: 'EMBOSS_001',
  query_stype: 'protein',
  query_len: 30,
  db_count: 1,
  db_num: 181292975,
  db_len: 61141413123,
  dbs: [
    {
      name: 'uniprotkb',
      stype: 'protein',
      created: '10/04/2020 03:30:00 BST',
    },
  ],
  expect_upper: 10.0,
  filter: 'F',
  gap_extend: 1.0,
  gap_open: 11.0,
  matrix: 'BLOSUM62',
  start: '20/05/2020 17:27:13 BST',
  end: '20/05/2020 17:29:14 BST',
  search: '0:02:01',
  hits: [
    {
      hit_num: 1,
      hit_def:
        'TR:U6MKN0 U6MKN0_9EIME Uncharacterized protein OS=Eimeria necatrix OX=51315 GN=ENH_00046930 PE=4 SV=1',
      hit_db: 'TR',
      hit_id: 'U6MKN0_9EIME',
      hit_acc: 'U6MKN0',
      hit_desc:
        'Uncharacterized protein OS=Eimeria necatrix OX=51315 GN=ENH_00046930 PE=4 SV=1',
      hit_url: 'https://www.uniprot.org/uniprot/U6MKN0',
      hit_uni_de: 'Uncharacterized protein',
      hit_uni_os: 'Eimeria necatrix',
      hit_uni_ox: '51315',
      hit_uni_gn: 'ENH_00046930',
      hit_uni_pe: '4',
      hit_uni_sv: '1',
      hit_len: 486,
      hit_hsps: [
        {
          hsp_num: 1,
          hsp_score: 96,
          hsp_bit_score: 41.5874,
          hsp_expect: 0.0048,
          hsp_align_len: 28,
          hsp_identity: 7.1,
          hsp_positive: 7.1,
          hsp_gaps: 0,
          hsp_query_frame: '0',
          hsp_hit_frame: '0',
          hsp_strand: 'none/none',
          hsp_query_from: 3,
          hsp_query_to: 30,
          hsp_hit_from: 418,
          hsp_hit_to: 445,
          hsp_qseq: 'UIYUOIUIOUUITYIOUUOPUOUOIUOU',
          hsp_mseq: 'Y          Y',
          hsp_hseq: 'CCYCCCCCYCCCCYCCCCCYCCCCCCCC',
        },
        {
          hsp_num: 2,
          hsp_score: 90,
          hsp_bit_score: 39.5874,
          hsp_expect: 0.0048,
          hsp_align_len: 28,
          hsp_identity: 7.1,
          hsp_positive: 7.1,
          hsp_gaps: 0,
          hsp_query_frame: '0',
          hsp_hit_frame: '0',
          hsp_strand: 'none/none',
          hsp_query_from: 3,
          hsp_query_to: 30,
          hsp_hit_from: 418,
          hsp_hit_to: 445,
          hsp_qseq: 'UIYUOIUIOUUITYIOUUOPUOUOIUOU',
          hsp_mseq: 'Y          Y',
          hsp_hseq: 'CCYCCCCCYCCCCYCCCCCYCCCCCCCC',
        },
      ],
    },
  ],
};

export default mock;
