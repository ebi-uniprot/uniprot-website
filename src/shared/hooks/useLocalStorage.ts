import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { frame } from 'timing-functions';
import { JsonValue } from 'type-fest';

import * as logging from '../utils/logging';

import { Namespace } from '../types/namespaces';

export type UserPreferenceKey =
  // gpdr banner
  | 'gdpr'
  // view mode: card vs table
  | 'view-mode'
  // column selection for the table views for all the namespaces
  | `table columns for ${Namespace}`
  // column selection for the xrefs table views for UniParc entries
  | `table columns for ${Namespace} entry page`
  // basket content
  | 'basket';

const wrappedGet: typeof window.localStorage.getItem = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    logging.warn('Error accessing localStorage');
  }
  return null;
};

const wrappedSet: typeof window.localStorage.setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    logging.warn('Error accessing localStorage');
  }
};

// Shared cache to avoid reading from disk in a blocking way multiple times when
// multiple hooks are used across the page.
// Exporting for test usage only
export const localStorageCache = new Map<UserPreferenceKey, string>();

const initialiser = <T extends JsonValue>(
  key: UserPreferenceKey,
  defaultValueStr: string
): T => {
  // Initialisation
  const inStore = localStorageCache.get(key) ?? wrappedGet(key);
  if (typeof inStore !== 'string') {
    localStorageCache.set(key, defaultValueStr);
    wrappedSet(key, defaultValueStr);
    return JSON.parse(defaultValueStr);
  }
  return JSON.parse(inStore);
};

// Custom hook to be used whenever a persistent user preference is needed
function useLocalStorage<T extends JsonValue>(
  key: UserPreferenceKey,
  defaultValue: T
): [state: T, setState: Dispatch<SetStateAction<T>>] {
  // stringify it here because it might be a complex object but we depend on it
  // it for multiple useEffect dependency array
  const defaultValueStr = JSON.stringify(defaultValue);

  const [state, setState] = useState<T>(() =>
    initialiser<T>(key, defaultValueStr)
  );

  // effect in order to change the value returned when the hook's key changes
  useEffect(() => {
    setState(initialiser<T>(key, defaultValueStr));
  }, [key, defaultValueStr]);

  // Setter exposed to the user of the hook, in charge of keeping localStorage
  // up to date with the user preferences
  const setStateAndPersist = useCallback<Dispatch<SetStateAction<T>>>(
    (valueOrSetter) => {
      setState((currentState) => {
        const valueToStore =
          typeof valueOrSetter === 'function'
            ? valueOrSetter(currentState)
            : valueOrSetter;
        const stringified = JSON.stringify(valueToStore);
        localStorageCache.set(key, stringified);
        wrappedSet(key, stringified);
        // Dispatch asyncronously because otherwise the react logic wouldn't let
        // us setState in the event listener
        frame().then(() =>
          window.dispatchEvent(
            new StorageEvent('storage', {
              key,
              newValue: stringified,
              storageArea: window.localStorage,
            })
          )
        );
        return valueToStore;
      });
    },
    [key]
  );

  // Handles case when another tab, window, or instance of the hook, changes
  // user settings. This keeps the current tab in sync automatically and pushes
  // the new state to the components using it
  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || event.key !== key) {
        // Ignore, not the key or the storage we are interested in for this hook
        return;
      }
      const { newValue } = event;
      if (newValue === null) {
        // value was removed
        // reset state with default value, but trigger usage of default value
        setState(JSON.parse(defaultValueStr));
        const stringified = defaultValueStr;
        localStorageCache.set(key, stringified);
        wrappedSet(key, stringified);
      } else {
        const parsed = JSON.parse(newValue);
        // update state accordingly
        setState(parsed);
      }
    };
    window.addEventListener('storage', handleStorageEvent);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [key, defaultValueStr]);

  return [state, setStateAndPersist];
}

export default useLocalStorage;
