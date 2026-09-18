/**
 * Spread a delay over [ms, 2 * ms). Everything that failed did so at the same
 * moment -- the outage is what synchronises them -- so a fixed delay sends a
 * struggling API one synchronised wave, whether that is a retry or a reload.
 * The random half spreads them out; the fixed half keeps a floor, so the wait
 * is never shorter than the delay asked for.
 */
const jitter = (ms: number) => ms + Math.random() * ms;

export default jitter;
