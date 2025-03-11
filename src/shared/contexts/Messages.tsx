import { createContext, Dispatch, useReducer, ReactNode } from 'react';

import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import messagesReducers, {
  MessagesAction,
} from '../../messages/state/messagesReducers';
// import { jobsSharedWorker } from '../hooks/useJobsState';

export const MessagesDispatchContext = createContext<Dispatch<MessagesAction>>(
  () => {
    /* */
  }
);

export const MessagesStateContext =
  createContext<MessagesState>(messagesInitialState);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(messagesReducers, messagesInitialState);

  // jobsSharedWorker?.port.addEventListener('message', (message) => {
  //   console.log('in messages', message);
  //   // TODO: dispatch with new messages
  // });

  return (
    <MessagesDispatchContext.Provider value={dispatch}>
      <MessagesStateContext.Provider value={state}>
        {children}
      </MessagesStateContext.Provider>
    </MessagesDispatchContext.Provider>
  );
};
