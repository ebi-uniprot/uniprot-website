import { MutableRefObject, useEffect, useState, useCallback } from 'react';

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
function useSize<E extends HTMLElement = HTMLElement>(
  ref: MutableRefObject<E | undefined>
): [DOMRect | null, () => void] {
  const [rect, setRect] = useState<DOMRect | null>(null);

  const onResize = useCallback(() => {
    if (!ref.current) {
      return;
    }
    setRect(ref.current.getBoundingClientRect());
  }, [ref]);

  useEffect(() => {
    if (!ref.current) {
      setRect(null);
      return;
    }

    onResize(); // first time
    window.addEventListener('resize', onResize);
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('resize', onResize);
  }, [ref, onResize]);

  return [rect, onResize];
}

export default useSize;
