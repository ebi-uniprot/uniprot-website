import { getSwissBioPicLocationId } from '../SubcellularLocationGOView';

describe('getSwissBioPicLocationId', () => {
  it('should remove colon and leading zeros', () => {
    expect(getSwissBioPicLocationId('GO:000001')).toEqual('GO1');
  });
});
