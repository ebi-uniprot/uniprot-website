/* eslint-disable camelcase */

import { BlastResults } from '../../../../types/blastResults';

const mock: BlastResults = {
  program: 'blastp',
  version: 'BLASTP 2.9.0+',
  command:
    '/nfs/public/ro/es/appbin/linux-x86_64/ncbi-blast-2.9.0+/bin/blastp -db &quot;uniprotkb&quot; -query ncbiblast-R20200521-084424-0797-51386432-np2.sequence  -num_threads 32 -outfmt 11 -out ncbiblast-R20200521-084424-0797-51386432-np2.archive -seg no -comp_based_stats F',
  query_def: 'EMBOSS_001',
  query_stype: 'protein',
  query_len: 6,
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
  start: '21/05/2020 08:44:25 BST',
  end: '21/05/2020 08:45:25 BST',
  search: '0:01:00',
  hits: [],
};

export default mock;
