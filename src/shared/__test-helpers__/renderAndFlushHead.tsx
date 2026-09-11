import { waitFor } from '@testing-library/react';
import { type ReactElement } from 'react';

import HTMLHead from '../components/HTMLHead';
import customRender from './customRender';

const BARRIER = 'head-flushed';

/**
 * Renders `ui` and waits for react-helmet-async to have written to
 * `document.head`. Helmet flushes on an animation frame, so `settle` is not
 * enough, and a component under test may legitimately render no head tags at
 * all -- there is nothing of its own to wait on. Rendering a marker title
 * alongside it gives a barrier that is guaranteed to appear, so a spec can
 * assert a tag is absent without racing the flush.
 */
const renderAndFlushHead = async (ui: ReactElement) => {
  const rendered = customRender(
    <>
      <HTMLHead title={BARRIER} />
      {ui}
    </>
  );
  await waitFor(() => expect(document.title).toBe(BARRIER));
  return rendered;
};

export default renderAndFlushHead;
