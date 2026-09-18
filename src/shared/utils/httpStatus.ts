// Statuses that mean "ask again later" rather than "here is your answer"
const TRANSIENT_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

/**
 * Worth asking again: the server said to come back, or never answered at all
 * (no status means a network error or a timeout).
 */
export const isTransientStatus = (status?: number) =>
  status === undefined || TRANSIENT_STATUSES.has(status);

/**
 * The resource genuinely is not there, and asking again will not change that.
 * The only case where telling a crawler to forget the page is right.
 */
export const isPermanentStatus = (status?: number) =>
  status !== undefined &&
  status >= 400 &&
  status < 500 &&
  !TRANSIENT_STATUSES.has(status);
