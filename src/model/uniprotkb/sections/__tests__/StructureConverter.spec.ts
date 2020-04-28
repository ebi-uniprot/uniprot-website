import convertStructure from '../StructureConverter';
import modelData from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('Structure data converter', () => {
  beforeAll(() => {
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertStructure(modelData);
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
