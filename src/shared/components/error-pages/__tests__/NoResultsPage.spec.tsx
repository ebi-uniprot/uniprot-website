import { screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import NoResultsPage from '../full-pages/NoResultsPage';

describe('NoResultsPage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<NoResultsPage />);
    expect(screen.getByText(/no results were found/)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
