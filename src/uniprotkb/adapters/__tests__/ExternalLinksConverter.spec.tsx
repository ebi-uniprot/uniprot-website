import convertExternalLinks from '../externalLinksConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../__mocks__/databaseInfoMaps';

describe('External links data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertExternalLinks(modelData, databaseInfoMaps);
    expect(convertedData).toEqual({
      commentsData: new Map([
        [
          'WEB RESOURCE',
          [
            {
              commentType: 'WEB RESOURCE',
              ftp: true,
              molecule: 'Isoform 2',
              note: 'Note text',
              resourceName: 'resource name',
              resourceUrl: 'resource URL',
            },
          ],
        ],
      ]),
      keywordData: [],
      featuresData: [],
      xrefData: [],
    });
  });
});
