import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import getFASTAFromAccession from '../getFASTAFromAccession';

import mockUniProtKB from '../../../uniprotkb/components/__mocks__/swissprotEntry';
import mockUniParc from '../../../uniparc/__mocks__/uniParcEntryModelData';
import mockUniRef from '../../../uniref/__mocks__/uniRefModelData';

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
    mock.onGet(/api\/uniprotkb\/O00000$/).reply(404, {
      url: 'http://www.ebi.ac.uk/uniprot/beta/api/uniprotkb/O00000',
      messages: ['Resource not found'],
    });
    await expect(getFASTAFromAccession('O00000')).rejects.toThrow();
  });

  it('should handle UniProtKB entry', async () => {
    mock.onGet(/api\/uniprotkb\/P05067$/).reply(200, mockUniProtKB);
    await expect(getFASTAFromAccession('P05067')).resolves.toMatchSnapshot();
  });

  it('should handle UniParc entry', async () => {
    mock.onGet(/api\/uniparc\/UPI0000000001$/).reply(200, mockUniParc);
    await expect(
      getFASTAFromAccession('UPI0000000001')
    ).resolves.toMatchSnapshot();
  });

  it('should handle UniRef entry', async () => {
    mock.onGet(/api\/uniref\/UniRef100_A0A0B7GQ86$/).reply(200, mockUniRef);
    await expect(
      getFASTAFromAccession('UniRef100_A0A0B7GQ86')
    ).resolves.toMatchSnapshot();
  });
});
