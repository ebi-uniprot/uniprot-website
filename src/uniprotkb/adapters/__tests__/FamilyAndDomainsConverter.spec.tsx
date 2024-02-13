import convertFamilyAndDomains from '../familyAndDomainsConverter';
import { convertXrefProperties } from '../uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

describe('Family and Domains data converter', () => {
  it('should convert the data', () => {
    const convertedData = convertFamilyAndDomains(
      modelData,
      databaseInfoMaps,
      convertXrefProperties(modelData.uniProtKBCrossReferences)
    );
    expect(convertedData).toEqual({
      commentsData: new Map([
        ['DOMAIN', []],
        ['SIMILARITY', []],
      ]),
      featuresData: [],
      isoforms: ['name'],
      keywordData: [
        {
          category: 'Domain',
          keywords: [
            {
              category: 'Domain',
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10025',
                  source: 'PROSITE-ProRule',
                },
              ],
              id: 'KW-11111',
              name: 'keyword value',
            },
          ],
        },
      ],
      xrefData: [
        {
          category: 'FMD',
          databases: [
            {
              database: 'MobiDB',
              xrefs: [{ database: 'MobiDB', implicit: true }],
            },
          ],
        },
      ],
    });
  });
});
