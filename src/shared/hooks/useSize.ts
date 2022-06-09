import { MutableRefObject, useCallback, useEffect, useState } from 'react';

type ContainerElement = HTMLElement | SVGElement | SVGSVGElement;

// NOTE: we might want to use ResizeObserver in the future

/**
 * given a reference to an actual HTML element, gives us access to its size
 * even through resizes and zoom
 * @param {MutableRefObject<HTMLElement>} ref
 * @returns {Array} tuple - return tuple
 * @returns {DOMRect | null} tuple[0]
 *          DOMRect object with the sizes of the passed ref, or null if no ref
 * @returns {() => void} tuple[1]
 *          Manual refresh function, to call if the size needs to be recomputed
 *          for whatever reason (e.g. content changed)
 */
function useSize<E extends ContainerElement = ContainerElement>(
  ref: MutableRefObject<E | undefined | null>
): [domRect: DOMRect | null, forceRefresh: () => void] {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const onResize = useCallback(() => {
    if (!ref.current) {
      return;
    }
    setRect(ref.current.getBoundingClientRect());
  }, [ref, setRect]);

  // This effect will run after EVERY render
  useEffect(() => {
    // ask for size value until we finally get one
    if (!rect) {
      onResize();
    }
  }); // No dependency array, it's on purpose!

  useEffect(() => {
    onResize(); // first time
    window.addEventListener('resize', onResize, { passive: true });
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('resize', onResize);
  }, [ref, onResize]);

  return [rect, onResize];
}

export default useSize;
