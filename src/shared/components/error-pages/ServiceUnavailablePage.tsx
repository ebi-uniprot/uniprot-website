import { useEffect } from 'react';
import { Message } from 'franklin-sites';

import ErrorPage from './ErrorPage';

import ArtWork from './svgs/503.img.svg';

const BACKOFF = [2, 10, 30, 60] as const;
const KEY = 'retry-index';

const ServiceUnavailablePage = () => {
  const retryIndex = +(sessionStorage.getItem(KEY) || 0);
  const willReload = navigator.onLine && retryIndex in BACKOFF;

  useEffect(() => {
    let timeout: number | undefined;
    if (willReload) {
      timeout = window.setTimeout(() => {
        sessionStorage.setItem(KEY, `${retryIndex + 1}`);
        document.location.reload();
      }, BACKOFF[retryIndex] * 1000);
    } else {
      window.sessionStorage.removeItem(KEY);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [retryIndex, willReload]);

  return (
    <ErrorPage
      artwork={<img src={ArtWork} width="400" height="400" alt="" />}
      message={
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
      }
    />
  );
};

export default ServiceUnavailablePage;
