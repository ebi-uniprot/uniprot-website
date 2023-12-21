import { getDatabaseInfoAttribute, processUrlTemplate } from '../xrefs';

describe('processUrlTemplate', () => {
  it('should fill url', () => {
    expect(
      processUrlTemplate('https://endpoint/%id/param=%Param', {
        id: '12',
        Param: 'foo',
      })
    ).toEqual('https://endpoint/12/param=foo');
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
