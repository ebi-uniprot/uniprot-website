import convertPathologyAndBiotech from '../PathologyAndBiotechConverter';
import modelData from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('Pathology/Biotech data converter', () => {
  beforeAll(() => {
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertPathologyAndBiotech(modelData);
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
        ['BIOTECHNOLOGY', []],
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
