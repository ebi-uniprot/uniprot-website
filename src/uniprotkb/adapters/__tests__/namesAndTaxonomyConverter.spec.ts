import { convertNamesAndTaxonomy } from '../namesAndTaxonomyConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

describe('Names and taxonomy data converter', () => {
  it('should convert the data', () => {
    const convertedData = convertNamesAndTaxonomy(
      modelData,
      databaseInfoMaps,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
    expect(convertedData).toEqual({
      geneNamesData: [
        {
          geneName: {
            value: 'some Gene',
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'PIRNR',
                id: 'PIRNR001360',
              },
            ],
          },
          synonyms: [
            {
              value: 'some Syn',
              evidences: [
                {
                  evidenceCode: 'ECO:0000256',
                  source: 'PIRNR',
                  id: 'PIRNR001361',
                },
              ],
            },
          ],
          orderedLocusNames: [
            {
              value: 'some locus',
              evidences: [
                {
                  evidenceCode: 'ECO:0000256',
                  source: 'PIRNR',
                  id: 'PIRNR001362',
                },
              ],
            },
          ],
          orfNames: [
            {
              value: 'some orf',
              evidences: [
                {
                  evidenceCode: 'ECO:0000269',
                  source: 'PubMed',
                  id: '11389730',
                },
              ],
            },
          ],
        },
      ],
      organismData: {
        commonName: 'common name',
        evidences: [
          {
            evidenceCode: 'ECO:0000256',
            id: 'PIRNR001363',
            source: 'PIRNR',
          },
        ],
        lineage: ['lineage 1'],
        scientificName: 'scientific name',
        synonyms: ['synonyms 1'],
        taxonId: 9606,
      },
      primaryAccession: 'P21802',
      secondaryAccessions: ['P21802'],
      proteinNamesData: {
        allergenName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              id: 'PRU10023',
              source: 'PROSITE-ProRule',
            },
          ],
          value: 'allergen',
        },
        alternativeNames: [
          {
            ecNumbers: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10029',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: '1.2.3.3',
              },
            ],
            fullName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10022',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'a full alt Name',
            },
            shortNames: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10028',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'short alt name1',
              },
            ],
          },
        ],
        biotechName: {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              id: 'PRU10024',
              source: 'PROSITE-ProRule',
            },
          ],
          value: 'biotech',
        },
        cdAntigenNames: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                id: 'PRU10025',
                source: 'PROSITE-ProRule',
              },
            ],
            value: 'cd antigen',
          },
        ],
        contains: [
          {
            allergenName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10023',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'allergen',
            },
            alternativeNames: [
              {
                ecNumbers: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10029',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    value: '1.2.3.3',
                  },
                ],
                fullName: {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000255',
                      id: 'PRU10022',
                      source: 'PROSITE-ProRule',
                    },
                  ],
                  value: 'containsa full alt Name',
                },
                shortNames: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    value: 'containsshort alt name1',
                  },
                ],
              },
            ],
            biotechName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10024',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'biotech',
            },
            cdAntigenNames: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10025',
                    source: 'PROSITE-ProRule',
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
                    id: 'PRU100212',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'inn antigen',
              },
            ],
            recommendedName: {
              ecNumbers: [
                {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000255',
                      id: 'PRU100210',
                      source: 'PROSITE-ProRule',
                    },
                  ],
                  value: '1.2.3.4',
                },
              ],
              fullName: {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10026',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'containsrec full Name',
              },
              shortNames: [
                {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000255',
                      id: 'PRU10020',
                      source: 'PROSITE-ProRule',
                    },
                  ],
                  value: 'containsrecommended short name',
                },
              ],
            },
          },
        ],
        flag: 'Fragment',
        includes: [
          {
            allergenName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10023',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'allergen',
            },
            alternativeNames: [
              {
                ecNumbers: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10029',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    value: '1.2.3.3',
                  },
                ],
                fullName: {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000255',
                      id: 'PRU10022',
                      source: 'PROSITE-ProRule',
                    },
                  ],
                  value: 'includesa full alt Name',
                },
                shortNames: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                    value: 'includesshort alt name1',
                  },
                ],
              },
            ],
            biotechName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10024',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'biotech',
            },
            cdAntigenNames: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10025',
                    source: 'PROSITE-ProRule',
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
                    id: 'PRU100212',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'inn antigen',
              },
            ],
            recommendedName: {
              ecNumbers: [
                {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000255',
                      id: 'PRU100210',
                      source: 'PROSITE-ProRule',
                    },
                  ],
                  value: '1.2.3.4',
                },
              ],
              fullName: {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10026',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'includesrec full Name',
              },
              shortNames: [
                {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000255',
                      id: 'PRU10020',
                      source: 'PROSITE-ProRule',
                    },
                  ],
                  value: 'includesrecommended short name',
                },
              ],
            },
          },
        ],
        innNames: [
          {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                id: 'PRU100212',
                source: 'PROSITE-ProRule',
              },
            ],
            value: 'inn antigen',
          },
        ],
        recommendedName: {
          ecNumbers: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU100210',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: '1.2.3.4',
            },
          ],
          fullName: {
            evidences: [
              {
                evidenceCode: 'ECO:0000255',
                id: 'PRU10026',
                source: 'PROSITE-ProRule',
              },
            ],
            value: 'rec full Name',
          },
          shortNames: [
            {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10020',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'recommended short name',
            },
          ],
        },
        submissionNames: [
          {
            ecNumbers: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU100211',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: '1.2.3.5',
              },
            ],
            fullName: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10027',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'sub full Name',
            },
          },
        ],
      },
      organismHosts: [
        {
          commonName: 'common name',
          scientificName: 'scientific name',
          synonyms: ['synonyms 1'],
          taxonId: 9606,
        },
      ],
      proteomesData: [],
      commentsData: new Map(),
      keywordData: [],
      featuresData: [],
      isoforms: ['name'],
      geneLocations: [
        {
          evidences: [
            {
              evidenceCode: 'ECO:0000255',
              id: 'PRU10025',
              source: 'PROSITE-ProRule',
            },
          ],
          geneEncodingType: 'Cyanelle',
          value: 'geneLocation value',
        },
      ],
      xrefData: [],
    });
  });
});
