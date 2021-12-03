import { getAllKeywords } from '../KeywordsUtil';
import uniProtKbConverter from '../../adapters/uniProtkbConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';
import databaseInfoMaps from './__mocks__/databaseInfoMaps';

describe('KeywordsUtil', () => {
  it('Should retrieve all keywords from UI Model', () => {
    // It would be nicer to have a mock object for
    // the UI model at some point
    const dataObject = uniProtKbConverter(modelData, databaseInfoMaps);
    const keywords = getAllKeywords(dataObject);
    expect(keywords).toEqual([
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
    ]);
  });
});
