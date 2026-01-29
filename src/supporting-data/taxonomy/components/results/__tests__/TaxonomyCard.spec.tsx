import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import mockData from '../../../__mocks__/taxonomyModelData';
import TaxonomyCard from '../TaxonomyCard';

describe('Taxonomy Card tests', () => {
  it('should render', () => {
    const { asFragment } = customRender(<TaxonomyCard data={mockData[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow card navigation', () => {
    const { history } = customRender(<TaxonomyCard data={mockData[0]} />);
    fireEvent.click(within(screen.getByRole('heading')).getByRole('link'));
    expect(history.location.pathname).toMatch('/taxonomy/1441288');
  });
});
