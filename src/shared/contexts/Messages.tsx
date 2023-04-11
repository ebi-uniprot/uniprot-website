import { createContext, Dispatch, useReducer, ReactNode } from 'react';

import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import messagesReducers, {
  MessagesAction,
} from '../../messages/state/messagesReducers';
import getContextHook from './getContextHook';

export const MessagesDispatchContext = createContext<Dispatch<MessagesAction>>(
  () => {
    /* */
  }
);

export const MessagesStateContext =
  createContext<MessagesState>(messagesInitialState);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(messagesReducers, messagesInitialState);

  return (
    <MessagesDispatchContext.Provider value={dispatch}>
      <MessagesStateContext.Provider value={state}>
        {children}
      </MessagesStateContext.Provider>
    </MessagesDispatchContext.Provider>
  );
};

// Need to put the hooks here, otherwise there's a circular dependency issue
export const useMessagesDispatch = getContextHook(MessagesDispatchContext);
export const useMessagesState = getContextHook(MessagesStateContext);
