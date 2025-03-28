import customRender from '../../../../shared/__test-helpers__/customRender';
import mockGoXrefs from '../../../__mocks__/goXrefs';
import { getAndPrepareSubcellGoXrefs } from '../../../adapters/subcellularLocationConverter';
import SubcellularLocationGOView, {
  getSwissBioPicLocationId,
} from '../SubcellularLocationGOView';

describe('getSwissBioPicLocationId', () => {
  it('should remove colon and leading zeros', () => {
    expect(getSwissBioPicLocationId('GO:000001')).toEqual('GO1');
  });
});

describe('SubcellularLocationGOView', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <SubcellularLocationGOView
        primaryAccession="P12345"
        goXrefs={getAndPrepareSubcellGoXrefs(mockGoXrefs)}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
