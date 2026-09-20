/**
 * Spread a delay over [ms, 2 * ms). Everything that failed did so at the same
 * moment -- the outage is what synchronises them -- so a fixed delay sends a
 * struggling API one synchronised wave, whether that is a retry or a reload.
 * The random half spreads them out; the fixed half keeps a floor, so the wait
 * is never shorter than the delay asked for. Pass `fraction` to fix the random
 * part -- for a delay that must be recomputed from changing inputs without
 * moving on every render.
 */
const jitter = (ms: number, fraction = Math.random()) => ms + fraction * ms;

export default jitter;
