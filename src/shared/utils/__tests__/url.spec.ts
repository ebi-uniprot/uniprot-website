/**
 * @jest-environment node
 */
import {
  QueryStringArg,
  createFacetsQueryString,
  createSelectedQueryString,
  getLocationForPathname,
  splitUrl,
  stringifyQuery,
  stringifyUrl,
} from '../url';

import { Location } from '../../../app/config/urls';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';

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
  it('should not append a ? if query string args resolves to nothing', () => {
    expect(stringifyUrl('https://foo.com', { a: undefined })).toEqual(
      'https://foo.com'
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
