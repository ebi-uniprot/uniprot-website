import { useState, useRef, useCallback, useEffect } from 'react';
import { schedule, sleep } from 'timing-functions';

type Direction = null | 'up' | 'down';

const useScrollInfo = (
  selector: string
): { direction: Direction; scrollY: number } => {
  const [direction, setDirection] = useState<Direction>(null);
  const [previousScrollY, setPreviousScrollY] = useState(0);
  // Keep it also in a ref as we don't want to create a new function everytime
  const previousScrollYRef = useRef(previousScrollY);

  const willCheckFlag = useRef(false);
  const inactiveTimeout = useRef<number | null>(null);

  // Function to do a scroll position check
  const updateScrollDirection = useCallback(async (element: Element) => {
    // First thing, remove scheduling flag, we'll handle it now
    willCheckFlag.current = false;
    if (inactiveTimeout.current) {
      // Cancel any inactivity timeout callback
      window.clearTimeout(inactiveTimeout.current);
    }
    const currentScrollY = element.scrollTop;
    const direction =
      previousScrollYRef.current - currentScrollY > 0 ? 'up' : 'down';
    previousScrollYRef.current = currentScrollY;
    setPreviousScrollY(currentScrollY);
    setDirection(direction);
    // If inactive after 5 seconds, set direction to null
    inactiveTimeout.current = window.setTimeout(() => {
      setDirection(null);
    }, 5000);
  }, []);

  useEffect(() => {
    const scrollHandler = async (event: Event) => {
      if (
        // Check if we already scheduled a scroll check
        !willCheckFlag.current &&
        event.target &&
        event.target instanceof Element
      ) {
        willCheckFlag.current = true;
        await sleep(500); // wait a bit
        await schedule(500); // make sure to not interrupt anything important
        updateScrollDirection(event.target);
      }
    };
    const scrollableElement = document.querySelector(selector);
    scrollableElement?.addEventListener('scroll', scrollHandler, {
      passive: true,
    });
    return () => {
      scrollableElement?.removeEventListener('scroll', scrollHandler);
    };
  }, [selector, updateScrollDirection]);

  return { direction, scrollY: previousScrollY };
};

export default useScrollInfo;
