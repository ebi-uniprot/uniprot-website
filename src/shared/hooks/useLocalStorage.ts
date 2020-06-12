/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';

declare global {
  interface Window {
    requestIdleCallback: (
      callback: () => void,
      options?: { timeout: number }
    ) => any;
    cancelIdleCallback: (handle: any) => void;
  }
}

// fallback: noop
// eslint-disable-next-line @typescript-eslint/no-empty-function
const cancelIdleCallback = window.cancelIdleCallback || (() => {});
// fallback: execute rightaway
const requestIdleCallback =
  window.requestIdleCallback || ((fn: () => any) => fn());

const useLocalStorage = (key: string, initialValue: any = null) => {
  const handle = useRef();

  const [state, setState] = useState(() => {
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

  const setValue = (value: any) => {
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
  };

  const deleteValue = () => {
    setValue(null);
    cancelIdleCallback(handle.current);
    handle.current = requestIdleCallback(() => {
      window.localStorage.removeItem('key');
    });
  };

  return [state, setValue, deleteValue];
};

export default useLocalStorage;
