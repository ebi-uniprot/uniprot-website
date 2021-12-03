import convertStructure from '../structureConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../__mocks__/databaseInfoMaps';

describe('Structure data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertStructure(modelData, databaseInfoMaps);
    expect(convertedData).toEqual({
      commentsData: new Map(),
      featuresData: [],
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
