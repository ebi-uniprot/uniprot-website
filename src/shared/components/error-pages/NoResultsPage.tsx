import { Message } from 'franklin-sites';

import ErrorPage from './ErrorPage';

import ArtWork from './svgs/no-results-found.svg';

const ErrorMessage = () => (
  <Message level="info">
    <h4>Sorry, no results were found!</h4>
    <span>Please try a different criteria</span>
  </Message>
);

const NoResultsPage = () => (
  <ErrorPage
    artwork={<ArtWork />}
    message={<ErrorMessage />}
    data-testid="no-results-page"
  />
);

export default NoResultsPage;
