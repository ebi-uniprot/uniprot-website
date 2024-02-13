import convertSubcellularLocation, {
  getAndPrepareSubcellGoXrefs,
} from '../subcellularLocationConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import mockGoXrefs from '../../__mocks__/goXrefs';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

describe('Subcellular data converter', () => {
  it('should convert the data', () => {
    const convertedData = convertSubcellularLocation(
      modelData,
      databaseInfoMaps,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
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
      isoforms: ['name'],
      goXrefs: [],
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
      primaryAccession: 'P21802',
      xrefData: [],
    });
  });
});

describe('getAndPrepareSubcellGoXrefs', () => {
  it('should get GO xrefs and prepare them by remove the C: from GoTerm', () => {
    expect(getAndPrepareSubcellGoXrefs(mockGoXrefs)).toEqual([
      {
        database: 'GO',
        id: 'GO:0005576',
        properties: {
          GoTerm: 'extracellular region',
          GoEvidenceType: 'TAS:Reactome',
        },
      },
      {
        database: 'GO',
        id: 'GO:0005615',
        properties: {
          GoTerm: 'extracellular space',
          GoEvidenceType: 'IBA:GO_Central',
        },
        evidences: [
          { evidenceCode: 'ECO:0000269', source: 'PubMed', id: '21873635' },
        ],
      },
    ]);
  });
});
