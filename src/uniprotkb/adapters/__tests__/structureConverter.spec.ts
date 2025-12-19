import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';
import convertStructure from '../structureConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

describe('Structure data converter', () => {
  it('should convert the data', () => {
    const convertedData = convertStructure(
      modelData,
      databaseInfoMaps,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );

    expect(convertedData).toEqual({
      commentsData: new Map([
        [
          'ALTERNATIVE PRODUCTS',
          [
            {
              commentType: 'ALTERNATIVE PRODUCTS',
              events: ['Alternative initiation'],
              isoforms: [
                {
                  isoformIds: ['isoID1'],
                  isoformSequenceStatus: 'Described',
                  name: {
                    value: 'name',
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                  },
                  note: {
                    texts: [
                      {
                        value: 'value1',
                        evidences: [
                          {
                            evidenceCode: 'ECO:0000255',
                            id: 'PRU10028',
                            source: 'PROSITE-ProRule',
                          },
                        ],
                      },
                    ],
                  },
                  sequenceIds: ['SequenceID'],
                  synonyms: [
                    {
                      value: 'syn value',
                      evidences: [
                        {
                          evidenceCode: 'ECO:0000255',
                          id: 'PRU10028',
                          source: 'PROSITE-ProRule',
                        },
                      ],
                    },
                  ],
                },
              ],
              note: {
                texts: [
                  {
                    value: 'value1',
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000255',
                        id: 'PRU10028',
                        source: 'PROSITE-ProRule',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        ],
      ]),

      featuresData: [],
      isoforms: [
        {
          isoformId: 'isoID1',
          length: 0,
          sequence: '',
        },
      ],
      keywordData: [],
      structures: {},
      xrefData: [
        {
          category: '3DS',
          databases: [
            {
              database: 'ModBase',
              xrefs: [{ database: 'ModBase', implicit: true }],
            },
            {
              database: 'SWISS-MODEL-Workspace',
              xrefs: [
                {
                  database: 'SWISS-MODEL-Workspace',
                  implicit: true,
                  properties: { GeneName: 'some Gene' },
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
