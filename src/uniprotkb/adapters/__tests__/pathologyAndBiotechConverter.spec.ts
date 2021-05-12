import diseaseAndDrugs from '../diseaseAndDrugs';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/entryModelData';

describe('Disease and Drugs data converter', () => {
  test('should convert the data', () => {
    const convertedData = diseaseAndDrugs(
      modelData,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
    expect(convertedData).toEqual({
      commentsData: new Map([
        [
          'DISEASE',
          [
            {
              commentType: 'DISEASE',
              disease: {
                acronym: 'someAcron',
                description: 'some description',
                diseaseAccession: 'DiseaseEntry AC',
                diseaseId: 'DiseaseEntry Id',
                evidences: [
                  {
                    evidenceCode: 'ECO:0000256',
                    id: 'PIRNR001362',
                    source: 'PIRNR',
                  },
                ],
                diseaseCrossReference: { database: 'MIM', id: '3124' },
              },
              molecule: 'Isoform 3',
              note: {
                texts: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000256',
                        id: 'PIRNR001362',
                        source: 'PIRNR',
                      },
                    ],
                    value: 'value2',
                  },
                ],
              },
            },
          ],
        ],
        ['ALLERGEN', []],
        [
          'DISRUPTION PHENOTYPE',
          [
            {
              commentType: 'DISRUPTION PHENOTYPE',
              molecule: 'Isoform 4',
              texts: [
                {
                  evidences: [
                    {
                      evidenceCode: 'ECO:0000256',
                      id: 'PIRNR001360',
                      source: 'PIRNR',
                    },
                  ],
                  value: 'value',
                },
              ],
            },
          ],
        ],
        ['TOXIC DOSE', []],
        ['PHARMACEUTICAL', []],
      ]),
      featuresData: [],
      keywordData: [],
      xrefData: [],
    });
  });
});
