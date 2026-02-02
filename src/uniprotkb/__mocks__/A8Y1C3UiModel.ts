import { type UniProtkbUIModel } from '../adapters/uniProtkbConverter';

const data: UniProtkbUIModel = {
  entryType: 'UniProtKB unreviewed (TrEMBL)',
  primaryAccession: 'A8Y1C3',
  uniProtkbId: 'A8Y1C3_CAEBR',
  entryAudit: {
    firstPublicDate: '2008-01-15',
    lastAnnotationUpdateDate: '2026-01-28',
    lastSequenceUpdateDate: '2008-12-16',
    entryVersion: 73,
    sequenceVersion: 2,
  },
  annotationScore: 1,
  organism: {
    scientificName: 'Caenorhabditis briggsae',
    taxonId: 6238,
    evidences: [
      {
        evidenceCode: 'ECO:0000313',
        source: 'EMBL',
        id: 'CAP38692.2',
      },
      {
        evidenceCode: 'ECO:0000313',
        source: 'Proteomes',
        id: 'UP000008549',
      },
    ],
    lineage: [
      'Eukaryota',
      'Metazoa',
      'Ecdysozoa',
      'Nematoda',
      'Chromadorea',
      'Rhabditida',
      'Rhabditina',
      'Rhabditomorpha',
      'Rhabditoidea',
      'Rhabditidae',
      'Peloderinae',
      'Caenorhabditis',
    ],
  },
  proteinExistence: '4: Predicted',
  proteinDescription: {
    submissionNames: [
      {
        fullName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000313',
              source: 'EMBL',
              id: 'CAP38692.2',
            },
          ],
          value: 'Protein CBG22016',
        },
      },
    ],
  },
  genes: [
    {
      orfNames: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000313',
              source: 'EMBL',
              id: 'CAP38692.2',
            },
            {
              evidenceCode: 'ECO:0000313',
              source: 'WormBase',
              id: 'CBG22016',
            },
          ],
          value: 'CBG22016',
        },
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000313',
              source: 'EMBL',
              id: 'CAP38692.2',
            },
          ],
          value: 'CBG_22016',
        },
      ],
    },
  ],
  features: [
    {
      type: 'Signal',
      location: {
        start: {
          value: 1,
          modifier: 'EXACT',
        },
        end: {
          value: 19,
          modifier: 'EXACT',
        },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'SAM',
          id: 'SignalP',
        },
      ],
    },
    {
      type: 'Chain',
      location: {
        start: {
          value: 20,
          modifier: 'EXACT',
        },
        end: {
          value: 327,
          modifier: 'EXACT',
        },
      },
      description: '',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'SAM',
          id: 'SignalP',
        },
      ],
      featureId: 'PRO_5002734181',
    },
  ],
  keywords: [
    {
      evidences: [
        {
          evidenceCode: 'ECO:0000313',
          source: 'Proteomes',
          id: 'UP000008549',
        },
      ],
      id: 'KW-1185',
      category: 'Technical term',
      name: 'Reference proteome',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'SAM',
          id: 'SignalP',
        },
      ],
      id: 'KW-0732',
      category: 'Domain',
      name: 'Signal',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.5',
            },
            {
              key: 'phmmer_accession',
              value: 'Q09272',
            },
            {
              key: 'phmmer_score',
              value: '136.3',
            },
          ],
        },
      ],
      id: 'KW-0119',
      category: 'Biological process',
      name: 'Carbohydrate metabolism',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.5',
            },
            {
              key: 'tmalign_accession',
              value: 'Q99LL3',
            },
            {
              key: 'tmalign_score_chain_1',
              value: '0.594',
            },
            {
              key: 'tmalign_score_chain_2',
              value: '0.47778',
            },
          ],
        },
      ],
      id: 'KW-0325',
      category: 'PTM',
      name: 'Glycoprotein',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.5',
            },
            {
              key: 'phmmer_accession',
              value: 'Q09272',
            },
            {
              key: 'phmmer_score',
              value: '136.3',
            },
          ],
        },
      ],
      id: 'KW-0333',
      category: 'Cellular component',
      name: 'Golgi apparatus',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.49',
            },
            {
              key: 'phmmer_accession',
              value: 'Q09272',
            },
            {
              key: 'phmmer_score',
              value: '136.3',
            },
          ],
        },
      ],
      id: 'KW-0735',
      category: 'Domain',
      name: 'Signal-anchor',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.49',
            },
            {
              key: 'string_match_text',
              value: 'IPR005331',
            },
            {
              key: 'string_match_location',
              value: 'InterPro',
            },
            {
              key: 'string_match_type',
              value: 'hydrated',
            },
          ],
        },
      ],
      id: 'KW-0808',
      category: 'Molecular function',
      name: 'Transferase',
    },
    {
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.49',
            },
            {
              key: 'phmmer_accession',
              value: 'Q18079',
            },
            {
              key: 'phmmer_score',
              value: '140.2',
            },
          ],
        },
      ],
      id: 'KW-0812',
      category: 'Domain',
      name: 'Transmembrane',
    },
  ],
  references: [
    {
      referenceNumber: 1,
      citation: {
        id: '14624247',
        citationType: 'journal article',
        authors: [
          'Stein L.D.',
          'Bao Z.',
          'Blasiar D.',
          'Blumenthal T.',
          'Brent M.R.',
          'Chen N.',
          'Chinwalla A.',
          'Clarke L.',
          'Clee C.',
          'Coghlan A.',
          'Coulson A.',
          "D'Eustachio P.",
          'Fitch D.H.',
          'Fulton L.A.',
          'Fulton R.E.',
          'Griffiths-Jones S.',
          'Harris T.W.',
          'Hillier L.W.',
          'Kamath R.',
          'Kuwabara P.E.',
          'Mardis E.R.',
          'Marra M.A.',
          'Miner T.L.',
          'Minx P.',
          'Mullikin J.C.',
          'Plumb R.W.',
          'Rogers J.',
          'Schein J.E.',
          'Sohrmann M.',
          'Spieth J.',
          'Stajich J.E.',
          'Wei C.',
          'Willey D.',
          'Wilson R.K.',
          'Durbin R.',
          'Waterston R.H.',
        ],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '14624247',
          },
          {
            database: 'DOI',
            id: '10.1371/journal.pbio.0000045',
          },
        ],
        title:
          'The genome sequence of Caenorhabditis briggsae: a platform for comparative genomics.',
        publicationDate: '2003',
        journal: 'PLoS Biol.',
        firstPage: '166',
        lastPage: '192',
        volume: '1',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000313',
              source: 'EMBL',
              id: 'CAP38692.2',
            },
            {
              evidenceCode: 'ECO:0000313',
              source: 'Proteomes',
              id: 'UP000008549',
            },
          ],
          value: 'AF16',
          type: 'STRAIN',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000313',
          source: 'EMBL',
          id: 'CAP38692.2',
        },
        {
          evidenceCode: 'ECO:0000313',
          source: 'Proteomes',
          id: 'UP000008549',
        },
      ],
    },
    {
      referenceNumber: 2,
      citation: {
        id: 'CI-EMNK80GPV4PKM',
        citationType: 'journal article',
        authors: [
          'Ross J.A.',
          'Koboldt D.C.',
          'Staisch J.E.',
          'Chamberlin H.M.',
          'Gupta B.P.',
          'Miller R.D.',
          'Baird S.E.',
          'Haag E.S.',
        ],
        title:
          'Caenorhabditis briggsae recombinant inbred line genotypes reveal inter-strain incompatibility and the evolution of recombination.',
        publicationDate: '2011',
        journal: 'PLoS Genet.',
        firstPage: 'E1002174',
        lastPage: 'E1002174',
        volume: '7',
      },
      referencePositions: ['NUCLEOTIDE SEQUENCE [LARGE SCALE GENOMIC DNA]'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000313',
              source: 'EMBL',
              id: 'CAP38692.2',
            },
            {
              evidenceCode: 'ECO:0000313',
              source: 'Proteomes',
              id: 'UP000008549',
            },
          ],
          value: 'AF16',
          type: 'STRAIN',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000313',
          source: 'EMBL',
          id: 'CAP38692.2',
        },
        {
          evidenceCode: 'ECO:0000313',
          source: 'Proteomes',
          id: 'UP000008549',
        },
      ],
    },
  ],
  uniProtKBCrossReferences: [
    {
      database: 'EMBL',
      id: 'HE601428',
      properties: [
        {
          key: 'ProteinId',
          value: 'CAP38692.2',
        },
        {
          key: 'Status',
          value: '-',
        },
        {
          key: 'MoleculeType',
          value: 'Genomic_DNA',
        },
      ],
    },
    {
      database: 'RefSeq',
      id: 'XP_002638814.2',
      properties: [
        {
          key: 'NucleotideSequenceId',
          value: 'XM_002638768.2',
        },
      ],
    },
    {
      database: 'AlphaFoldDB',
      id: 'A8Y1C3',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'FunCoup',
      id: 'A8Y1C3',
      properties: [
        {
          key: 'Number of interactors',
          value: '7',
        },
      ],
    },
    {
      database: 'GeneID',
      id: '8580809',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'KEGG',
      id: 'cbr:CBG_22016',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'CTD',
      id: '8580809',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'WormBase',
      id: 'CBG22016',
      properties: [
        {
          key: 'ProteinId',
          value: 'CBP33521',
        },
        {
          key: 'GeneId',
          value: 'WBGene00040662',
        },
        {
          key: 'GeneName',
          value: '-',
        },
      ],
    },
    {
      database: 'eggNOG',
      id: 'KOG0892',
      properties: [
        {
          key: 'ToxonomicScope',
          value: 'Eukaryota',
        },
      ],
    },
    {
      database: 'HOGENOM',
      id: 'CLU_069458_1_0_1',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'InParanoid',
      id: 'A8Y1C3',
      properties: [
        {
          key: 'Description',
          value: '-',
        },
      ],
    },
    {
      database: 'OMA',
      id: 'MERQYAR',
      properties: [
        {
          key: 'Fingerprint',
          value: '-',
        },
      ],
    },
    {
      database: 'Proteomes',
      id: 'UP000008549',
      properties: [
        {
          key: 'Component',
          value: 'Unassembled WGS sequence',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016020',
      properties: [
        {
          key: 'GoTerm',
          value: 'C:membrane',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:InterPro',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0047756',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:chondroitin 4-sulfotransferase activity',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:InterPro',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0050650',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:chondroitin sulfate proteoglycan biosynthetic process',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:InterPro',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:1902884',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:positive regulation of response to oxidative stress',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:InterPro',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR007669',
      properties: [
        {
          key: 'EntryName',
          value: 'Chst-1-like',
        },
      ],
    },
    {
      database: 'InterPro',
      id: 'IPR005331',
      properties: [
        {
          key: 'EntryName',
          value: 'Sulfotransferase',
        },
      ],
    },
    {
      database: 'PANTHER',
      id: 'PTHR22900:SF13',
      properties: [
        {
          key: 'EntryName',
          value: 'CARBOHYDRATE SULFOTRANSFERASE-RELATED',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'PANTHER',
      id: 'PTHR22900',
      properties: [
        {
          key: 'EntryName',
          value: 'PROTEIN CBG14245-RELATED',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'Pfam',
      id: 'PF03567',
      properties: [
        {
          key: 'EntryName',
          value: 'Sulfotransfer_2',
        },
        {
          key: 'MatchStatus',
          value: '1',
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0000139',
      properties: [
        {
          key: 'GoTerm',
          value: 'C:Golgi membrane',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:ProtNLM2',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.61',
            },
            {
              key: 'phmmer_accession',
              value: 'Q09272',
            },
            {
              key: 'phmmer_score',
              value: '136.3',
            },
          ],
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0008146',
      properties: [
        {
          key: 'GoTerm',
          value: 'F:sulfotransferase activity',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:ProtNLM2',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.6',
            },
            {
              key: 'string_match_text',
              value: 'GO:0047756',
            },
            {
              key: 'string_match_location',
              value: 'GO',
            },
            {
              key: 'string_match_type',
              value: 'hydrated',
            },
          ],
        },
      ],
    },
    {
      database: 'GO',
      id: 'GO:0016051',
      properties: [
        {
          key: 'GoTerm',
          value: 'P:carbohydrate biosynthetic process',
        },
        {
          key: 'GoEvidenceType',
          value: 'IEA:ProtNLM2',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0008006',
          source: 'Google',
          id: 'ProtNLM2',
          properties: [
            {
              key: 'model_score',
              value: '0.59',
            },
            {
              key: 'tmalign_accession',
              value: 'Q805E5',
            },
            {
              key: 'tmalign_score_chain_1',
              value: '0.59579',
            },
            {
              key: 'tmalign_score_chain_2',
              value: '0.53728',
            },
          ],
        },
      ],
    },
  ],
  sequence: {
    value:
      'MNRYLKLLFAIIFTACILAYSNLFQFHGYCSYVNSEKQIFENSTSPEFPKNLKLRDKTLENSLEICRGDNLKECIPPLMKYKQLYRTSRPNNLVACVIEKTFSTFLTAIMCFLHDQKAFRESNRTLESDIYGERLCKDKNEFTELKKIEKWQKMSIFAVVRNPVDRFVSGFTDKCLREKVWRKYKSRCASCRTNLTCFVDKMYDRMMKFAKNPYKGIDFDDSHFFPQSWRCEFSSHLVKYQILQLDGPNFTDQILGLLEERGVESDGIQFINASLHYRTPHSTQDSVERATVEETVLNSPYLLRKILQMYYFDFLLFGYRLPDIPVV',
    length: 327,
    molWeight: 38657,
    crc64: '6E897D9038ECA2C9',
    md5: '90CE71E045F4EFF19F8B7543B22C3A6B',
  },
  extraAttributes: {
    countByFeatureType: {
      Signal: 1,
      Chain: 1,
    },
    uniParcId: 'UPI0001840486',
  },
  comments: [
    {
      commentType: 'SUBCELLULAR LOCATION',
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0008006',
                source: 'Google',
                id: 'ProtNLM2',
                properties: [
                  {
                    key: 'model_score',
                    value: '0.64',
                  },
                  {
                    key: 'phmmer_accession',
                    value: 'Q09272',
                  },
                  {
                    key: 'phmmer_score',
                    value: '136.3',
                  },
                ],
              },
            ],
            value: 'Golgi apparatus membrane',
          },
        },
      ],
    },
  ],
} as unknown as UniProtkbUIModel;

// TODO: fix types to avoid casting

export default data;
