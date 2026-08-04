import { taxonIdsToLabels } from '..';

describe('taxonIdsToLabels', () => {
  const taxonIdToLabel = new Map([
    ['9606', 'Homo sapiens [9606]'],
    ['10090', 'Mus musculus [10090]'],
  ]);

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
