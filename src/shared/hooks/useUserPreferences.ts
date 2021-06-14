import {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { frame } from 'timing-functions';
import { JsonValue } from 'type-fest';

import { Namespace } from '../types/namespaces';

export type UserPreferenceKey =
  // gpdr banner
  | 'gdpr'
  // view mode: card vs table
  | 'view-mode'
  // column selection for the table views for all the namespaces
  | `table columns for ${Namespace}`
  // column selection for the xrefs table views for UniParc entries
  | `table columns for ${Namespace} entry page`;

// Custom hook to be used whenever a persistent user preference is needed
function useUserPreferences<T extends JsonValue>(
  key: UserPreferenceKey,
  defaultValue: T
): [state: T, setState: Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    // Initialisation
    const inStore = window.localStorage.getItem(key);
    if (typeof inStore !== 'string') {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(inStore);
  });

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
        window.localStorage.setItem(key, stringified);
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
        setState(defaultValue);
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
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
  }, [key, defaultValue]);

  return [state, setStateAndPersist];
}

export default useUserPreferences;
