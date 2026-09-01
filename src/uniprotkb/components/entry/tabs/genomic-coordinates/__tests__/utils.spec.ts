import { groupByGene, sortExons } from '../utils';
import P42283 from './__mocks__/P42283';

describe('groupCoordinates', () => {
  it('groups coordinates according to genes and isoforms', () => {
    expect(groupByGene(P42283)).toMatchSnapshot();
  });
});

// TODO: unskip once genomic coordinates are fix
describe('sortExons', () => {
  it.skip('sorts exons according to their genomic coordinates', () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Array.from(P42283[0].gnCoordinate![0].genomicLocation.exon).sort(
        sortExons()
      )
    ).toMatchSnapshot();
  });

  it.skip('sorts exons according to their genomic coordinates, for reverse strands', () => {
    expect(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      Array.from(P42283[0].gnCoordinate![0].genomicLocation.exon).sort(
        sortExons(true)
      )
    ).toMatchSnapshot();
  });
});
