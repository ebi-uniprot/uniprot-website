import { Message } from 'franklin-sites';
import ErrorPage from './ErrorPage';
import ArtWork from './svgs/404.svg';

const ErrorMessage = () => (
  <Message level="failure">
    <h4>Sorry, this page can&apos;t be found!</h4>
    <span>Please check the address bar for any mistakes</span>
  </Message>
);

const ResourceNotFoundPage = () => (
  <ErrorPage artwork={<ArtWork />} message={<ErrorMessage />} />
);

export default ResourceNotFoundPage;
