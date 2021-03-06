import { ProteomesAPIModel } from '../adapters/proteomesConverter';

const mock: ProteomesAPIModel = {
  id: 'UP000005640',
  description: 'about some proteome',
  taxonomy: {
    scientificName: 'Homo sapiens',
    commonName: 'Human',
    synonyms: ['synonym'],
    taxonId: 9606,
    mnemonic: 'HUMAN',
  },
  modified: '2015-11-05',
  proteomeType: 'Redundant proteome',
  redundantTo: 'UP000005650',
  strain: 'some Strain',
  isolate: 'isolate value',
  components: [
    {
      name: 'name',
      description: 'description',
      proteinCount: 18,
      genomeAnnotation: {
        source: 'source value',
        url: 'URL value',
      },
      proteomeCrossReferences: [
        {
          database: 'GenomeAssembly',
          id: 'ADFDA121',
        },
      ],
    },
  ],
  citations: [
    {
      citationType: 'journal article',
      authoringGroup: ['auth group'],
      authors: ['author Leo'],
      citationCrossReferences: [
        {
          database: 'PubMed',
          id: 'somepID1',
        },
      ],
      title: 'Leo book tittle',
      publicationDate: 'date value',
      journal: 'journal name',
      firstPage: 'first page',
      lastPage: 'last page',
      volume: 'volume value',
    },
    {
      citationType: 'submission',
      authoringGroup: ['auth group'],
      authors: ['author Leo'],
      citationCrossReferences: [
        {
          database: 'PubMed',
          id: 'somepID1',
        },
      ],
      title: 'Leo book tittle',
      publicationDate: 'date value',
      submissionDatabase: 'PIR data bank',
    },
  ],
  redundantProteomes: [
    {
      id: 'UP000005648',
      similarity: 10.0,
    },
  ],
  panproteome: 'UP000005649',
  annotationScore: 20,
  superkingdom: 'eukaryota',
  proteomeCompletenessReport: {
    buscoReport: {
      complete: 80,
      completeSingle: 8,
      completeDuplicated: 12,
      fragmented: 18,
      missing: 20,
      total: 103,
      lineageDb: 'lineageDb value',
      score: 95,
    },
    cpdReport: {
      proteomeCount: 15,
      stdCdss: 13.0,
      averageCdss: 8,
      confidence: 10,
      status: 'Standard',
    },
  },
  genomeAssembly: {
    assemblyId: 'id value',
    genomeAssemblyUrl: 'url value',
    level: 'full',
    source: 'EnsemblMetazoa',
  },
  geneCount: 28,
  proteinCount: 18,
  genomeAnnotation: {
    source: 'source value',
    url: 'URL value',
  },
  taxonLineage: [
    {
      scientificName: 'Homo sapiens',
      commonName: 'Human',
      synonyms: ['synonym'],
      taxonId: 9606,
      rank: 'family',
      hidden: true,
    },
  ],
};

export default mock;
