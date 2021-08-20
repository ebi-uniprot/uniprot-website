import { getGoId } from '../SubcellularLocationWithVizView';

describe('getGoId', () => {
  it('should extract GO ID', () => {
    expect(getGoId('GO:00001')).toEqual('00001');
  });
});
