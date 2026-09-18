import { Message } from 'franklin-sites';
import { type HTMLAttributes, useEffect, useState } from 'react';

import jitter from '../../utils/jitter';
import ErrorComponent from './ErrorComponent';
import ArtWork from './svgs/503.img.svg';

const BACKOFF = [5, 20] as const;
const KEY = 'retry-index';

type ServiceUnavailableProps = {
  noReload?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const ServiceUnavailable = ({
  noReload,
  ...props
}: ServiceUnavailableProps) => {
  const [retryIndex] = useState(() => +(sessionStorage.getItem(KEY) || 0));
  const willReload = !noReload && navigator.onLine && retryIndex in BACKOFF;
  // Jittered so that clients that failed together don't reload together -- a
  // reload re-requests everything the page needs, not one call. Fixed for the
  // life of the component: a re-render must not move the deadline. The message
  // below quotes the floor, not this exact value.
  const [delayMs] = useState(() =>
    willReload ? jitter(BACKOFF[retryIndex] * 1_000) : undefined
  );

  useEffect(() => {
    let timeout: number | undefined;
    if (willReload) {
      timeout = window.setTimeout(() => {
        sessionStorage.setItem(KEY, `${retryIndex + 1}`);
        document.location.reload();
      }, delayMs);
    }

    return () => {
      window.sessionStorage.removeItem(KEY);
      window.clearTimeout(timeout);
    };
  }, [delayMs, retryIndex, willReload]);

  return (
    <ErrorComponent
      {...props}
      artwork={<img src={ArtWork} width="400" height="400" alt="" />}
    >
      <Message level="failure">
        <h4>This service is currently unavailable!</h4>
        <div>Please try again later</div>
        {willReload && (
          <small>
            We will reload this page for you in {BACKOFF[retryIndex]} seconds
          </small>
        )}
        {!navigator.onLine && (
          <small>
            You appear to be offline, make sure to get a network connection
            before retrying
          </small>
        )}
      </Message>
    </ErrorComponent>
  );
};

export default ServiceUnavailable;
