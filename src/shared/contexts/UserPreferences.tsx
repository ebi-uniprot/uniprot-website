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
  {}, // will be global state of all user preferences hooks
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}, // will be global state setter
];
const UserPreferencesContext = createContext<ContextType>(unusedDefaults);

UserPreferencesContext.displayName = 'UserPreferencesContext';

export const UserPreferencesProvider: FC = ({ children }) => {
  // Runtime state for all user preferences, lazily populated with usage.
  // Using useSafeState because we *might* set values in the global state after
  // the component has unmounted, it's OK, but would trigger a warning otherwise
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

  // Setter exposed to the user of the hook, in charge of asynchronously keeping
  // localStorage up to date with the user preferences
  const setStateAndPersist = useCallback<Dispatch<SetStateAction<T>>>(
    (value) => {
      setContextState((state) => {
        const valueToStore =
          typeof value === 'function' ? value(state[key] as T) : value;
        // No need to cancel or anything on unmount or change of key.
        schedule(1000).then(() => {
          // "scheduled" in order to not block any instant UI update
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        });
        // Set slice of global state with this specific user setting
        return { ...state, [key]: valueToStore };
      });
    },
    [key, setContextState]
  );

  // Handles case when another tab or window changes user settings
  // This keeps the current tab in sync automatically and pushes the new state
  // to the components using it
  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
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
    window.addEventListener('storage', handleStorageEvent);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [key, setContextState]);

  if (key in contextState) {
    // already used in this session, early exit with value and setter
    return [contextState[key] as T, setStateAndPersist];
  }
  // Above this comment should be the most often use case.
  // Below this comment should happen at most once per section.
  // Not used in this session yet, retrieve synchronously from localStorage.
  const stringified = window.localStorage.getItem(key);
  if (typeof stringified === 'string') {
    // Some value was set before, parse it
    const parsed = JSON.parse(stringified);
    // Return value, set it in the global state, without persisting
    frame().then(() =>
      // Needs to be asynchronous because can't set state in render
      setContextState((state) => ({ ...state, [key]: parsed }))
    );
    return [parsed, setStateAndPersist];
  }
  // Otherwise, it's the first time it's used, no persisted state yet
  // Return default value, set it in the global state, and persist
  frame().then(() =>
    // Needs to be asynchronous because can't set state in render
    setStateAndPersist(defaultValue)
  );
  return [defaultValue, setStateAndPersist];
}
