import { useState, useEffect } from 'react';

/** NOTE: This query means that an unsupported browser will default to this hook
 * returning a value of false (as in "please give me animations"). Maybe we
 * should turn it the other way around and have unsupported default to "reduce"?
 */
const QUERY = '(prefers-reduced-motion: reduce)';

const isSupported = 'matchMedia' in window;

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(
    isSupported ? window.matchMedia(QUERY).matches : false
  );

  useEffect(() => {
    if (!isSupported) {
      return;
    }

    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQueryList.addListener(listener);
    // eslint-disable-next-line consistent-return
    return () => mediaQueryList.removeListener(listener);
  }, []);

  return reducedMotion;
};

export default useReducedMotion;
