import { screen, waitFor } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';
import { clearHeadTags, robots } from '../../../__test-helpers__/headTags';
import renderAndFlushHead from '../../../__test-helpers__/renderAndFlushHead';
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

  it('does not touch the head when not rendering a full page', async () => {
    await renderAndFlushHead(<ErrorHandler status={404} noReload />);

    expect(robots()).toBeNull();
  });

  describe('auto-reload', () => {
    let setTimeoutSpy: jest.SpyInstance;

    beforeEach(() => {
      setTimeoutSpy = jest.spyOn(window, 'setTimeout');
    });

    afterEach(() => {
      setTimeoutSpy.mockRestore();
    });

    // Anything shorter is React or franklin scheduling, not our backoff
    const scheduledReloadDelays = () =>
      setTimeoutSpy.mock.calls
        .map(([, delay]) => delay)
        .filter(
          (delay): delay is number =>
            typeof delay === 'number' && delay >= 1_000
        );

    // A reload replaces the whole document. One failed widget on a page that is
    // otherwise fine is not a reason to re-request everything -- least of all
    // for a 429, where what a reload re-requests is what rate-limited us.
    // Rendered with plain `customRender`: spying on `setTimeout` makes
    // testing-library take us for fake timers, and none of this needs the head.
    it.each([500, 503, 429, 408, undefined])(
      'does not reload the page for an inline error (%s)',
      (status) => {
        customRender(<ErrorHandler status={status} />);

        expect(scheduledReloadDelays()).toHaveLength(0);
      }
    );

    it('still reloads when the page itself is the error', () => {
      customRender(<ErrorHandler status={503} fullPage />);

      expect(scheduledReloadDelays()).toHaveLength(1);
    });
  });
});
