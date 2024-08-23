import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import NoResultsPage from '../full-pages/NoResultsPage';

jest.mock('../../error-component/ErrorBoundary', () => ({
  __esModule: true,
  default: () => '{{ ErrorBoundary }}',
}));

describe('NoResultsPage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<NoResultsPage />);
    expect(screen.getByText(/no results were found/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
