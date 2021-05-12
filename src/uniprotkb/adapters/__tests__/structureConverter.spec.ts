import convertStructure from '../structureConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/entryModelData';

describe('Structure data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertStructure(
      modelData,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
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
