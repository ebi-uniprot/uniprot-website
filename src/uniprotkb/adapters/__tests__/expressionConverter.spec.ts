import convertExpression from '../expressionConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';

describe('Expression data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertExpression(
      modelData,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
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
