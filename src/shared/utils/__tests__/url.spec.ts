/**
 * @jest-environment node
 */
import { getLocationForPathname } from '../url';
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
