export const canonical = () => document.querySelector('link[rel="canonical"]');

export const robots = () => document.querySelector('meta[name="robots"]');

/**
 * react-helmet-async writes to `document.head` outside React's tree, so tags
 * survive an unmount and leak into the next test. Call in a `beforeEach` of
 * any spec asserting on them -- especially one asserting a tag is *absent*,
 * which a leftover from a previous test would silently turn into a pass.
 */
export const clearHeadTags = () => {
  for (const tag of document.querySelectorAll(
    'link[rel="canonical"], meta[name="robots"]'
  )) {
    tag.remove();
  }
};
