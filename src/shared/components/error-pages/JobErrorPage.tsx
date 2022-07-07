import { ReactNode } from 'react';
import { Message } from 'franklin-sites';

import ErrorPage from './ErrorPage';

import ArtWork from './svgs/job-failed.svg';

type Props = {
  message: ReactNode;
};

const ErrorMessage = ({ message }: Props) => (
  <Message level="failure">
    <h4>Job Failed</h4>
    <span>{message}</span>
  </Message>
);

const JobErrorPage = ({ message }: Props) => (
  <ErrorPage
    artwork={<ArtWork />}
    message={<ErrorMessage message={message} />}
  />
);

export default JobErrorPage;
