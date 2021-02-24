import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

import UniParcCard from '../UniParcCard';

import { UniParcAPIModel } from '../../../adapters/uniParcConverter';

import data from '../../../__mocks__/entryModelData';

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
