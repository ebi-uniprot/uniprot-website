import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import getFASTAFromAccession from '../getFASTAFromAccession';

import mockUniProtKB from '../../../uniprotkb/components/__mocks__/swissprotEntry';
import mockUniParc from '../../../uniparc/__mocks__/uniParcEntryModelData';
// import mockUniRef from ...

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  mock.restore();
});

describe('getFASTAFromAccession', () => {
  it('should handle no accession', async () => {
    await expect(getFASTAFromAccession()).resolves.toBeUndefined();
  });

  it('should throw if protein not existing', async () => {
    mock.onGet(/api\/uniprotkb\/accession\/O00000$/).reply(404, {
      url: 'http://www.ebi.ac.uk/uniprot/api/uniprotkb/accession/O00000',
      messages: ['Resource not found'],
    });
    await expect(getFASTAFromAccession('O00000')).rejects.toThrow();
  });

  it('should handle UniProtKB entry', async () => {
    mock.onGet(/api\/uniprotkb\/accession\/P05067$/).reply(200, mockUniProtKB);
    await expect(getFASTAFromAccession('P05067')).resolves.toMatchSnapshot();
  });

  it('should handle UniParc entry', async () => {
    mock.onGet(/api\/uniparc\/UPI0000000001$/).reply(200, mockUniParc);
    await expect(
      getFASTAFromAccession('UPI0000000001')
    ).resolves.toMatchSnapshot();
  });

  // TODO: uncomment and add a mock json payload once UniRef API has stabilised
  it.skip('should handle UniRef entry', async () => {
    // mock.onGet(/api\/uniref\/......$/).reply(200, mockUniRef);
    // await expect(getFASTAFromAccession('......')).resolves.toMatchSnapshot();
  });
});
