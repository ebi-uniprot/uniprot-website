import customRender from '../../../__test-helpers__/customRender';
import spyOnReloadTimers from '../../../__test-helpers__/reloadTimers';
import ServiceUnavailable from '../ServiceUnavailable';

const KEY = 'retry-index';

const storeRetry = (
  index: number,
  overrides: Partial<{ page: string; at: number }> = {}
) =>
  sessionStorage.setItem(
    KEY,
    JSON.stringify({
      index,
      page: window.location.pathname + window.location.search,
      at: Date.now(),
      ...overrides,
    })
  );

describe('ServiceUnavailablePage component', () => {
  it('should render', () => {
    const { asFragment } = customRender(<ServiceUnavailable />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('auto-reload', () => {
    let timers: ReturnType<typeof spyOnReloadTimers>;

    beforeEach(() => {
      timers = spyOnReloadTimers();
      sessionStorage.removeItem(KEY);
    });

    afterEach(() => {
      timers.restore();
      sessionStorage.removeItem(KEY);
    });

    it('spreads the reload out instead of reloading every client at once', () => {
      for (let i = 0; i < 12; i += 1) {
        customRender(<ServiceUnavailable />);
      }

      const delays = timers.scheduledReloadDelays();
      expect(delays).toHaveLength(12);
      // Never sooner than the delay it used to always wait, never past double
      for (const delay of delays) {
        expect(delay).toBeGreaterThanOrEqual(5_000);
        expect(delay).toBeLessThan(10_000);
      }
      // The whole point: they must not all land on the same millisecond
      expect(new Set(delays).size).toBeGreaterThan(1);
    });

    it('schedules nothing when reloading is suppressed', () => {
      customRender(<ServiceUnavailable noReload />);

      expect(timers.scheduledReloadDelays()).toHaveLength(0);
    });

    describe('Retry-After', () => {
      it('waits at least as long as the server asked, still jittered', () => {
        customRender(<ServiceUnavailable retryAfterMs={30_000} />);

        const [delay] = timers.scheduledReloadDelays();
        expect(delay).toBeGreaterThanOrEqual(30_000);
        expect(delay).toBeLessThan(60_000);
      });

      it('never reloads sooner than its own floor', () => {
        customRender(<ServiceUnavailable retryAfterMs={2_000} />);

        const [delay] = timers.scheduledReloadDelays();
        expect(delay).toBeGreaterThanOrEqual(5_000);
        expect(delay).toBeLessThan(10_000);
      });

      it('leaves the reload to the user when asked to wait too long', () => {
        const { getByText } = customRender(
          <ServiceUnavailable retryAfterMs={120_000} />
        );

        expect(timers.scheduledReloadDelays()).toHaveLength(0);
        expect(
          getByText('The service asked us to wait before trying again')
        ).toBeInTheDocument();
      });

      // A parent can render its status before the error that carries the
      // header; the reload scheduled off the first render must not stand
      it('reschedules when Retry-After only arrives on a later render', () => {
        const { rerender } = customRender(<ServiceUnavailable />);
        rerender(<ServiceUnavailable retryAfterMs={30_000} />);

        const delays = timers.scheduledReloadDelays();
        expect(delays).toHaveLength(2);
        expect(delays[0]).toBeLessThan(10_000);
        expect(delays[1]).toBeGreaterThanOrEqual(30_000);
        // The first one was called off, not left to fire early
        expect(timers.clearedReloadCount()).toBe(1);
      });

      it('does not move the deadline on a re-render with the same props', () => {
        const { rerender } = customRender(
          <ServiceUnavailable retryAfterMs={30_000} />
        );
        rerender(<ServiceUnavailable retryAfterMs={30_000} />);

        expect(timers.scheduledReloadDelays()).toHaveLength(1);
        expect(timers.clearedReloadCount()).toBe(0);
      });
    });

    describe('retry index across reloads', () => {
      it('picks up where the previous reload of this page left off', () => {
        storeRetry(1);
        customRender(<ServiceUnavailable />);

        const [delay] = timers.scheduledReloadDelays();
        expect(delay).toBeGreaterThanOrEqual(20_000);
        expect(delay).toBeLessThan(40_000);
      });

      it('starts over on a page that is not the one that reloaded', () => {
        storeRetry(1, { page: '/somewhere/else' });
        customRender(<ServiceUnavailable />);

        const [delay] = timers.scheduledReloadDelays();
        expect(delay).toBeLessThan(10_000);
      });

      // The entry page rewrites the hash on mount (isoforms); still the same
      // document, so still the same outage
      it('keeps the count when only the hash differs', () => {
        const { href } = window.location;
        window.history.replaceState(null, '', '/some/page?query=x');
        storeRetry(1);
        window.history.replaceState(null, '', '/some/page?query=x#fragment');
        try {
          customRender(<ServiceUnavailable />);

          const [delay] = timers.scheduledReloadDelays();
          expect(delay).toBeGreaterThanOrEqual(20_000);
        } finally {
          window.history.replaceState(null, '', href);
        }
      });

      it('starts over when the previous outage is long past', () => {
        storeRetry(1, { at: Date.now() - 10 * 60_000 });
        customRender(<ServiceUnavailable />);

        const [delay] = timers.scheduledReloadDelays();
        expect(delay).toBeLessThan(10_000);
      });

      it('starts over on a garbled entry', () => {
        sessionStorage.setItem(KEY, '1');
        customRender(<ServiceUnavailable />);

        const [delay] = timers.scheduledReloadDelays();
        expect(delay).toBeLessThan(10_000);
      });

      it('gives up after the last backoff', () => {
        storeRetry(2);
        customRender(<ServiceUnavailable />);

        expect(timers.scheduledReloadDelays()).toHaveLength(0);
      });

      it("does not let an inline widget's error wipe the page's count", () => {
        storeRetry(1);
        const { unmount } = customRender(<ServiceUnavailable noReload />);
        unmount();

        expect(sessionStorage.getItem(KEY)).not.toBeNull();
      });

      // A cleanup that touched storage would also run on StrictMode's double
      // mount in development and wipe the count the last reload wrote
      it('keeps the count across a mount and unmount', () => {
        storeRetry(1);
        const { unmount } = customRender(<ServiceUnavailable />);
        unmount();

        expect(sessionStorage.getItem(KEY)).not.toBeNull();
      });
    });
  });
});
