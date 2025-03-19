import { noop } from 'lodash-es';
import { useEffect, useMemo } from 'react';

const support = document.createElement('link').relList?.supports?.('prefetch');

type UsePrefetch = (url?: string | null) => void;

// See: https://web.dev/link-prefetch/
// This needs to be used with correct server caching, otherwise there's no
// benefit to this approach.
// TODO: make sure to implement correct caching behaviour on API
const usePrefetch: UsePrefetch = support
  ? (url?: string | null) => {
      const link = useMemo(() => {
        const link = document.createElement('link');
        link.setAttribute('rel', 'prefetch');
        link.setAttribute('as', 'fetch');
        link.setAttribute('crossorigin', 'anonymous');
        link.dataset.testid = 'prefetch';
        return link;
      }, []);

      useEffect(() => {
        if (!url) {
          link.removeAttribute('href');
        } else {
          link.setAttribute('href', url);
        }
      }, [link, url]);

      useEffect(() => {
        document.head.appendChild(link);
        return () => {
          document.head.removeChild(link);
        };
      }, [link]);
    }
  : noop;

export default usePrefetch;
