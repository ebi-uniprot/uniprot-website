import apiUrls from '../apiUrls/apiUrls';

import { FileFormat } from '../../types/resultsDownload';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { Namespace } from '../../types/namespaces';

describe('apiUrls.search.search', () => {
  it('should generate facet url', () => {
    const facets = [
      { name: 'facet1', value: 'value 1' },
      { name: 'facet2', value: 'value 3' },
    ];
    const url = apiUrls.search.search({
      query: 'cdc7',
      columns: [],
      selectedFacets: facets,
    });
    expect(url).toEqual(
      expect.stringContaining(
        '/api/uniprotkb/search?facets=reviewed%2Cmodel_organism%2Cproteins_with%2Cexistence%2Cannotation_score%2Clength&query=%28cdc7%29+AND+%28facet1%3A%22value+1%22%29+AND+%28facet2%3A%22value+3%22%29'
      )
    );
  });
});

describe('apiUrls.entry.download', () => {
  const getLastPath = (url: string) => url.substr(url.lastIndexOf('/') + 1);
  const accession = 'P123456';
  const testCases: Array<[FileFormat, string]> = [
    [FileFormat.text, 'P123456.txt'],
    [FileFormat.fastaCanonical, 'P123456.fasta'],
    [
      FileFormat.fastaCanonicalIsoform,
      'search?format=fasta&includeIsoform=true&query=accession%3AP123456&size=500&sort=accession+asc',
    ],
    [FileFormat.xml, 'P123456.xml'],
    [FileFormat.rdfXml, 'P123456.rdf'],
    [FileFormat.gff, 'P123456.gff'],
  ];

  it.each(testCases)(
    'should return correct download URL for file format %s',
    (fileFormat, lastPath) => {
      const url = apiUrls.entry.download(accession, fileFormat);
      expect(getLastPath(url)).toBe(lastPath);
    }
  );
});

describe('apiUrls.results.download', () => {
  it('should return a jobId if provided for ID Mapping Results', () => {
    expect(
      apiUrls.results.download({
        fileFormat: FileFormat.fastaCanonical,
        compressed: false,
        selected: [],
        selectedIdField: UniProtKBColumn.accession,
        namespace: Namespace.idmapping,
        base: 'https://rest.uniprot.org/idmapping/download/run',
        query: '',
        selectedFacets: [],
        download: false,
        jobId: 'foo',
      })
    ).toContain('jobId=foo');
  });
});
