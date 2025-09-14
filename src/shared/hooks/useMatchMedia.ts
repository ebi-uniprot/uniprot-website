import { useMemo, useSyncExternalStore } from 'react';

const isSupported = typeof window !== 'undefined' && 'matchMedia' in window;

const useMatchMedia = (query: string, defaultMatch = false) => {
  const store = useMemo(() => {
    const getServerSnapshot = () => defaultMatch;
    if (!isSupported) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        subscribe: (_: () => void) => () => {},
        getSnapshot: () => defaultMatch,
        getServerSnapshot,
      };
    }
    const mediaQueryList = window.matchMedia(query);

    const subscribe = (callback: () => void) => {
      mediaQueryList.addEventListener('change', callback);
      return () => {
        mediaQueryList.removeEventListener('change', callback);
      };
    };
    const getSnapshot = () => mediaQueryList.matches;

    return {
      subscribe,
      getSnapshot,
      getServerSnapshot,
    };
  }, [query, defaultMatch]);

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );
};

export default useMatchMedia;

// Specific cases that need to be reused throughout the codebase

// Reduced motion
export const useReducedMotion = () =>
  useMatchMedia(
    /** NOTE: This query means that an unsupported browser will default to this
     * returning a false value of false (as in "please give me animations"). Maybe
     * we should turn it around and have unsupported default to "reduce"?
     */
    '(prefers-reduced-motion: reduce)'
  );

// Small screen (as defined in Franklin)
export const useSmallScreen = () =>
  useMatchMedia('only screen and (max-width: 640px)');

// Medium screen (as defined in Franklin)
export const useMediumScreen = () =>
  useMatchMedia('only screen and (max-width: 1024px)');
