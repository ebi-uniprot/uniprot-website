import convertExpression from '../ExpressionConverter';
import modelData from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('Expression data converter', () => {
  beforeAll(() => {
    modelData.uniProtKBCrossReferences = convertXrefProperties(
      modelData.uniProtKBCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertExpression(modelData);
    expect(convertedData).toEqual({
      commentsData: new Map([
        ['TISSUE SPECIFICITY', []],
        ['INDUCTION', []],
        ['DEVELOPMENTAL STAGE', []],
      ]),
      xrefData: [],
      featuresData: [],
      keywordData: [],
    });
  });
});
