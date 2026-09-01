import { type GenomicEntry } from '../types';
import {
  deduplicateAndNormalizeGenomicEntries,
  groupByGene,
  sortExons,
} from '../utils';
import P42283 from './__mocks__/P42283';

describe('groupCoordinates', () => {
  it('groups coordinates according to genes and isoforms', () => {
    expect(groupByGene(P42283)).toMatchSnapshot();
  });
});

describe('sortExons', () => {
  it('sorts exons according to their genomic coordinates', () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Array.from(P42283[0].gnCoordinate![0].genomicLocation.exon).sort(
        sortExons()
      )
    ).toMatchSnapshot();
  });

  it('sorts exons according to their genomic coordinates, for reverse strands', () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Array.from(P42283[0].gnCoordinate![0].genomicLocation.exon).sort(
        sortExons(true)
      )
    ).toMatchSnapshot();
  });
});

describe('deduplicateAndNormalizeGenomicEntries', () => {
  it('deduplicates un-suffixed entries when suffixed isoform entries are present', () => {
    const entries = [
      { accession: 'P05067' },
      { accession: 'P05067-1' },
      { accession: 'P05067-3' },
    ] as GenomicEntry[];
    const result = deduplicateAndNormalizeGenomicEntries(entries, 'P05067-1');
    expect(result).toEqual([
      { accession: 'P05067-1' },
      { accession: 'P05067-3' },
    ]);
  });

  it('normalizes un-suffixed canonical accession to canonical isoform ID', () => {
    const entries = [
      { accession: 'P42283' },
      { accession: 'P42284' },
      { accession: 'Q7KQZ4' },
    ] as GenomicEntry[];
    const result = deduplicateAndNormalizeGenomicEntries(entries, 'P42283-1');
    expect(result).toEqual([
      { accession: 'P42283-1' },
      { accession: 'P42284' },
      { accession: 'Q7KQZ4' },
    ]);
  });

  it('handles empty or missing data', () => {
    expect(deduplicateAndNormalizeGenomicEntries([])).toEqual([]);
  });
});
