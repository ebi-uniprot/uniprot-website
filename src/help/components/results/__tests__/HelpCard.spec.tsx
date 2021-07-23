import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import HelpCard from '../HelpCard';

// TODO: replace with mocks when API is stable
// import helpData from '../../../__mocks__/helpModelData';

describe('HelpCard tests', () => {
  const title = 'This is an help page';

  it('should render the card component', () => {
    const { asFragment } = customRender(
      <HelpCard id="help-page" title={title} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  });

  it('should render the card component and find highlights', () => {
    const { asFragment } = customRender(
      <HelpCard id="help-page" title={title} contentMatch="content match" />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText('content match')).toBeInTheDocument();
  });
});
