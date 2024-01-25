import { DatabaseAPIModel } from '../adapters/databaseConverter';

// Source: /api/database/search?query=embl&size=2
// Retrieved: 2024-01-23
const mock: DatabaseAPIModel[] = [
  {
    name: 'EMBL nucleotide sequence database',
    id: 'DB-0022',
    abbrev: 'EMBL',
    pubMedId: '33175160',
    doiId: '10.1093/nar/gkaa1028',
    linkType: 'Explicit',
    servers: ['https://www.ebi.ac.uk/ena'],
    dbUrl: 'https://www.ebi.ac.uk/ena/browser/view/%s',
    category: 'Sequence databases',
    statistics: {
      reviewedProteinCount: 558056,
      unreviewedProteinCount: 234508615,
    },
  },
  {
    name: 'Matched Annotation from NCBI and EMBL-EBI (MANE) - Phase one',
    id: 'DB-0261',
    abbrev: 'MANE-Select',
    pubMedId: '35388217',
    doiId: '10.1038/s41586-022-04558-8',
    linkType: 'Explicit',
    servers: [
      'https://www.ensembl.org/info/genome/genebuild/mane.html',
      'https://www.ncbi.nlm.nih.gov/refseq/MANE/',
    ],
    dbUrl: 'https://www.ensembl.org/id/%s',
    category: 'Genome annotation databases',
    statistics: {
      reviewedProteinCount: 18310,
      unreviewedProteinCount: 765,
    },
  },
];

export default mock;
