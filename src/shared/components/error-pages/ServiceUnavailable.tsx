import { HTMLAttributes, useEffect } from 'react';
import { Message } from 'franklin-sites';

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
  const retryIndex = +(sessionStorage.getItem(KEY) || 0);
  const willReload = !noReload && navigator.onLine && retryIndex in BACKOFF;

  useEffect(() => {
    let timeout: number | undefined;
    if (willReload) {
      timeout = window.setTimeout(() => {
        sessionStorage.setItem(KEY, `${retryIndex + 1}`);
        document.location.reload();
      }, BACKOFF[retryIndex] * 1000);
    }

    return () => {
      window.sessionStorage.removeItem(KEY);
      window.clearTimeout(timeout);
    };
  }, [retryIndex, willReload]);

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
