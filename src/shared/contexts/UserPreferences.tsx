import { createContext, FC, Dispatch, SetStateAction } from 'react';
import { JsonValue } from 'type-fest';

import useSafeState from '../hooks/useSafeState';

import { UserPreferenceKey } from '../hooks/useUserPreferences';

export type UserPreferences = Partial<Record<UserPreferenceKey, JsonValue>>;

export type ContextType = [
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

export default UserPreferencesContext;

export const UserPreferencesProvider: FC<{
  initialState?: UserPreferences;
}> = ({ children, initialState = {} }) => {
  // Runtime state for all user preferences, lazily populated with usage.
  // Using useSafeState because we *might* set values in the global state after
  // the component has unmounted, it's OK, but would trigger a warning otherwise
  const stateAndSetState = useSafeState<UserPreferences>(initialState);

  return (
    <UserPreferencesContext.Provider value={stateAndSetState}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
