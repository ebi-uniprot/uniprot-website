import apiUrls, {
  getAPIQueryUrl,
  createFacetsQueryString,
  createSelectedQueryString,
} from '../apiUrls';

import { FileFormat } from '../../types/resultsDownload';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';

describe('getQueryUrl', () => {
  it('should generate facet url', () => {
    const facets = [
      { name: 'facet1', value: 'value 1' },
      { name: 'facet2', value: 'value 3' },
    ];
    const queryString = getAPIQueryUrl({
      query: 'cdc7',
      columns: [],
      selectedFacets: facets,
    });
    expect(queryString).toEqual(
      expect.stringContaining(
        '/api/uniprotkb/search?facets=reviewed%2Cmodel_organism%2Cproteins_with%2Cexistence%2Cannotation_score%2Clength&query=%28cdc7%29%20AND%20%28facet1%3A%22value%201%22%29%20AND%20%28facet2%3A%22value%203%22%29'
      )
    );
  });
});

describe('createFacetsQueryString', () => {
  it('should generate facet query', () => {
    const facets = [
      { name: 'facet1', value: 'value 1' },
      { name: 'facet2', value: 'value 3' },
      { name: 'facet3', value: 'value3' },
      { name: 'facet4', value: '[1 TO *]' },
    ];
    const queryString = createFacetsQueryString(facets);
    expect(queryString).toBe(
      '(facet1:"value 1") AND (facet2:"value 3") AND (facet3:value3) AND (facet4:[1 TO *])'
    );
  });
});

describe('apiUrls', () => {
  const getLastPath = (url: string) => url.substr(url.lastIndexOf('/') + 1);
  const accession = 'P123456';
  const testCases: Array<[FileFormat, string]> = [
    [FileFormat.text, 'P123456.txt'],
    [FileFormat.fastaCanonical, 'P123456.fasta'],
    [
      FileFormat.fastaCanonicalIsoform,
      'search?format=fasta&includeIsoform=true&query=accession%3AP123456',
    ],
    [FileFormat.xml, 'P123456.xml'],
    [FileFormat.rdfXml, 'P123456.rdf'],
    [FileFormat.gff, 'P123456.gff'],
  ];

  it.each(testCases)(
    'should return correct download URL for file format %s',
    (fileFormat, lastPath) => {
      const url = apiUrls.entryDownload(accession, fileFormat);
      expect(getLastPath(url)).toBe(lastPath);
    }
  );
});

describe('createSelectedQueryString', () => {
  it('should generate a query including all IDs', () => {
    expect(
      createSelectedQueryString(['a1', 'b2', 'c3'], UniProtKBColumn.id)
    ).toBe('id:a1 OR id:b2 OR id:c3');
  });

  it('should deduplicate IDs', () => {
    expect(
      createSelectedQueryString(['a1', 'b2', 'c3', 'a1'], UniProtKBColumn.id)
    ).toBe('id:a1 OR id:b2 OR id:c3');
  });

  it('should generate a query including all IDs, but removing from', () => {
    expect(
      createSelectedQueryString(['z||a1', 'z||b2', 'y||c3'], UniProtKBColumn.id)
    ).toBe('id:a1 OR id:b2 OR id:c3');
  });

  it('should deduplicate IDs, but removing from', () => {
    expect(
      createSelectedQueryString(
        ['z||a1', 'z||b2', 'y||c3', 'y||a1'],
        UniProtKBColumn.id
      )
    ).toBe('id:a1 OR id:b2 OR id:c3');
  });
});
