/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useCallback } from 'react';

declare global {
  interface Window {
    requestIdleCallback: (
      callback: () => void,
      options?: { timeout: number }
    ) => any;
    cancelIdleCallback: (handle: any) => void;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
type Serializable = null | boolean | number | string | object;

// fallback: noop
// eslint-disable-next-line @typescript-eslint/no-empty-function
const cancelIdleCallback = window.cancelIdleCallback || (() => {});
// fallback: execute rightaway
const requestIdleCallback =
  window.requestIdleCallback || ((fn: () => any) => fn());

type Output<T> = [
  value: T | null,
  setValue: (value: T | null) => void,
  deleteValue: () => void
];

function useLocalStorage<T extends Serializable>(
  key: string,
  initialValue: T | null = null
): Output<T> {
  const handle = useRef();

  const [state, setState] = useState<T | null>(() => {
    const stored = window.localStorage.getItem(key);
    let parsed = null;
    try {
      parsed = JSON.parse(stored || '');
      return parsed;
    } catch {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | null) => {
      const valueToStore = typeof value === 'function' ? value(state) : value;
      setState(valueToStore);

      cancelIdleCallback(handle.current);
      handle.current = requestIdleCallback(() => {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
          /* if it's not stringifiable, can't save it */
        }
      });
    },
    [key, state]
  );

  const deleteValue = useCallback(() => {
    setValue(null);
    cancelIdleCallback(handle.current);
    handle.current = requestIdleCallback(() => {
      window.localStorage.removeItem('key');
    });
  }, [setValue]);

  return [state, setValue, deleteValue];
}

export default useLocalStorage;
