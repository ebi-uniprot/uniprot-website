import convertSubcellularLocation from '../SubcellularLocationConverter';
import modelDataJson from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('Subcellular data converter', () => {
  beforeAll(() => {
    modelDataJson.uniProtKBCrossReferences = convertXrefProperties(
      modelDataJson.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertSubcellularLocation(modelDataJson);
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
      xrefData: [],
    });
  });
});
