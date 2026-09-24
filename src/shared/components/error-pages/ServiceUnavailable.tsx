import { Message } from 'franklin-sites';
import { type HTMLAttributes, useEffect, useState } from 'react';

import jitter from '../../utils/jitter';
import ErrorComponent from './ErrorComponent';
import ArtWork from './svgs/503.img.svg';

const BACKOFF = [5, 20] as const;
const KEY = 'retry-index';
// A retry index only means something across the reload that wrote it. It is
// written the moment that reload fires, so this only has to outlast the page
// load that follows -- which, during an outage, is the time it takes every
// request the page makes to fail, retries included, with no timeout on any of
// them. Older than that and it is left over from an earlier outage that a
// reload already got past.
const STALE_MS = 5 * 60_000;
// Past this the server is asking for longer than anyone will sit on an error
// page: show it, and leave reloading to the user
const MAX_RELOAD_RETRY_AFTER_MS = 60_000;

type StoredRetry = { index: number; page: string; at: number };

// What a reload comes back to. The hash is left out: it is the same document,
// so the same outage, and the entry page rewrites it on mount for an isoform.
const pageKey = () => window.location.pathname + window.location.search;

/**
 * The index the previous reload left for this page, if it is recent and was
 * written for this very page. Anything else -- another page's outage, a stale
 * entry, garbage -- starts the sequence over.
 */
const readRetryIndex = () => {
  try {
    const stored = sessionStorage.getItem(KEY);
    if (!stored) {
      return 0;
    }
    const { index, page, at }: Partial<StoredRetry> = JSON.parse(stored);
    if (
      typeof index !== 'number' ||
      page !== pageKey() ||
      typeof at !== 'number' ||
      Date.now() - at > STALE_MS
    ) {
      return 0;
    }
    return index;
  } catch {
    return 0;
  }
};

const writeRetryIndex = (index: number) => {
  const stored: StoredRetry = {
    index,
    page: pageKey(),
    at: Date.now(),
  };
  sessionStorage.setItem(KEY, JSON.stringify(stored));
};

type ServiceUnavailableProps = {
  noReload?: boolean;
  /**
   * What the server's Retry-After asked for, when it sent one. A reload sooner
   * than that would be the very hammering the header exists to prevent.
   */
  retryAfterMs?: number;
} & HTMLAttributes<HTMLDivElement>;

const ServiceUnavailable = ({
  noReload,
  retryAfterMs,
  ...props
}: ServiceUnavailableProps) => {
  const [retryIndex] = useState(readRetryIndex);
  const askedToWait =
    retryAfterMs !== undefined && retryAfterMs > MAX_RELOAD_RETRY_AFTER_MS;
  const willReload =
    !noReload && !askedToWait && navigator.onLine && retryIndex in BACKOFF;
  // Jittered so that clients that failed together don't reload together -- a
  // reload re-requests everything the page needs, not one call. The random
  // part is fixed for the life of the component, so a re-render must not move
  // the deadline; the delay itself is not, so a Retry-After that only arrives
  // on a later render (a parent rendering status and error out of step) still
  // reschedules the reload. Derived from `retryIndex` alone rather than from
  // `willReload`, which a re-render can flip (coming back online, say).
  // Never shorter than Retry-After, still jittered on top of it: honouring it
  // to the millisecond would re-synchronise everyone the server asked to wait.
  const [fraction] = useState(Math.random);
  const delayMs =
    retryIndex in BACKOFF
      ? jitter(
          Math.max(BACKOFF[retryIndex] * 1_000, retryAfterMs ?? 0),
          fraction
        )
      : undefined;

  useEffect(() => {
    if (!(willReload && delayMs !== undefined)) {
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      writeRetryIndex(retryIndex + 1);
      document.location.reload();
    }, delayMs);

    // The key is left alone here on purpose: it is scoped to this URL and
    // expires on its own, and a cleanup that wrote to storage would run on
    // StrictMode's double mount too, wiping the count the last reload left
    return () => window.clearTimeout(timeout);
  }, [delayMs, retryIndex, willReload]);

  return (
    <ErrorComponent
      {...props}
      artwork={<img src={ArtWork} width="400" height="400" alt="" />}
    >
      <Message level="failure">
        <h4>This service is currently unavailable!</h4>
        <div>Please try again later</div>
        {willReload && <small>We will reload this page for you shortly</small>}
        {askedToWait && (
          <small>The service asked us to wait before trying again</small>
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
