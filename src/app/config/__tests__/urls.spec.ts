import {
  getEntryPath,
  getEntryPathFor,
  getLocationEntryPath,
  getLocationEntryPathFor,
  Location,
} from '../urls';

import { Namespace } from '../../../shared/types/namespaces';

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
