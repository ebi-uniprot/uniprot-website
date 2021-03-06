import {
  getFullAlignmentSegments,
  getFullAlignmentLength,
  getOffset,
} from '../../../utils/sequences';
import mockData from '../__mocks__/hspMocks.json';
import { FeatureData } from '../../../../uniprotkb/components/protein-data-views/FeaturesView';

describe.skip('HSP util tests', () => {
  it('should work with longer query than hit', () => {
    const { longQueryMiddleHit } = mockData;
    const align = getFullAlignmentSegments(longQueryMiddleHit.hsp, 2310, 770);
    expect(align).toEqual(longQueryMiddleHit.result);
  });

  it('should work with shorter query than hit', () => {
    const { shortQueryLongHit } = mockData;
    const align = getFullAlignmentSegments(shortQueryLongHit.hsp, 30, 60);
    expect(align).toEqual(shortQueryLongHit.result);
  });

  it('should work with gaps', () => {
    const { withGaps } = mockData;
    const align = getFullAlignmentSegments(withGaps.hsp, 30, 60);
    expect(align).toEqual(withGaps.result);
  });

  it('should get the correct length', () => {
    const { longQueryMiddleHit } = mockData;
    const totalLength = getFullAlignmentLength(
      longQueryMiddleHit.hsp,
      3310,
      770
    );
    expect(totalLength).toBe(3310);
  });

  it('should return the right offset', () => {
    const { shortQueryLongHit, longQueryMiddleHit } = mockData;
    let offset = getOffset(longQueryMiddleHit.hsp);
    expect(offset).toBe(771);
    offset = getOffset(shortQueryLongHit.hsp);
    expect(offset).toBe(40);
  });
});
