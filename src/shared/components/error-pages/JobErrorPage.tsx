import { Message } from 'franklin-sites';

import ErrorPage from './ErrorPage';

import ArtWork from './svgs/job-failed.svg';

type Props = {
  text: string;
};

const ErrorMessage = ({ text }: Props) => (
  <Message level="failure">
    <h4>Job Failed</h4>
    <span>{text}</span>
  </Message>
);

const JobErrorPage = ({ text }: Props) => (
  <ErrorPage artwork={<ArtWork />} message={<ErrorMessage text={text} />} />
);

export default JobErrorPage;
