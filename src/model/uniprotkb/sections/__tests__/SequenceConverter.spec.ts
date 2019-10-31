import { convertSequence } from '../SequenceConverter';
import modelData from '../../../__mocks__/modelData.json';

describe('Sequence data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertSequence(modelData);
    expect(convertedData).toEqual({
      alternativeProducts: {
        commentType: 'ALTERNATIVE PRODUCTS',
        events: ['Alternative initiation'],
        isoforms: [
          {
            isoformIds: ['isoID1'],
            isoformSequenceStatus: 'Described',
            name: {
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10028',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'name',
            },
            note: {
              texts: [
                {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000255',
                      id: 'PRU10028',
                      source: 'PROSITE-ProRule',
                    },
                  ],
                  value: 'value1',
                },
              ],
            },
            sequenceIds: ['SequenceID'],
            synonyms: [
              {
                evidences: [
                  {
                    evidenceCode: 'ECO:0000255',
                    id: 'PRU10028',
                    source: 'PROSITE-ProRule',
                  },
                ],
                value: 'syn value',
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
                  id: 'PRU10028',
                  source: 'PROSITE-ProRule',
                },
              ],
              value: 'value1',
            },
          ],
        },
      },
      sequenceCaution: [
        {
          commentType: 'SEQUENCE CAUTION',
          evidences: [
            {
              evidenceCode: 'ECO:0000256',
              id: 'PIRNR001361',
              source: 'PIRNR',
            },
          ],
          note: 'Text note',
          positions: ['position'],
          sequence: 'sequence',
          sequenceCautionType: 'Erroneous initiation',
        },
      ],
      featuresData: [],
      keywordData: [],
      lastUpdateDate: '2017-01-21 v5',
      processing: undefined,
      sequence: {
        crc64: '3997D999CAB6C5A7',
        length: 10,
        md5: 'B1D4A86C222D0ED5500ABE909DD36218',
        molWeight: 1185,
        value: 'SAPSQDFMRF',
      },
      status: 'Fragment',
      xrefData: [
        {
          category: 'GMA',
          databases: [
            {
              database: 'Ensembl',
              xrefs: [
                {
                  databaseType: 'Ensembl',
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000269',
                      id: '11389730',
                      source: 'PubMed',
                    },
                  ],
                  id: 'id value',
                  isoformId: 'Q9NXB0-1',
                  properties: [
                    { key: 'ProteinId', value: 'description value' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
