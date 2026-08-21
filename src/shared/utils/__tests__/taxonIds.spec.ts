import parseTaxonIds from '../taxonIds';

describe('parseTaxonIds', () => {
  it('returns an empty array for missing or empty input', () => {
    expect(parseTaxonIds(undefined)).toEqual([]);
    expect(parseTaxonIds('')).toEqual([]);
    expect(parseTaxonIds(' , ')).toEqual([]);
  });

  it('splits, trims, and ignores empty entries', () => {
    expect(parseTaxonIds(' 9606 , , 10090 ')).toEqual(['9606', '10090']);
  });
});
