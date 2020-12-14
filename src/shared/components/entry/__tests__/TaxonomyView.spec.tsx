import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import TaxonomyView from '../TaxonomyView';

import TaxonomyUIDataJson from './__mocks__/taxonomyUIData.json';

describe('Organism', () => {
  test('should render organism', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TaxonomyView data={TaxonomyUIDataJson} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
