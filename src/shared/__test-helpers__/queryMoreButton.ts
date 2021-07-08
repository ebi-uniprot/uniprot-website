import { screen } from '@testing-library/react';

const queryShowMore = () =>
  screen.queryByTitle('Show more') ||
  screen.queryByTestId('expandable-message');

export default queryShowMore;
