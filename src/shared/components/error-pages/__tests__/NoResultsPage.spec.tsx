import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import NoResultsPage from '../NoResultsPage';

describe('NoResultsPage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<NoResultsPage />);
    expect(screen.getByTestId('no-results-page')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
