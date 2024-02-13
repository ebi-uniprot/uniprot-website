import convertExternalLinks from '../externalLinksConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

describe('External links data converter', () => {
  it('should convert the data', () => {
    const convertedData = convertExternalLinks(
      modelData,
      databaseInfoMaps,
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
      isoforms: [],
      xrefData: [],
    });
  });
});
