import { getAPIQueryUrl, createFacetsQueryString } from '../utils';

describe('utils', () => {
  test('should generate facet query', () => {
    const facets = [
      { name: 'facet1', value: 'value 1' },
      { name: 'facet2', value: 'value 3' },
    ];
    const queryString = getAPIQueryUrl('cdc7', [], facets);
    expect(queryString).toBe(
      'https://wwwdev.ebi.ac.uk/uniprot/api/uniprotkb/search?facets=reviewed%2Cpopular_organism%2Cproteins_with%2Cexistence%2Cannotation_score%2Clength&fields=&query=cdc7%20AND%20%28facet1%3A%22value%201%22%29%20AND%20%28facet2%3A%22value%203%22%29'
    );
  });

  test('should generate facet query', () => {
    const facets = [
      { name: 'facet1', value: 'value 1' },
      { name: 'facet2', value: 'value 3' },
      { name: 'facet3', value: 'value3' },
      { name: 'facet4', value: '[1 TO *]' },
    ];
    const queryString = createFacetsQueryString(facets);
    expect(queryString).toBe(
      ' AND (facet1:"value 1") AND (facet2:"value 3") AND (facet3:value3) AND (facet4:[1 TO *])'
    );
  });
});
