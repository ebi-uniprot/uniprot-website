import { parseTaxonIds, taxonIdsToLabels, taxonIdsToSummary } from '..';

const taxonIdToLabel = new Map([
  ['9606', 'Homo sapiens [9606]'],
  ['10090', 'Mus musculus [10090]'],
  ['562', 'Escherichia coli [562]'],
]);

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

describe('taxonIdsToLabels', () => {
  it('returns an empty array for missing or empty input', () => {
    expect(taxonIdsToLabels(undefined, taxonIdToLabel)).toEqual([]);
    expect(taxonIdsToLabels('', taxonIdToLabel)).toEqual([]);
    expect(taxonIdsToLabels(' , ', taxonIdToLabel)).toEqual([]);
  });

  it('resolves IDs to scientific-name labels', () => {
    expect(taxonIdsToLabels('9606,10090', taxonIdToLabel)).toEqual([
      'Homo sapiens [9606]',
      'Mus musculus [10090]',
    ]);
  });

  it('trims whitespace and ignores empty entries', () => {
    expect(taxonIdsToLabels(' 9606 , , 10090 ', taxonIdToLabel)).toEqual([
      'Homo sapiens [9606]',
      'Mus musculus [10090]',
    ]);
  });

  it('falls back to the bare ID when the name is not resolved', () => {
    expect(taxonIdsToLabels('9606,99999', taxonIdToLabel)).toEqual([
      'Homo sapiens [9606]',
      '99999',
    ]);
  });
});

describe('taxonIdsToSummary', () => {
  it('returns null for missing or empty input', () => {
    expect(taxonIdsToSummary(undefined, taxonIdToLabel)).toBeNull();
    expect(taxonIdsToSummary('', taxonIdToLabel)).toBeNull();
    expect(taxonIdsToSummary(' , ', taxonIdToLabel)).toBeNull();
  });

  it('returns the label on its own for a single taxon', () => {
    expect(taxonIdsToSummary('9606', taxonIdToLabel)).toBe(
      'Homo sapiens [9606]'
    );
  });

  it('counts the remaining taxa rather than listing them', () => {
    expect(taxonIdsToSummary('9606,10090', taxonIdToLabel)).toBe(
      'Homo sapiens [9606] and 1 more'
    );
    expect(taxonIdsToSummary('9606,10090,562', taxonIdToLabel)).toBe(
      'Homo sapiens [9606] and 2 more'
    );
  });

  it('falls back to the bare ID when the name is not resolved', () => {
    expect(taxonIdsToSummary('99999,9606', taxonIdToLabel)).toBe(
      '99999 and 1 more'
    );
  });
});
