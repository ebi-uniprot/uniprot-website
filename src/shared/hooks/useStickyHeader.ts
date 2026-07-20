import { useCallback, useEffect, useRef, useState } from 'react';

// Tracks whether a header element has scrolled out of the viewport so a
// compact sticky bar can be shown in its place. Returns the current stuck
// state and a ref callback to attach to the header element.
//
// A ref callback (rather than useRef) is used so the element is observed the
// moment it attaches and stops being observed when it detaches — this avoids
// the initial-mount race where a conditionally-rendered header isn't in the
// DOM yet when an effect runs.
const useStickyHeader = (): [boolean, (node: HTMLElement | null) => void] => {
  const [isStuck, setIsStuck] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setHeaderRef = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsStuck(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return [isStuck, setHeaderRef];
};

export default useStickyHeader;
