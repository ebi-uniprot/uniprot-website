import { throttle } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { Thing, WithContext } from 'schema-dts';

/**
 * NOTE: you can test the rendered script tag by pasting it in
 * https://search.google.com/test/rich-results
 */

/**
 * Custom hook to inject structured data into the header
 * @param {StructuredData} structuredData - Object containing the structured
 * data, make sure it is memoized
 * @param {number} [throttleTime=250] - time passed to the throttle function,
 * in case we need to tune the priority of rendering of a specific component
 */
const useStructuredData = <Schema extends Thing>(
  structuredData?: WithContext<Schema>,
  throttleTime = 250
) => {
  const script = useRef<HTMLScriptElement>();

  const inject = useRef(
    throttle((value?: WithContext<Schema>) => {
      if (!script.current) {
        return;
      }

      let content = '';
      if (structuredData) {
        try {
          content = JSON.stringify(value, undefined, 2);
        } catch {
          // eslint-disable-next-line no-console
          console.warn('Something went wrong when stringifying:', value);
        }
      }
      script.current.textContent = content;
    }, throttleTime)
  );

  useEffect(() => {
    script.current = document.createElement('script');
    script.current.type = 'application/ld+json';
    document.head.appendChild(script.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      inject.current.cancel();
      if (script.current) {
        document.head.removeChild(script.current);
      }
    };
  }, []);

  useEffect(() => {
    inject.current?.(structuredData);
  }, [structuredData]);
};

export default useStructuredData;
