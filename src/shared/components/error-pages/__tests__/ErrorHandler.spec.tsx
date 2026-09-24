import { screen, waitFor } from '@testing-library/react';

import responseError from '../../../__test-helpers__/axiosError';
import customRender from '../../../__test-helpers__/customRender';
import { clearHeadTags, robots } from '../../../__test-helpers__/headTags';
import spyOnReloadTimers from '../../../__test-helpers__/reloadTimers';
import renderAndFlushHead from '../../../__test-helpers__/renderAndFlushHead';
import { type CustomError } from '../../../hooks/useDataApi';
import ErrorHandler from '../ErrorHandler';

jest.mock('../../error-component/ErrorBoundary', () => ({
  __esModule: true,
  default: () => '{{ ErrorBoundary }}',
}));

beforeEach(clearHeadTags);

describe('ErrorHandler', () => {
  // A 5xx or a timeout is the API having a bad minute, and a 429 means our own
  // crawl caused it. noindex here asks Google to drop a page that is fine.
  it.each([500, 502, 503, 504, 408, 425, 429, undefined])(
    'does not noindex on a transient error (%s)',
    async (status) => {
      await renderAndFlushHead(
        <ErrorHandler status={status} fullPage noReload />
      );

      expect(robots()).toBeNull();
    }
  );

  it.each([400, 404, 410])(
    'still noindexes a permanent error (%s)',
    async (status) => {
      await renderAndFlushHead(
        <ErrorHandler status={status} fullPage noReload />
      );

      await waitFor(() =>
        expect(robots()).toHaveAttribute('content', 'noindex')
      );
    }
  );

  // Being rate limited or timing out is the API asking for another go, not a
  // missing page: it belongs on the same page as every other transient error
  it.each([408, 425, 429])(
    'offers a retry rather than a 404 for a %s',
    async (status) => {
      await renderAndFlushHead(
        <ErrorHandler status={status} fullPage noReload />
      );

      expect(
        screen.getByText('This service is currently unavailable!')
      ).toBeInTheDocument();
    }
  );

  it('still shows the 404 page for a permanent error', async () => {
    await renderAndFlushHead(<ErrorHandler status={404} fullPage noReload />);

    expect(
      screen.getByText("Sorry, this page can't be found!")
    ).toBeInTheDocument();
  });

  // No status and a SyntaxError: the response was not the JSON it claimed to
  // be, which is what a VPN or captive-portal interstitial looks like
  it('blames an interstitial for a syntax error with no status', async () => {
    const error = new SyntaxError(
      'Unexpected token <'
    ) as unknown as CustomError;
    await renderAndFlushHead(<ErrorHandler error={error} fullPage noReload />);

    expect(
      screen.getByRole('link', { name: 'report it to NordVPN' })
    ).toBeInTheDocument();
    // Not a missing page, so nothing tells a crawler to drop it
    expect(robots()).toBeNull();
  });

  it('does not touch the head when not rendering a full page', async () => {
    await renderAndFlushHead(<ErrorHandler status={404} noReload />);

    expect(robots()).toBeNull();
  });

  describe('auto-reload', () => {
    let timers: ReturnType<typeof spyOnReloadTimers>;

    beforeEach(() => {
      timers = spyOnReloadTimers();
    });

    afterEach(() => {
      timers.restore();
    });

    // A reload replaces the whole document. One failed widget on a page that is
    // otherwise fine is not a reason to re-request everything -- least of all
    // for a 429, where what a reload re-requests is what rate-limited us.
    it.each([500, 503, 429, 408, undefined])(
      'does not reload the page for an inline error (%s)',
      (status) => {
        customRender(<ErrorHandler status={status} />);

        expect(timers.scheduledReloadDelays()).toHaveLength(0);
      }
    );

    it('still reloads when the page itself is the error', () => {
      customRender(<ErrorHandler status={503} fullPage />);

      expect(timers.scheduledReloadDelays()).toHaveLength(1);
    });

    // withRetry refuses to wait in-request for a Retry-After this long; the
    // reload that follows must not then ignore it
    it('waits at least as long as a 429 Retry-After before reloading', () => {
      const error = responseError(429, { 'retry-after': '30' });
      customRender(<ErrorHandler status={429} error={error} fullPage />);

      const delays = timers.scheduledReloadDelays();
      expect(delays).toHaveLength(1);
      expect(delays[0]).toBeGreaterThanOrEqual(30_000);
    });
  });
});
