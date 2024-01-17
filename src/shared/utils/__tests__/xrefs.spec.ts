import { error } from '../logging';
import { getDatabaseInfoAttribute, processUrlTemplate } from '../xrefs';

jest.mock('../logging');

describe('processUrlTemplate', () => {
  beforeEach(() => {
    (error as jest.Mock).mockImplementation(jest.fn());
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should fill url', () => {
    expect(
      processUrlTemplate('https://endpoint/%id/param=%Param', {
        id: '12',
        Param: 'foo',
      })
    ).toEqual('https://endpoint/12/param=foo');
    expect(error).not.toHaveBeenCalled();
  });
  it('should log error because the template is unchanged', () => {
    expect(
      processUrlTemplate('https://endpoint/%id/param=%Param', {
        baz: '12',
      })
    ).toEqual('https://endpoint/%id/param=%Param');
    expect(error).toHaveBeenCalledWith(
      'https://endpoint/%id/param=%Param template values not filled in with params: {"baz":"12"}'
    );
  });
});

describe('getDatabaseInfoAttribute', () => {
  it('should find return database info attribute', () => {
    expect(
      getDatabaseInfoAttribute(
        [
          {
            name: 'ProteinId',
            xmlTag: 'protein sequence ID',
            uriLink: 'https://www.ensembl.org/id/%ProteinId',
          },
          {
            name: 'GeneId',
            xmlTag: 'gene ID',
            uriLink: 'https://www.ensembl.org/id/%GeneId',
          },
        ],
        'GeneId'
      )
    ).toEqual({
      name: 'GeneId',
      uriLink: 'https://www.ensembl.org/id/%GeneId',
      xmlTag: 'gene ID',
    });
  });
});
