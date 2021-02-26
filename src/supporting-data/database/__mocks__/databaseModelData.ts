import { DatabaseAPIModel } from '../adapters/databaseConverter';

// Data from /api/database/search?query=embl&size=2
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
    reviewedProteinCount: 552048,
    unreviewedProteinCount: 198116519,
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
    reviewedProteinCount: 7663,
    unreviewedProteinCount: 1075,
  },
];

export default mock;
