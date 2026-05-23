import { type Lineage } from '../../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { getGoId, isVirus } from '../SubcellularLocationWithVizView';

describe('getGoId', () => {
  it('should extract GO ID', () => {
    expect(getGoId('GO:00001')).toEqual('00001');
  });
});

describe('isVirus', () => {
  // Regression: an empty lineage yields an `undefined` first element — the
  // classification must short-circuit to `false` rather than crash on
  // `undefined.scientificName`.
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
