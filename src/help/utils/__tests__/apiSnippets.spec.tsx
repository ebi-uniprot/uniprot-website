import { snippetPlugins, RequestMap } from '../apiSnippets';

type MapInit = [
  'url' | 'method' | 'headers' | 'body',
  string | Map<string, string>,
][];

describe('snippetPlugins', () => {
  const plugins: [string, (request: RequestMap) => string][] =
    snippetPlugins.map(({ fn }) => {
      const [name, generator] = Object.entries(fn)[0];
      return [name.replace('requestSnippetGenerator_', ''), generator];
    });

  const cases: [string, RequestMap][] = [
    // main case
    [
      'GET, params',
      new Map([
        ['url', 'https://rest.uniprot.org/api?query=search&fields=a,b,c'],
        ['method', 'GET'],
        ['headers', new Map([['Accept', 'application/json']])],
      ] as MapInit),
    ],
    // e.g. retrieve job info
    [
      'GET, no params',
      new Map([
        ['url', 'https://rest.uniprot.org/api'],
        ['method', 'GET'],
        ['headers', new Map([['Accept', 'application/json']])],
      ] as MapInit),
    ],
    // e.g. retrieve job info
    [
      'GET, no params, non-JSON output',
      new Map([
        ['url', 'https://rest.uniprot.org/api'],
        ['method', 'GET'],
        ['headers', new Map([['Accept', 'application/xml']])],
      ] as MapInit),
    ],
    // e.g. submit ID mapping
    [
      'POST, no params, body',
      new Map([
        ['url', 'https://rest.uniprot.org/api'],
        ['method', 'POST'],
        ['headers', new Map([['Accept', 'application/json']])],
        ['body', '{ "a": "value" }'],
      ] as MapInit),
    ],
    // e.g. submit async download
    [
      'POST, params, no body',
      new Map([
        ['url', 'https://rest.uniprot.org/api?query=search&fields=a,b,c'],
        ['method', 'POST'],
        ['headers', new Map([['Accept', 'application/json']])],
      ] as MapInit),
    ],
  ];

  describe.each(plugins)('for "%s"', (_, generator) => {
    it.each(cases)(
      'should generate the correct snippet for "%s"',
      (_, request) => {
        expect(generator(request as RequestMap)).toMatchSnapshot();
      }
    );
  });
});
