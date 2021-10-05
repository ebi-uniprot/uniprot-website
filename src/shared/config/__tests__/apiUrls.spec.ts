import apiUrls, { getAPIQueryUrl, createFacetsQueryString } from '../apiUrls';
import { FileFormat } from '../../types/resultsDownload';

describe('getQueryUrl', () => {
  test('should generate facet url', () => {
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
  test('should generate facet query', () => {
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
  const testCases = [
    {
      fileFormat: FileFormat.text,
      lastPath: 'P123456.txt',
    },
    {
      fileFormat: FileFormat.fastaCanonical,
      lastPath: 'P123456.fasta',
    },
    {
      fileFormat: FileFormat.fastaCanonicalIsoform,
      lastPath:
        'search?format=fasta&includeIsoform=true&query=accession%3AP123456',
    },
    {
      fileFormat: FileFormat.xml,
      lastPath: 'P123456.xml',
    },
    {
      fileFormat: FileFormat.rdfXml,
      lastPath: 'P123456.rdf',
    },
    {
      fileFormat: FileFormat.gff,
      lastPath: 'P123456.gff',
    },
  ];
  testCases.forEach(({ fileFormat, lastPath }) => {
    test(`should return correct download URL for file format ${fileFormat}`, () => {
      const url = apiUrls.entryDownload(accession, fileFormat);
      expect(getLastPath(url)).toBe(lastPath);
    });
  });
});
