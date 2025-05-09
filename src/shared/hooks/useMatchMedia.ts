import { useEffect, useState } from 'react';

const isSupported = 'matchMedia' in window;

const useMatchMedia = (query: string, defaultMatch = false) => {
  const [match, setMatch] = useState(
    isSupported ? window.matchMedia(query).matches : defaultMatch
  );

  useEffect(() => {
    if (!isSupported) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatch(event.matches);
    };

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return match;
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
