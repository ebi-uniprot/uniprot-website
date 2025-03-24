import { useEffect } from 'react';
import { schedule, sleep } from 'timing-functions';

import useSafeState from './useSafeState';

type Options = {
  first: number;
  increment: number;
  max: number;
  delay: number;
};

const useStaggeredRenderingHelper = (options?: Partial<Options>): number => {
  const isUndefined = !options;
  const { first = 1, increment, max = 10, delay = 0 } = options || {};
  const inc = increment ?? first;

  const [nItems, setNItems] = useSafeState(options && first);

  useEffect(() => {
    if (isUndefined) {
      return;
    }
    (async () => {
      // wait for the amount of time specified
      await sleep(delay);
      // then wait a bit more for the browser to be idle
      await schedule(delay / 2);
      setNItems((nItems) => {
        const next = (nItems ?? first) + inc;
        if (next >= max) {
          return +Infinity;
        }
        return next;
      });
    })();
  }, [isUndefined, first, delay, inc, max, nItems, setNItems]);

  return nItems ?? first ?? 0;
};

export default useStaggeredRenderingHelper;
