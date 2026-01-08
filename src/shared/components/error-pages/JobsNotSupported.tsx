import { Message } from 'franklin-sites';
import { type HTMLAttributes } from 'react';

import ErrorComponent from './ErrorComponent';
import ArtWork from './svgs/job-failed.img.svg';

const JobsNotSupported = (props: HTMLAttributes<HTMLDivElement>) => (
  <ErrorComponent
    {...props}
    artwork={<img src={ArtWork} width="400" height="400" alt="" />}
  >
    <Message level="failure">
      <h4>Job submission and results not available on this device.</h4>
      It looks like you&apos;re using a device or browser that isn&apos;t fully
      supported. To submit jobs or view results, please switch to a modern
      browser on a desktop or laptop computer.
    </Message>
  </ErrorComponent>
);

export default JobsNotSupported;
