import convertSubcellularLocation from '../subcellularLocationConverter';
import modelData from '../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../adapters/uniProtkbConverter';

describe('Subcellular data converter', () => {
  beforeAll(() => {
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertSubcellularLocation(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map([
        [
          'SUBCELLULAR LOCATION',
          [
            {
              commentType: 'SUBCELLULAR LOCATION',
              molecule: 'molecule value',
              note: {
                texts: [
                  {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000256',
                        id: 'PIRNR001361',
                        source: 'PIRNR',
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
                        id: 'PIRNR001361',
                        source: 'PIRNR',
                      },
                    ],
                    id: 'id1',
                    value: 'location value',
                  },
                  orientation: {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000256',
                        id: 'PIRNR001361',
                        source: 'PIRNR',
                      },
                    ],
                    id: 'id2',
                    value: 'orientation value',
                  },
                  topology: {
                    evidences: [
                      {
                        evidenceCode: 'ECO:0000256',
                        id: 'PIRNR001361',
                        source: 'PIRNR',
                      },
                    ],
                    id: 'id2',
                    value: 'topology value',
                  },
                },
              ],
            },
          ],
        ],
      ]),
      featuresData: [],
      keywordData: [],
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
      xrefData: [],
    });
  });
});
