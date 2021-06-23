import { UniProtkbAPIModel } from '../adapters/uniProtkbConverter';

// NOTE: citation IDs are identical in the original backend mock, since they
// would trigger react key warning I've manually changed them here
// NOTE: modified the UniProtKB ID to be "more" valid (no whitespace)
const mock: UniProtkbAPIModel = {
  entryType: 'UniProtKB reviewed (Swiss-Prot)',
  primaryAccession: 'P21802',
  secondaryAccessions: ['P21802'],
  uniProtkbId: 'uniprot_id',
  entryAudit: {
    firstPublicDate: '2015-08-02',
    lastAnnotationUpdateDate: '2016-04-24',
    lastSequenceUpdateDate: '2017-01-21',
    entryVersion: 20,
    sequenceVersion: 5,
  },
  annotationScore: 2.0,
  organism: {
    scientificName: 'scientific name',
    commonName: 'common name',
    synonyms: ['synonyms 1'],
    taxonId: 9606,
    evidences: [
      {
        evidenceCode: 'ECO:0000256',
        source: 'PIRNR',
        id: 'PIRNR001363',
      },
    ],
    lineage: ['lineage 1'],
  },
  organismHosts: [
    {
      scientificName: 'scientific name',
      commonName: 'common name',
      synonyms: ['synonyms 1'],
      taxonId: 9606,
    },
  ],
  proteinExistence: '1: Evidence at protein level',
  proteinDescription: {
    recommendedName: {
      fullName: {
        evidences: [
          {
            evidenceCode: 'ECO:0000255',
            source: 'PROSITE-ProRule',
            id: 'PRU10026',
          },
        ],
        value: 'rec full Name',
      },
      shortNames: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU10020',
            },
          ],
          value: 'recommended short name',
        },
      ],
      ecNumbers: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU100210',
            },
          ],
          value: '1.2.3.4',
        },
      ],
    },
    alternativeNames: [
      {
        fullName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU10022',
            },
          ],
          value: 'a full alt Name',
        },
        shortNames: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
            value: 'short alt name1',
          },
        ],
        ecNumbers: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10029',
              },
            ],
            value: '1.2.3.3',
          },
        ],
      },
    ],
    allergenName: {
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU10023',
        },
      ],
      value: 'allergen',
    },
    biotechName: {
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU10024',
        },
      ],
      value: 'biotech',
    },
    cdAntigenNames: [
      {
        evidences: [
          {
            evidenceCode: 'ECO:0000255',
            source: 'PROSITE-ProRule',
            id: 'PRU10025',
          },
        ],
        value: 'cd antigen',
      },
    ],
    innNames: [
      {
        evidences: [
          {
            evidenceCode: 'ECO:0000255',
            source: 'PROSITE-ProRule',
            id: 'PRU100212',
          },
        ],
        value: 'inn antigen',
      },
    ],
    submissionNames: [
      {
        fullName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU10027',
            },
          ],
          value: 'sub full Name',
        },
        ecNumbers: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU100211',
              },
            ],
            value: '1.2.3.5',
          },
        ],
      },
    ],
    includes: [
      {
        recommendedName: {
          fullName: {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10026',
              },
            ],
            value: 'includesrec full Name',
          },
          shortNames: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10020',
                },
              ],
              value: 'includesrecommended short name',
            },
          ],
          ecNumbers: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU100210',
                },
              ],
              value: '1.2.3.4',
            },
          ],
        },
        alternativeNames: [
          {
            fullName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10022',
                },
              ],
              value: 'includesa full alt Name',
            },
            shortNames: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU10028',
                  },
                ],
                value: 'includesshort alt name1',
              },
            ],
            ecNumbers: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU10029',
                  },
                ],
                value: '1.2.3.3',
              },
            ],
          },
        ],
        allergenName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU10023',
            },
          ],
          value: 'allergen',
        },
        biotechName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU10024',
            },
          ],
          value: 'biotech',
        },
        cdAntigenNames: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10025',
              },
            ],
            value: 'cd antigen',
          },
        ],
        innNames: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU100212',
              },
            ],
            value: 'inn antigen',
          },
        ],
      },
    ],
    contains: [
      {
        recommendedName: {
          fullName: {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10026',
              },
            ],
            value: 'containsrec full Name',
          },
          shortNames: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10020',
                },
              ],
              value: 'containsrecommended short name',
            },
          ],
          ecNumbers: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU100210',
                },
              ],
              value: '1.2.3.4',
            },
          ],
        },
        alternativeNames: [
          {
            fullName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10022',
                },
              ],
              value: 'containsa full alt Name',
            },
            shortNames: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU10028',
                  },
                ],
                value: 'containsshort alt name1',
              },
            ],
            ecNumbers: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU10029',
                  },
                ],
                value: '1.2.3.3',
              },
            ],
          },
        ],
        allergenName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU10023',
            },
          ],
          value: 'allergen',
        },
        biotechName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              source: 'PROSITE-ProRule',
              id: 'PRU10024',
            },
          ],
          value: 'biotech',
        },
        cdAntigenNames: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10025',
              },
            ],
            value: 'cd antigen',
          },
        ],
        innNames: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU100212',
              },
            ],
            value: 'inn antigen',
          },
        ],
      },
    ],
    flag: 'Fragment',
  },
  genes: [
    {
      geneName: {
        evidences: [
          {
            evidenceCode: 'ECO:0000256',
            source: 'PIRNR',
            id: 'PIRNR001360',
          },
        ],
        value: 'some Gene',
      },
      synonyms: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              source: 'PIRNR',
              id: 'PIRNR001361',
            },
          ],
          value: 'some Syn',
        },
      ],
      orderedLocusNames: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              source: 'PIRNR',
              id: 'PIRNR001362',
            },
          ],
          value: 'some locus',
        },
      ],
      orfNames: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11389730',
            },
          ],
          value: 'some orf',
        },
      ],
    },
  ],
  comments: [
    {
      commentType: 'ALTERNATIVE PRODUCTS',
      events: ['Alternative initiation'],
      isoforms: [
        {
          name: {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
            value: 'name',
          },
          synonyms: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10028',
                },
              ],
              value: 'syn value',
            },
          ],
          note: {
            texts: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    source: 'PROSITE-ProRule',
                    id: 'PRU10028',
                  },
                ],
                value: 'value1',
              },
            ],
          },
          isoformIds: ['isoID1'],
          sequenceIds: ['SequenceID'],
          isoformSequenceStatus: 'Described',
        },
      ],
      note: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
            value: 'value1',
          },
        ],
      },
    },
    {
      commentType: 'BIOPHYSICOCHEMICAL PROPERTIES',
      molecule: 'Isoform 3',
      absorption: {
        max: 10,
        approximate: true,
        note: {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10028',
                },
              ],
              value: 'value1',
            },
          ],
        },
        evidences: [
          {
            evidenceCode: 'ECO:0000255',
            source: 'PROSITE-ProRule',
            id: 'PRU10028',
          },
        ],
      },
      kineticParameters: {
        maximumVelocities: [
          {
            velocity: 1.0,
            unit: 'unit1',
            enzyme: 'enzyme1',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
          },
        ],
        michaelisConstants: [
          {
            constant: 2.0999999046325684,
            unit: 'uM',
            substrate: 'sub1',
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
          },
        ],
        note: {
          texts: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  source: 'PROSITE-ProRule',
                  id: 'PRU10028',
                },
              ],
              value: 'value1',
            },
          ],
        },
      },
      phDependence: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
            value: 'value1',
          },
        ],
      },
      redoxPotential: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
            value: 'value1',
          },
        ],
      },
      temperatureDependence: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                source: 'PROSITE-ProRule',
                id: 'PRU10028',
              },
            ],
            value: 'value1',
          },
        ],
      },
    },
    {
      commentType: 'CATALYTIC ACTIVITY',
      molecule: 'Isoform 3',
      reaction: {
        name: 'some reaction',
        reactionCrossReferences: [
          {
            database: 'ChEBI',
            id: 'ChEBI:3243',
          },
        ],
        ecNumber: '1.2.4.5',
        evidences: [
          {
            evidenceCode: 'ECO:0000256',
            source: 'PIRNR',
            id: 'PIRNR001361',
          },
        ],
      },
      physiologicalReactions: [
        {
          directionType: 'right-to-left',
          reactionCrossReference: {
            database: 'Rhea',
            id: 'RHEA:313',
          },
          evidences: [
            {
              evidenceCode: 'ECO:0000313',
              source: 'Ensembl',
              id: 'ENSP0001324',
            },
          ],
        },
      ],
    },
    {
      commentType: 'COFACTOR',
      molecule: 'molecule',
      cofactors: [
        {
          name: 'Cofactor Name',
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              source: 'PIRNR',
              id: 'PIRNR001361',
            },
          ],
          cofactorCrossReference: {
            database: 'ChEBI',
            id: 'CHEBI:314',
          },
        },
      ],
      note: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'PIRNR',
                id: 'PIRNR001361',
              },
            ],
            value: 'value2',
          },
        ],
      },
    },
    {
      commentType: 'DISEASE',
      molecule: 'Isoform 3',
      disease: {
        diseaseId: 'DiseaseEntry Id',
        diseaseAccession: 'DiseaseEntry AC',
        acronym: 'someAcron',
        description: 'some description',
        diseaseCrossReference: {
          database: 'MIM',
          id: '3124',
        },
        evidences: [
          {
            evidenceCode: 'ECO:0000256',
            source: 'PIRNR',
            id: 'PIRNR001362',
          },
        ],
      },
      note: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'PIRNR',
                id: 'PIRNR001362',
              },
            ],
            value: 'value2',
          },
        ],
      },
    },
    {
      texts: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              source: 'PIRNR',
              id: 'PIRNR001360',
            },
          ],
          value: 'value',
        },
      ],
      commentType: 'DISRUPTION PHENOTYPE',
      molecule: 'Isoform 4',
    },
    {
      texts: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              source: 'PIRNR',
              id: 'PIRNR001365',
            },
          ],
          value: 'value',
        },
      ],
      commentType: 'DISRUPTION PHENOTYPE',
      molecule: 'Isoform 4 dfs',
    },
    {
      commentType: 'INTERACTION',
      interactions: [
        {
          interactantOne: {
            uniProtKBAccession: 'P12345',
            geneName: 'gen',
            chainId: 'PROC_12344',
            intActId: 'EBI-0001',
          },
          interactantTwo: {
            uniProtKBAccession: 'P12345-1',
            geneName: 'gene1',
            chainId: 'PROC_12347',
            intActId: 'EBI-0002',
          },
          numberOfExperiments: 3,
          organismDiffer: true,
        },
        {
          interactantOne: {
            uniProtKBAccession: 'P12345',
            geneName: 'gen',
            chainId: 'PROC_12345',
            intActId: 'EBI-00011',
          },
          interactantTwo: {
            uniProtKBAccession: 'P12346',
            geneName: 'gene1',
            chainId: 'PROC_123454',
            intActId: 'EBI-00012',
          },
          numberOfExperiments: 6,
          organismDiffer: true,
        },
      ],
    },
    {
      commentType: 'MASS SPECTROMETRY',
      molecule: 'isoform 1',
      method: 'LSI',
      molWeight: 2.1,
      molWeightError: 1.2,
      note: 'note value',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'PIRNR',
          id: 'PIRNR001361',
        },
      ],
    },
    {
      commentType: 'RNA EDITING',
      molecule: 'Isoform 2',
      locationType: 'Known',
      positions: [
        {
          // NOTE: from backend mock, overriding to make it a number
          // position: 'rna position',
          position: 1,
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              source: 'PIRNR',
              id: 'PIRNR001361',
            },
          ],
        },
      ],
      note: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'PIRNR',
                id: 'PIRNR001361',
              },
            ],
            value: 'value',
          },
        ],
      },
    },
    {
      commentType: 'SEQUENCE CAUTION',
      molecule: 'Isoform 2',
      sequenceCautionType: 'Erroneous gene model prediction',
      sequence: 'sequence',
      note: 'Text note',
      evidences: [
        {
          evidenceCode: 'ECO:0000256',
          source: 'PIRNR',
          id: 'PIRNR001361',
        },
      ],
    },
    {
      commentType: 'SUBCELLULAR LOCATION',
      molecule: 'molecule value',
      note: {
        texts: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'PIRNR',
                id: 'PIRNR001361',
              },
            ],
            value: 'value',
          },
        ],
      },
      subcellularLocations: [
        {
          location: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'PIRNR',
                id: 'PIRNR001361',
              },
            ],
            value: 'location value',
            id: 'id1',
          },
          topology: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'PIRNR',
                id: 'PIRNR001361',
              },
            ],
            value: 'topology value',
            id: 'id2',
          },
          orientation: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'PIRNR',
                id: 'PIRNR001361',
              },
            ],
            value: 'orientation value',
            id: 'id2',
          },
        },
      ],
    },
    {
      commentType: 'WEB RESOURCE',
      molecule: 'Isoform 2',
      resourceName: 'resource name',
      resourceUrl: 'resource URL',
      ftp: true,
      note: 'Note text',
    },
  ],
  features: [
    {
      type: 'Chain',
      location: {
        start: {
          value: 2,
          modifier: 'EXACT',
        },
        end: {
          value: 8,
          modifier: 'EXACT',
        },
        sequence: 'sequence 1',
      },
      description: 'description value 123',
      featureCrossReference: {
        database: 'dbSNP',
        id: 'db id',
      },
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
      featureId: 'id value CHAIN',
      alternativeSequence: {
        originalSequence: 'original value',
        alternativeSequences: ['alternative value'],
      },
    },
  ],
  geneLocations: [
    {
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU10025',
        },
      ],
      value: 'geneLocation value',
      geneEncodingType: 'Cyanelle',
    },
  ],
  keywords: [
    {
      evidences: [
        {
          evidenceCode: 'ECO:0000255',
          source: 'PROSITE-ProRule',
          id: 'PRU10025',
        },
      ],
      id: 'KW-11111',
      category: 'Domain',
      name: 'keyword value',
    },
  ],
  references: [
    {
      citation: {
        id: '12345',
        citationType: 'book',
        authoringGroup: ['auth group'],
        authors: ['author Leo'],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '12345',
          },
          {
            database: 'DOI',
            id: 'doiId',
          },
        ],
        title: 'Leo book tittle',
        publicationDate: 'date value',
        bookName: 'book Name',
        editors: ['editor Leo'],
        firstPage: 'first page',
        lastPage: 'last page',
        volume: 'book volume',
        publisher: 'the publisher',
        address: 'address value',
      },
      referencePositions: ['position 1'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11389730',
            },
          ],
          value: 'reference comment value',
          type: 'PLASMID',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
    },
    {
      citation: {
        id: '12346',
        citationType: 'online journal article',
        authoringGroup: ['auth group'],
        authors: ['author Leo'],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '12346',
          },
          {
            database: 'DOI',
            id: 'doiId',
          },
        ],
        title: 'Leo book tittle',
        publicationDate: 'date value',
        journal: 'journal name',
        locator: 'locator value',
      },
      referencePositions: ['position 1'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11389730',
            },
          ],
          value: 'reference comment value',
          type: 'PLASMID',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
    },
    {
      citation: {
        id: '12347',
        citationType: 'journal article',
        authoringGroup: ['auth group'],
        authors: ['author Leo'],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '12347',
          },
          {
            database: 'DOI',
            id: 'doiId',
          },
        ],
        title: 'Leo book tittle',
        publicationDate: 'date value',
        journal: 'journal name',
        firstPage: 'first page',
        lastPage: 'last page',
        volume: 'volume value',
      },
      referencePositions: ['position 1'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11389730',
            },
          ],
          value: 'reference comment value',
          type: 'PLASMID',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
    },
    {
      citation: {
        id: '12348',
        citationType: 'patent',
        authoringGroup: ['auth group'],
        authors: ['author Leo'],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '12348',
          },
          {
            database: 'DOI',
            id: 'doiId',
          },
        ],
        title: 'Leo book tittle',
        publicationDate: 'date value',
        patentNumber: 'patent number',
      },
      referencePositions: ['position 1'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11389730',
            },
          ],
          value: 'reference comment value',
          type: 'PLASMID',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
    },
    {
      citation: {
        id: '12349',
        citationType: 'submission',
        authoringGroup: ['auth group'],
        authors: ['author Leo'],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '12349',
          },
          {
            database: 'DOI',
            id: 'doiId',
          },
        ],
        title: 'Leo book tittle',
        publicationDate: 'date value',
        submissionDatabase: 'PIR data bank',
      },
      referencePositions: ['position 1'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11389730',
            },
          ],
          value: 'reference comment value',
          type: 'PLASMID',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
    },
    {
      citation: {
        id: '12340',
        citationType: 'thesis',
        authoringGroup: ['auth group'],
        authors: ['author Leo'],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '12340',
          },
          {
            database: 'DOI',
            id: 'doiId',
          },
        ],
        title: 'Leo book tittle',
        publicationDate: 'date value',
        institute: 'thesis institute',
        address: 'thesis address',
      },
      referencePositions: ['position 1'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11389730',
            },
          ],
          value: 'reference comment value',
          type: 'PLASMID',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
    },
    {
      citation: {
        id: '12341',
        citationType: 'unpublished observations',
        authoringGroup: ['auth group'],
        authors: ['author Leo'],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '12341',
          },
          {
            database: 'DOI',
            id: 'doiId',
          },
        ],
        title: 'Leo book tittle',
        publicationDate: 'date value',
      },
      referencePositions: ['position 1'],
      referenceComments: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000269',
              source: 'PubMed',
              id: '11389730',
            },
          ],
          value: 'reference comment value',
          type: 'PLASMID',
        },
      ],
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
    },
  ],
  uniProtKBCrossReferences: [
    {
      database: 'Ensembl',
      id: 'idEnsembl',
      properties: [
        {
          key: 'ProteinId',
          value: 'description value',
        },
        {
          key: 'Method',
          value: 'Model',
        },
      ],
      isoformId: 'Q9NXB0-1',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          source: 'PubMed',
          id: '11389730',
        },
      ],
    },
  ],
  sequence: {
    value: 'SAPSQDFMRF',
    length: 10,
    molWeight: 1185,
    crc64: '3997D999CAB6C5A7',
    md5: 'B1D4A86C222D0ED5500ABE909DD36218',
  },
  internalSection: {
    internalLines: [
      {
        value: 'line value',
        type: 'DR',
      },
    ],
    evidenceLines: [
      {
        evidence: 'evidence value',
        createDate: '2018-12-25',
        curator: 'curator value',
      },
    ],
    sourceLines: [
      {
        value: 'source line value',
      },
    ],
  },
  lineages: [
    {
      scientificName: 'Scientific Name',
      commonName: 'Common Name',
      synonyms: ['synonym'],
      taxonId: 9606,
      rank: 'family',
      hidden: true,
    },
  ],
  extraAttributes: {
    countByCommentType: {
      'ALTERNATIVE PRODUCTS': 1,
      'BIOPHYSICOCHEMICAL PROPERTIES': 1,
      'CATALYTIC ACTIVITY': 1,
      COFACTOR: 1,
      DISEASE: 1,
      'DISRUPTION PHENOTYPE': 2,
      INTERACTION: 2,
      'MASS SPECTROMETRY': 1,
      'RNA EDITING': 1,
      'SEQUENCE CAUTION': 1,
      'SUBCELLULAR LOCATION': 1,
      'WEB RESOURCE': 1,
    },
    countByFeatureType: {
      Chain: 1,
    },
  },
};

export default mock;
