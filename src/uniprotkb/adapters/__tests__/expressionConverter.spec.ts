import convertExpression from '../expressionConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../__mocks__/databaseInfoMaps';

describe('Expression data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertExpression(modelData, databaseInfoMaps);
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
