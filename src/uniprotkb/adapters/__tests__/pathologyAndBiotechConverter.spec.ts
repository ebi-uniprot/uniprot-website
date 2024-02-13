import diseaseAndDrugs from '../diseaseAndDrugs';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

describe('Disease and Drugs data converter', () => {
  it('should convert the data', () => {
    const convertedData = diseaseAndDrugs(
      modelData,
      databaseInfoMaps,
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
            {
              commentType: 'DISRUPTION PHENOTYPE',
              molecule: 'Isoform 4 dfs',
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
            },
          ],
        ],
        ['TOXIC DOSE', []],
        ['PHARMACEUTICAL', []],
        ['BIOTECHNOLOGY', []],
      ]),
      featuresData: [],
      isoforms: ['name'],
      keywordData: [],
      xrefData: [],
    });
  });
});
