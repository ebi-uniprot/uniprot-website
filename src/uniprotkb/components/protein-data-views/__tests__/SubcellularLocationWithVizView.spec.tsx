import { type Lineage } from '../../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  getGoId,
  hasSuperkingdom,
  isVirus,
} from '../SubcellularLocationWithVizView';

describe('getGoId', () => {
  it('should extract GO ID', () => {
    expect(getGoId('GO:00001')).toEqual('00001');
  });
});

describe('hasSuperkingdom', () => {
  // Callers gate the SubCell viz on this — an empty lineage means we cannot
  // classify the organism and must fall back to the text-only tab content.
  it('is false for an empty lineage', () => {
    expect(hasSuperkingdom([])).toBe(false);
  });

  it('is true for a string[] lineage with a superkingdom', () => {
    expect(hasSuperkingdom(['Eukaryota', 'Metazoa'])).toBe(true);
  });

  it('is true for a Lineage of objects with a superkingdom', () => {
    const lineage = [
      {
        taxonId: 2759,
        scientificName: 'Eukaryota',
        rank: 'domain',
        hidden: false,
      },
    ] as Lineage;
    expect(hasSuperkingdom(lineage)).toBe(true);
  });
});

describe('isVirus', () => {
  // Belt-and-braces — callers should gate on hasSuperkingdom() first, but
  // isVirus must still be safe to call on its own without crashing.
  it('returns false for an empty lineage without throwing', () => {
    expect(isVirus([])).toBe(false);
  });

  it('classifies a string[] lineage whose superkingdom is Viruses', () => {
    expect(isVirus(['Viruses', 'Riboviria'])).toBe(true);
  });

  it('returns false for a non-viral string[] lineage', () => {
    expect(isVirus(['Eukaryota', 'Metazoa'])).toBe(false);
  });

  it('classifies a Lineage of objects by the superkingdom scientificName', () => {
    const lineage = [
      {
        taxonId: 10239,
        scientificName: 'Viruses',
        rank: 'no rank',
        hidden: false,
      },
    ] as Lineage;
    expect(isVirus(lineage)).toBe(true);
  });
});
