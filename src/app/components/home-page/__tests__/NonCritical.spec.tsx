import { screen } from '@testing-library/react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import HomePageNonCritical from '../NonCritical';

describe('non-critical HomePage component', () => {
  it('should render', async () => {
    const { asFragment } = customRender(<HomePageNonCritical />);
    await screen.findByText('UniProt core data');
    expect(asFragment()).toMatchSnapshot();
  });
});
