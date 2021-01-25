import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';
import UniParcCard from '../UniParcCard';
import data from '../../../__mocks__/entryModelData.json';
import { UniParcAPIModel } from '../../../adapters/uniParcConverter';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const { asFragment } = renderWithRouter(
      <UniParcCard
        data={data as UniParcAPIModel}
        handleEntrySelection={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
