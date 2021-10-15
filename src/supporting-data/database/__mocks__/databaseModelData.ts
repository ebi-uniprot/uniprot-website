import { DatabaseAPIModel } from '../adapters/databaseConverter';

// Source: /api/database/search?query=embl&size=2
// Retrieved: 2021-10-15
const mock: DatabaseAPIModel[] = [
  {
    name: 'EMBL nucleotide sequence database',
    id: 'DB-0022',
    abbrev: 'EMBL',
    pubMedId: '33175160',
    doiId: '10.1093/nar/gkaa1028',
    linkType: 'Explicit',
    server: 'https://www.ebi.ac.uk/ena',
    dbUrl: 'https://www.ebi.ac.uk/ena/browser/view/%s',
    category: 'Sequence databases',
    statistics: {
      reviewedProteinCount: 553525,
      unreviewedProteinCount: 214958439,
    },
  },
  {
    name: 'ChEMBL database of bioactive drug-like small molecules',
    id: 'DB-0174',
    abbrev: 'ChEMBL',
    pubMedId: '21948594',
    doiId: '10.1093/nar/gkr777',
    linkType: 'Explicit',
    server: 'https://www.ebi.ac.uk/chembldb',
    dbUrl: 'https://www.ebi.ac.uk/chembldb/target/inspect/%s',
    category: 'Chemistry databases',
    statistics: {
      reviewedProteinCount: 8251,
      unreviewedProteinCount: 1146,
    },
  },
];

export default mock;
