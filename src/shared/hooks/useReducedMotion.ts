import { useState, useEffect } from 'react';

/** NOTE: This query means that an unsupported browser will default to this hook
 * returning a value of false (as in "please give me animations"). Maybe we
 * should turn it the other way around and have unsupported default to "reduce"?
 */
const QUERY = '(prefers-reduced-motion: reduce)';

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(
    window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, []);

  return reducedMotion;
};

export default useReducedMotion;
