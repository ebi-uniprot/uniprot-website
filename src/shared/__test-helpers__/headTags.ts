import { act } from '@testing-library/react';

import { STRUCTURED_DATA_THROTTLE_MS } from '../hooks/useStructuredData';

export const canonical = () => document.querySelector('link[rel="canonical"]');

export const robots = () => document.querySelector('meta[name="robots"]');

export const structuredData = () =>
  Array.from(
    document.querySelectorAll('script[type="application/ld+json"]'),
    (script) => script.textContent
  );

/**
 * react-helmet-async writes to `document.head` outside React's tree, so tags
 * survive an unmount and leak into the next test. Call in a `beforeEach` of
 * any spec asserting on them -- especially one asserting a tag is *absent*,
 * which a leftover from a previous test would silently turn into a pass.
 */
export const clearHeadTags = () => {
  for (const tag of document.querySelectorAll(
    'link[rel="canonical"], meta[name="robots"], script[type="application/ld+json"]'
  )) {
    tag.remove();
  }
};

/**
 * useStructuredData writes on the trailing edge of a throttle: a spec asserting
 * JSON-LD is absent must wait that out, or it passes before anything could have
 * been written. A timer queued after the throttle's own is guaranteed to fire
 * after it, so this is deterministic, not a race.
 */
export const settleStructuredData = () =>
  act(
    () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, STRUCTURED_DATA_THROTTLE_MS + 50);
      })
  );
