import { createContext, Dispatch, FC, useReducer } from 'react';

import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import messagesReducers, {
  MessagesAction,
} from '../../messages/state/messagesReducers';

export const MessagesContext = createContext<
  [state: MessagesState, dispatch: Dispatch<MessagesAction>]
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>([messagesInitialState, () => {}]);

export const MessagesProvider: FC = ({ children }) => {
  const reducerOutput = useReducer(messagesReducers, messagesInitialState);

  return (
    <MessagesContext.Provider value={reducerOutput}>
      {children}
    </MessagesContext.Provider>
  );
};
