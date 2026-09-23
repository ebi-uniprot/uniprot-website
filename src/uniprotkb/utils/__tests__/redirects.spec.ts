import { isMergedEntryHistory, redirectsToSameEntry } from '../redirects';

const redirectedTo = 'https://rest.uniprot.org/uniprotkb/P05067';

describe('redirectsToSameEntry', () => {
  it.each(['A4_HUMAN', 'P05067.3'])('is true for %s', (segment) => {
    expect(redirectsToSameEntry(segment)).toBe(true);
  });

  it.each(['P05067', 'P05067-2', 'P00001'])('is false for %s', (segment) => {
    expect(redirectsToSameEntry(segment)).toBe(false);
  });
});

describe('isMergedEntryHistory', () => {
  it('is true when the URL accession was merged into the one served', () => {
    expect(isMergedEntryHistory('P00001', 'P05067', redirectedTo)).toBe(true);
  });

  it('is false for an entry name, which is the same entry', () => {
    expect(isMergedEntryHistory('A4_HUMAN', 'P05067', redirectedTo)).toBe(
      false
    );
  });

  it('is false for a versioned accession, which is the same entry', () => {
    expect(isMergedEntryHistory('P05067.3', 'P05067', redirectedTo)).toBe(
      false
    );
  });

  it('is false for an isoform of the entry served', () => {
    expect(isMergedEntryHistory('P05067-2', 'P05067', redirectedTo)).toBe(
      false
    );
  });

  it('is false when only the case differs', () => {
    expect(isMergedEntryHistory('p05067', 'P05067', redirectedTo)).toBe(false);
  });

  it('is false without a redirect, whatever the accessions', () => {
    expect(isMergedEntryHistory('P00001', 'P05067', undefined)).toBe(false);
  });

  it('is false before the data has arrived', () => {
    expect(isMergedEntryHistory('P00001', undefined, redirectedTo)).toBe(false);
  });
});
