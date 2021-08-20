import SubcellularLocationGOView, {
  getSwissBioPicLocationId,
} from '../SubcellularLocationGOView';

import customRender from '../../../../shared/__test-helpers__/customRender';
import { getAndPrepareSubcellGoXrefs } from '../../../adapters/subcellularLocationConverter';

import mockGoXrefs from '../../../__mocks__/goXrefs';

describe('getSwissBioPicLocationId', () => {
  it('should remove colon and leading zeros', () => {
    expect(getSwissBioPicLocationId('GO:000001')).toEqual('GO1');
  });
});

describe('fo', () => {
  const { asFragment } = customRender(
    <SubcellularLocationGOView
      primaryAccession="P12345"
      goXrefs={getAndPrepareSubcellGoXrefs(mockGoXrefs)}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
