import { act } from '@testing-library/react';

/**
 * Flush pending microtasks and timers so React state updates triggered by
 * lazy-loaded suspended resources (e.g. nightingale track elements) or
 * in-flight `useDataApi` requests run inside `act`, avoiding act() warnings
 * after a render.
 */
const settle = () =>
  act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve);
    });
  });

export default settle;
