import { Namespace } from '../../../shared/types/namespaces';
import {
  getCanonicalURL,
  getEntryPath,
  getEntryPathFor,
  getLocationEntryPath,
  getLocationEntryPathFor,
  Location,
} from '../urls';

describe('getEntryPath', () => {
  it('should correctly form entry path', () => {
    expect(getEntryPath(Namespace.uniprotkb, 'P12345')).toEqual(
      '/uniprotkb/P12345'
    );
  });

  it('should correctly form canonical entry path to the specific isoform sequence', () => {
    expect(getEntryPath(Namespace.uniprotkb, 'P12345-2')).toEqual(
      '/uniprotkb/P12345#P12345-2'
    );
  });

  it('should correctly form entry path with subpage', () => {
    expect(getEntryPath(Namespace.uniprotkb, 'P12345', 'subPage')).toEqual(
      '/uniprotkb/P12345/subPage'
    );
  });
});

describe('getEntryPathFor', () => {
  const getEntryPathForUniProtKB = getEntryPathFor(Namespace.uniprotkb);
  it('should correctly form entry path', () => {
    expect(getEntryPathForUniProtKB('P12345')).toEqual('/uniprotkb/P12345');
  });

  it('should correctly form entry path with subpage', () => {
    expect(getEntryPathForUniProtKB('P12345', 'subPage')).toEqual(
      '/uniprotkb/P12345/subPage'
    );
  });
});

describe('getLocationEntryPath', () => {
  it('should correctly form entry path', () => {
    expect(getLocationEntryPath(Location.HelpEntry, 'uniref')).toEqual(
      '/help/uniref'
    );
  });
});

describe('getLocationEntryPathFor', () => {
  const getLocationEntryPathForHelp = getLocationEntryPathFor(
    Location.HelpEntry
  );
  it('should correctly form entry path', () => {
    expect(getLocationEntryPathForHelp('uniref')).toEqual('/help/uniref');
  });
});

describe('getCanonicalURL', () => {
  it('should resolve a rooted path against the production origin, byte for byte', () => {
    // Byte for byte: this is what the sitemap lists
    expect(getCanonicalURL('/uniprotkb/P12345/entry')).toEqual(
      'https://www.uniprot.org/uniprotkb/P12345/entry'
    );
    expect(getCanonicalURL('/')).toEqual('https://www.uniprot.org/');
    // The results canonical carries its deliberate query string through
    expect(getCanonicalURL('/uniprotkb?query=*')).toEqual(
      'https://www.uniprot.org/uniprotkb?query=*'
    );
  });

  it('should not let a malformed path produce a malformed canonical', () => {
    expect(getCanonicalURL('uniprotkb/P12345')).toEqual(
      'https://www.uniprot.org/uniprotkb/P12345'
    );
    expect(getCanonicalURL('//uniprotkb/P12345')).toEqual(
      'https://www.uniprot.org/uniprotkb/P12345'
    );
    // Never resolved onto another origin, unlike `new URL`
    expect(getCanonicalURL('//example.com/x')).toEqual(
      'https://www.uniprot.org/example.com/x'
    );
  });
});
