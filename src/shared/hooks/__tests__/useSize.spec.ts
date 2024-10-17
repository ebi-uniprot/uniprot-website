import { renderHook, act } from '@testing-library/react';

import useSize from '../useSize';

/**
 * JSDOM doesn't render elements and gives them no size, so we're not going to
 * be able to test everything, focus on what we know we are going to be using
 */

describe('useSize', () => {
  test('basic usage', () => {
    const ref = { current: document.createElement('p') };
    const { result, rerender } = renderHook(() => useSize(ref));

    const firstSize = result.current[0];

    expect(typeof firstSize).toBe('object');
    // only testing this as this is what we'll need
    expect(firstSize?.width).toBe(0);

    // rerender, as if for whatever reason, not resizing-related
    rerender(ref);
    // expect to get the exact same object
    expect(result.current[0]).toBe(firstSize);

    act(() => {
      window.dispatchEvent(new window.Event('resize'));
    });
    // expect a brand new object after a resize event
    expect(result.current[0]).not.toBe(firstSize);
  });
});
