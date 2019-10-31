import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import OrganismView from '../OrganismView';
import OrganismUIDataJson from '../__mocks__/OrganismUIData.json';

describe('Organism', () => {
  test('should render organism', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <OrganismView data={OrganismUIDataJson} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
