import { Message } from 'franklin-sites';

import ErrorPage from './ErrorPage';

import ArtWork from './svgs/job-failed.svg';

const ErrorMessage = () => (
  <Message level="failure">
    <h4>Job Failed</h4>
    <span>Custom message here</span>
  </Message>
);

const JobErrorPage = () => (
  <ErrorPage artwork={<ArtWork />} message={<ErrorMessage />} />
);

export default JobErrorPage;
