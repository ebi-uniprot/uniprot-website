import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';
import convertExpression from '../expressionConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

describe('Expression data converter', () => {
  it('should convert the data', () => {
    const convertedData = convertExpression(
      modelData,
      databaseInfoMaps,
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
