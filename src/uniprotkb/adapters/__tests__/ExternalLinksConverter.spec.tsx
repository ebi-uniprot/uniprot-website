import convertExternalLinks from '../externalLinksConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/entryModelData';

describe('External links data converter', () => {
  test('should convert the data', () => {
    const convertedData = convertExternalLinks(
      modelData,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
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
