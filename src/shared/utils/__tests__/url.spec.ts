/**
 * @jest-environment node
 */
import { urlsAreEqual, getLocationForPathname } from '../url';
import { Location } from '../../../app/config/urls';

describe('urlsAreEqual', () => {
  it('should return true when urls are equal except for mismatch between the parameter compress', () => {
    expect(
      urlsAreEqual(
        'https://foo.bar?param=3&compress=true',
        'https://foo.bar?compress=true&param=3',
        ['compress']
      )
    ).toBe(true);
  });
  it('should return false when url hostnames are unequal', () => {
    expect(
      urlsAreEqual(
        'https://foo.bar?param=3&compress=true',
        'https://goo.bar?compress=true&param=3',
        ['compress']
      )
    ).toBe(false);
  });
  it('should return false when url non-ignored parameter is unequal', () => {
    expect(
      urlsAreEqual(
        'https://foo.bar?param=3&compress=true',
        'https://goo.bar?compress=true&param=4',
        ['compress']
      )
    ).toBe(false);
  });
});

describe('getLocationForPathname', () => {
  const pathnameToLocation = {
    '/': Location.Home,
    '/uniprotkb/P12345': Location.UniProtKBEntry,
    '/uniprotkb': Location.UniProtKBResults,
    '/download': Location.UniProtKBDownload,
    '/blast/ncbiblast-R12345678-123456-1234-12345678-ab1': Location.BlastResult,
    '/blast': Location.Blast,
    '/customise-table': Location.UniProtKBCustomiseTable,
    '/advanced-search': Location.UniProtKBQueryBuilder,
    '/tool-dashboard': Location.Dashboard,
  };
  it('should match pathname to the correct location', () => {
    Object.entries(pathnameToLocation).map(([pathname, location]) => {
      expect(getLocationForPathname(pathname)).toEqual(location);
    });
  });
});
