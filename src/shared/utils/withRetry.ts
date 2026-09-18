import { type AxiosError, isAxiosError, isCancel } from 'axios';

import { isTransientStatus } from './httpStatus';
import jitter from './jitter';

const MAX_RETRIES = 2;
// Floor of the first backoff, doubling with each attempt
const BASE_DELAY_MS = 150;
// Longer than this and the server is telling us to come back later than a page
// load can wait for
const MAX_RETRY_AFTER_MS = 3_000;

// The safe methods (RFC 9110): they only read, so replaying one cannot have an
// effect the single call did not. PUT and DELETE are idempotent by the same
// definition, but silently replaying a write is a surprise worth not springing.
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export const isSafeMethod = (method?: string) =>
  SAFE_METHODS.has((method || 'GET').toUpperCase());

const isTransient = (error: unknown): error is AxiosError => {
  // A cancellation is a decision, not a failure. Checked first because axios
  // models one as an AxiosError carrying no response -- the same shape as a
  // network error.
  if (isCancel(error)) {
    return false;
  }
  // Only a failed request is worth replaying. Anything else is a bug in our
  // own code, or a response that arrived but wasn't the JSON it claimed to be
  // -- the SyntaxError a VPN or captive-portal interstitial produces (see
  // NordVPNIssue). Asking again just gets the same thing back, more slowly.
  if (!isAxiosError(error)) {
    return false;
  }
  return isTransientStatus(error.response?.status);
};

/**
 * A 429 (and sometimes a 503) may carry Retry-After, as delta-seconds or an
 * HTTP date. Returns undefined when absent or unparseable.
 */
const retryAfterMs = (error: AxiosError) => {
  const header = error.response?.headers?.['retry-after'];
  if (typeof header !== 'string') {
    return undefined;
  }
  const seconds = Number(header);
  const ms = Number.isFinite(seconds)
    ? seconds * 1_000
    : Date.parse(header) - Date.now();
  return Number.isFinite(ms) && ms >= 0 ? ms : undefined;
};

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve) => {
    // Nothing left to wait for: the caller has already gone away
    if (signal?.aborted) {
      resolve();
      return;
    }
    // Aborted however the wait ends, which unhooks the listener below. `signal`
    // outlives the wait -- it belongs to the request, not to this backoff -- so
    // a listener left on it would be retained until the caller unmounts.
    const waited = new AbortController();
    const timeout = setTimeout(() => {
      waited.abort();
      resolve();
    }, ms);
    // Don't sit on a timer for a request nobody is waiting for any more
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timeout);
        resolve();
      },
      { signal: waited.signal }
    );
  });

type WithRetryOptions = {
  /**
   * Retrying replays the request, so it is only safe for a method that reads.
   * Callers that may issue a write must pass `false`.
   */
  enabled?: boolean;
  /** Abandons a pending backoff once the caller has gone away */
  signal?: AbortSignal;
  /** Called before each replay, once its backoff has elapsed */
  onRetry?: () => void;
};

/**
 * Retry transient failures and network errors, but never a cancellation and
 * never a 4xx that is an answer rather than a "come back later". Two retries
 * with a short backoff rides out a blip without turning a struggling API into
 * a stampede.
 */
const withRetry = <T>(
  attempt: () => Promise<T>,
  { enabled = true, signal, onRetry }: WithRetryOptions = {}
): Promise<T> => {
  if (!enabled) {
    return attempt();
  }

  const run = (retriesLeft: number): Promise<T> =>
    attempt().catch(async (error: unknown) => {
      if (retriesLeft <= 0 || !isTransient(error)) {
        throw error;
      }
      // Honour an explicit Retry-After rather than guessing over the top of it.
      // If it asks for longer than a page load can wait, give up instead of
      // ignoring it and hammering -- that is the case it exists to prevent.
      const requested = retryAfterMs(error);
      if (requested !== undefined && requested > MAX_RETRY_AFTER_MS) {
        throw error;
      }
      await sleep(
        // Still jittered on top of Retry-After: honouring it to the millisecond
        // would just re-synchronise everyone the server asked to back off.
        (requested ?? 0) +
          jitter(BASE_DELAY_MS * 2 ** (MAX_RETRIES - retriesLeft)),
        signal
      );
      // Unmounted or superseded while we were backing off
      if (signal?.aborted) {
        throw error;
      }
      // Reported here rather than before the backoff, so that a reported retry
      // is one that actually happened
      onRetry?.();
      return run(retriesLeft - 1);
    });

  return run(MAX_RETRIES);
};

export default withRetry;
