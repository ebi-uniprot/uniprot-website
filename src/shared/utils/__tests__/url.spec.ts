/**
 * @jest-environment node
 */
import {
  QueryStringArg,
  getLocationForPathname,
  splitUrl,
  stringifyQuery,
  stringifyUrl,
} from '../url';
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

describe('stringifyQuery', () => {
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
    [[{ a: [1, 2] }, { b: undefined }], 'a=1%2C2'],
    [[{ a: ['1', '2'] }, { b: undefined }], 'a=1%2C2'],
    [[new URLSearchParams('a=1&b=true&c=2'), { b: false }], 'a=1&b=false&c=2'],
  ];

  test.each(testCases)(
    'should stringify %j as %p',
    (queryStringArgs, expectedQueryString) => {
      expect(stringifyQuery(...queryStringArgs)).toEqual(expectedQueryString);
    }
  );
});

describe('stringifyUrl', () => {
  it('should stringify the URL', () => {
    expect(stringifyUrl('https://foo.com', { a: 23 })).toEqual(
      'https://foo.com?a=23'
    );
  });
});

describe('splitUrl', () => {
  it('should split the URL', () => {
    expect(splitUrl('https://foo.com?a=23')).toEqual({
      base: 'https://foo.com',
      query: 'a=23',
    });
  });
});
