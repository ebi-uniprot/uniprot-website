import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import getFASTAFromAccession from '../getFASTAFromAccession';

import mockUniProtKB from '../../../uniprotkb/components/__mocks__/swissprotEntry.json';
import mockUniParc from '../../../uniparc/__mocks__/entryModelData.json';
// import mockUniRef from ...

let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe('getFASTAFromAccession', () => {
  it('should handle no accession', async () => {
    expect(await getFASTAFromAccession()).toBeUndefined();
  });

  it('should not throw if no data', async () => {
    mock.onGet(/api\/uniprotkb\/accession\/P-non-existing$/).reply(204);
    expect(await getFASTAFromAccession('P-non-existing')).toBeUndefined();
  });

  it('should handle UniProtKB entry', async () => {
    mock.onGet(/api\/uniprotkb\/accession\/P05067$/).reply(200, mockUniProtKB);
    expect(await getFASTAFromAccession('P05067')).toMatchSnapshot();
  });

  it('should handle UniParc entry', async () => {
    mock.onGet(/api\/uniparc\/UPI0000000001$/).reply(200, mockUniParc);
    expect(await getFASTAFromAccession('UPI0000000001')).toMatchSnapshot();
  });

  // TODO: uncomment and add a mock json payload once UniRef API has stabilised
  it.skip('should handle UniRef entry', async () => {
    // mock.onGet(/api\/uniref\/......$/).reply(200, mockUniRef);
    // expect(await getFASTAFromAccession('......')).toMatchSnapshot();
  });
});
