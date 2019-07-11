import React from 'react';
import { render } from '@testing-library/react';
import OrganismView from '../OrganismView';
import OrganismUIDataJson from '../__mocks__/OrganismUIData.json';

describe('Organism', () => {
  test('should render organism', () => {
    const { asFragment } = render(<OrganismView data={OrganismUIDataJson} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
