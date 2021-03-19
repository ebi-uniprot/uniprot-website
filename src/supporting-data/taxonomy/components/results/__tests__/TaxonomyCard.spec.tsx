import renderWithRouter from '../../../../../shared/__test-helpers__/customRender';
import TaxonomyCard from '../TaxonomyCard';

import mockData from '../../../__mocks__/taxonomyModelData';

describe('Taxonomy Card tests', () => {
  it('should render', () => {
    const { asFragment } = renderWithRouter(
      <TaxonomyCard data={mockData[0]} handleEntrySelection={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
