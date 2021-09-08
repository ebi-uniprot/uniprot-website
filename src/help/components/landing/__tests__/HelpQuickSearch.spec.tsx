import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import HelpQuickSearch from '../HelpQuickSearch';

// TODO: replace with mocks when API is stable
// import helpData from '../../../__mocks__/helpModelData';

describe('HelpQuickSearch tests', () => {
  it('should render', () => {
    const { asFragment } = customRender(<HelpQuickSearch />);
    expect(asFragment()).toMatchSnapshot();
    // expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  });
});
