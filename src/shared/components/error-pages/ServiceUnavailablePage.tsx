import { Message } from 'franklin-sites';
import ErrorPage from './ErrorPage';
import ArtWork from './svgs/503.svg';

const ErrorMessage = () => (
  <Message level="failure">
    <h4>This service is currently unavailable!</h4>
    <span>Please try again later</span>
  </Message>
);

const ServiceUnavailablePage = () => (
  <ErrorPage artwork={<ArtWork />} message={<ErrorMessage />} />
);

export default ServiceUnavailablePage;
