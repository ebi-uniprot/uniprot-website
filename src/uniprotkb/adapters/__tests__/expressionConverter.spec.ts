import convertExpression from '../expressionConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfo from '../../utils/__tests__/__mocks__/databaseInfo';
import { getDatabaseInfoMaps } from '../../utils/database';

describe('Expression data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertExpression(
      modelData,
      getDatabaseInfoMaps(databaseInfo)
    );
    const {
      databaseCategoryToNames,
      databaseNameToCategory,
      databaseToDatabaseInfo,
      implicitDatabaseXRefs,
      entrySectionToDatabaseNames,
      entrySectionToDatabaseCategoryOrder,
    } = getDatabaseInfoMaps(databaseInfo);
    console.log(
      JSON.stringify(
        [...entrySectionToDatabaseCategoryOrder.entries()],
        null,
        2
      )
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
