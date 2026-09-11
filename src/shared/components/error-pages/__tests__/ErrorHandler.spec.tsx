import { screen, waitFor } from '@testing-library/react';

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
});
