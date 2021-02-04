import { screen } from '@testing-library/react';

import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import NoResultsPage from '../NoResultsPage';

describe('NoResultsPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<NoResultsPage />);
    expect(screen.getByTestId('no-results-page')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
