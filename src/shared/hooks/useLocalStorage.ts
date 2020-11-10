import { useState, useRef, useCallback } from 'react';
import { noop } from 'lodash-es';

type JSONPrimitive = null | boolean | number | string;
type JSONDict = { [key: string]: JSONPrimitive | JSONDict | JSONList };
type JSONList = Array<JSONPrimitive | JSONList | JSONDict>;
type JSONSerializable = JSONPrimitive | JSONDict | JSONList;

const cancelIdleCallback = window.cancelIdleCallback || noop;
// fallback: execute rightaway
const requestIdleCallback =
  window.requestIdleCallback || ((fn: () => unknown) => fn());

type Output<T> = [
  value: T | null,
  setValue: (value: T | null) => void,
  deleteValue: () => void
];

function useLocalStorage<T extends JSONSerializable>(
  key: string,
  initialValue: T | null = null
): Output<T> {
  type State = T | null;

  const handle = useRef<number>();

  const [state, setState] = useState<State>(() => {
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
    (value: State | ((prevState: State) => State)) => {
      const valueToStore = typeof value === 'function' ? value(state) : value;
      setState(valueToStore);

      if (handle.current !== undefined) {
        cancelIdleCallback(handle.current);
      }
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
    if (handle.current !== undefined) {
      cancelIdleCallback(handle.current);
    }
    handle.current = requestIdleCallback(() => {
      window.localStorage.removeItem('key');
    });
  }, [setValue]);

  return [state, setValue, deleteValue];
}

export default useLocalStorage;
