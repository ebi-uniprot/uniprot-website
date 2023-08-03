/**
 * @jest-environment node
 */
import { QueryStringArg, getLocationForPathname, getQueryString } from '../url';
import { Location } from '../../../app/config/urls';

describe('getLocationForPathname', () => {
  const pathnameToLocation = {
    '/': Location.Home,
    '/uniprotkb/P12345': Location.UniProtKBEntry,
    '/uniprotkb': Location.UniProtKBResults,
    '/blast/uniprotkb/ncbiblast-R12345678-123456-1234-12345678-ab1':
      Location.BlastResult,
    '/blast': Location.Blast,
    '/id-mapping': Location.IDMapping,
    '/id-mapping/12345': Location.IDMappingResult,
    '/id-mapping/uniprotkb/12345': Location.IDMappingResult,
    '/align': Location.Align,
    '/align/12345': Location.AlignResult,
    '/tool-dashboard': Location.Dashboard,
  };
  it('should match pathname to the correct location', () => {
    Object.entries(pathnameToLocation).map(([pathname, location]) =>
      expect(getLocationForPathname(pathname)).toEqual(location)
    );
  });
});

describe('getQueryString', () => {
  const testCases: [QueryStringArg[], string][] = [
    [[{ a: 1 }], 'a=1'],
    [[{ a: 1 }, { a: 2 }], 'a=2'],
    [[{ a: 1 }, { a: undefined }], ''],
    [
      [
        { a: 1, b: true },
        { a: undefined, b: false },
      ],
      'b=false',
    ],
    [['a=1&b=true', { a: undefined, b: false }], 'b=false'],
    [['a=1&b=true&c=2', 'a=2&b=false'], 'a=2&b=false&c=2'],
  ];

  test.each(testCases)(
    'should %p : %p',
    (queryStringArgs, expectedQueryString) => {
      expect(getQueryString(...queryStringArgs)).toEqual(expectedQueryString);
    }
  );
});
