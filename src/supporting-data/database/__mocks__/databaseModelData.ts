import { type SearchResults } from '../../../shared/types/results';
import { type DatabaseAPIModel } from '../adapters/databaseConverter';

// Source: database/search?query=embl&size=2
// Retrieved: 2025-10-15
const mock: SearchResults<DatabaseAPIModel> = {
  results: [
    {
      name: 'EMBL nucleotide sequence database',
      id: 'DB-0022',
      abbrev: 'EMBL',
      pubMedId: '33175160',
      doiId: '10.1093/nar/gkaa1028',
      linkType: 'Explicit',
      servers: ['https://www.ebi.ac.uk/ena/browser/home'],
      dbUrl: 'https://www.ebi.ac.uk/ena/browser/view/%s',
      category: 'Sequence databases',
      statistics: {
        reviewedProteinCount: 560693,
        unreviewedProteinCount: 182383424,
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
        reviewedProteinCount: 18453,
        unreviewedProteinCount: 720,
      },
    },
  ],
};

export default mock.results;
