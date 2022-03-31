import { Message } from 'franklin-sites';

import ErrorPage from './ErrorPage';

import ArtWork from './svgs/no-results-found.svg';

const ErrorMessage = () => (
  <Message level="info">
    <h4>Sorry, no results were found!</h4>
    <span>Please try a different criteria</span>
  </Message>
);

type Props = {
  message?: JSX.Element;
};

const NoResultsPage = ({ message = <ErrorMessage /> }: Props) => (
  <ErrorPage
    artwork={<ArtWork />}
    message={message}
    data-testid="no-results-page"
  />
);

export default NoResultsPage;
