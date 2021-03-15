import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import { frame, schedule } from 'timing-functions';
import { JsonValue } from 'type-fest';

import useSafeState from '../hooks/useSafeState';
import { Namespace } from '../types/namespaces';

type UserPreferences = Record<string, JsonValue>;

type ContextType = [
  state: UserPreferences,
  setState: Dispatch<SetStateAction<UserPreferences>>
];

const unusedDefaults: ContextType = [
  {},
  () => {
    /* */
  },
];
const UserPreferencesContext = createContext<ContextType>(unusedDefaults);

UserPreferencesContext.displayName = 'UserPreferencesContext';

export const UserPreferencesProvider: FC = ({ children }) => {
  // runtime state
  const stateAndSetState = useSafeState<UserPreferences>({});

  return (
    <UserPreferencesContext.Provider value={stateAndSetState}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export type PossibleUserPreferenceKey =
  // gpdr banner
  | 'gdpr'
  // view mode: card vs table
  | 'view-mode'
  // column selection for the table views for all the namespaces
  | `table columns for ${Namespace}`;

// Custom hook to be used whenever a persistent user preference is needed
export function useUserPreference<T extends JsonValue>(
  key: PossibleUserPreferenceKey,
  defaultValue: T
): [state: T, setState: Dispatch<SetStateAction<T>>] {
  const [contextState, setContextState] = useContext(UserPreferencesContext);

  const setStateAndPersist = useCallback<Dispatch<SetStateAction<T>>>(
    (value) => {
      setContextState((state) => {
        const valueToStore =
          typeof value === 'function' ? value(state[key] as T) : value;
        // No need to cancel or anything on unmount or change of key.
        schedule(1000).then(() => {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        });
        return { ...state, [key]: valueToStore };
      });
    },
    [key, setContextState]
  );

  useEffect(() => {
    const onStorageEvent = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || event.key !== key) {
        // Ignore, not the key or the storage we are interested in for this hook
        return;
      }
      const { newValue } = event;
      if (newValue === null) {
        // value was removed
        // remove from context state, but will trigger usage of default value
        setContextState(({ [key]: _, ...state }) => state);
      } else {
        // update context state accordingly
        setContextState((state) => ({
          ...state,
          [key]: JSON.parse(newValue),
        }));
      }
    };
    // Happens if another tab or window changes user settings
    window.addEventListener('storage', onStorageEvent);
    return () => {
      window.removeEventListener('storage', onStorageEvent);
    };
  }, [key, setContextState]);

  if (key in contextState) {
    // already used in this session
    return [contextState[key] as T, setStateAndPersist];
  }
  // not used in this session yet, retrieve from localStorage
  const stringified = window.localStorage.getItem(key);
  if (typeof stringified === 'string') {
    // something was set before
    const parsed = JSON.parse(stringified);
    frame().then(() =>
      setContextState((state) => ({ ...state, [key]: parsed }))
    );
    return [parsed, setStateAndPersist];
  }
  // otherwise, it's the first time it's used, no persisted state yet
  frame().then(() => setStateAndPersist(defaultValue));
  return [defaultValue, setStateAndPersist];
}
