import { Message } from 'franklin-sites';

const BlastResultsIssueMessage = () => (
  <Message level="failure">
    There is currently an issue presenting <span translate="no">BLAST</span>{' '}
    results within the website. It is still possible to submit jobs but the
    results will only be available within the Text Output tab and for
    downloading. We are working to resolve this issue as soon as possible. We
    apologize for any inconvenience.
  </Message>
);

export default BlastResultsIssueMessage;
