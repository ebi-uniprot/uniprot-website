import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { type JsonValue } from 'type-fest';

import * as logging from '../utils/logging';

export type SessionPreferenceKey = 'ai-annotations';

const wrappedGet = (key: SessionPreferenceKey) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    logging.warn('Error accessing sessionStorage');
    return null;
  }
};

const wrappedSet = (key: SessionPreferenceKey, value: string) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    logging.warn('Error accessing sessionStorage');
  }
};

const initialiser = <T extends JsonValue>(
  key: SessionPreferenceKey,
  defaultValueStr: string
): T => {
  const inStore = typeof window === 'undefined' ? null : wrappedGet(key);
  if (typeof inStore !== 'string') {
    if (typeof window !== 'undefined') {
      wrappedSet(key, defaultValueStr);
    }
    return JSON.parse(defaultValueStr);
  }
  return JSON.parse(inStore);
};

function useSessionStorage<T extends JsonValue>(
  key: SessionPreferenceKey,
  defaultValue: T
): [state: T, setState: Dispatch<SetStateAction<T>>] {
  const defaultValueStr = JSON.stringify(defaultValue);

  const [state, setState] = useState<T>(() =>
    initialiser<T>(key, defaultValueStr)
  );

  useEffect(() => {
    setState(initialiser<T>(key, defaultValueStr));
  }, [key, defaultValueStr]);

  const setStateAndPersist = useCallback<Dispatch<SetStateAction<T>>>(
    (valueOrSetter) => {
      setState((currentState) => {
        const valueToStore =
          typeof valueOrSetter === 'function'
            ? valueOrSetter(currentState)
            : valueOrSetter;
        wrappedSet(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    },
    [key]
  );

  return [state, setStateAndPersist];
}

export default useSessionStorage;
