/**
 * Spies on `window.setTimeout` and reports only the delays long enough to be
 * one of our reload backoffs -- anything under a second is React or franklin
 * scheduling. Asserting on what was scheduled, rather than waiting for it,
 * states the contract exactly and doesn't make the suite sit through it.
 *
 * Call in a `beforeEach`, `restore` in the matching `afterEach`. Render with
 * plain `customRender` in between: spying on `setTimeout` makes testing-library
 * take us for fake timers, so its own waiting helpers cannot be relied on.
 */
const spyOnReloadTimers = () => {
  const spy = jest.spyOn(window, 'setTimeout');
  const clearSpy = jest.spyOn(window, 'clearTimeout');
  const reloadCalls = () =>
    spy.mock.calls
      .map(([, delay], i) => ({ delay, handle: spy.mock.results[i]?.value }))
      .filter(
        (call): call is { delay: number; handle: unknown } =>
          typeof call.delay === 'number' && call.delay >= 1_000
      );
  return {
    scheduledReloadDelays: () => reloadCalls().map(({ delay }) => delay),
    /** The scheduled reloads that were then called off */
    clearedReloadCount: () => {
      const cleared = new Set<unknown>(
        clearSpy.mock.calls.map(([handle]) => handle)
      );
      return reloadCalls().filter(({ handle }) => cleared.has(handle)).length;
    },
    restore: () => {
      spy.mockRestore();
      clearSpy.mockRestore();
    },
  };
};

export default spyOnReloadTimers;
