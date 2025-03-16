import { createContext, Dispatch, useReducer, ReactNode } from 'react';

import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import messagesReducers, {
  MessagesAction,
} from '../../messages/state/messagesReducers';
import { jobsSharedWorker } from '../workers/jobs/getSharedWorker';
import { JobSharedWorkerMessageEvent } from '../workers/jobs/sharedWorker';
import { addMessage } from '../../messages/state/messagesActions';
import getJobMessage from '../../messages/utils/';

export const MessagesDispatchContext = createContext<Dispatch<MessagesAction>>(
  () => {
    /* */
  }
);

export const MessagesStateContext =
  createContext<MessagesState>(messagesInitialState);

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(messagesReducers, messagesInitialState);

  jobsSharedWorker?.port.addEventListener(
    'message',
    (e: JobSharedWorkerMessageEvent) => {
      const messageAction = e.data.messageAction;
      if (messageAction) {
        dispatch(addMessage(getJobMessage(messageAction)));
      }
    }
  );

  return (
    <MessagesDispatchContext.Provider value={dispatch}>
      <MessagesStateContext.Provider value={state}>
        {children}
      </MessagesStateContext.Provider>
    </MessagesDispatchContext.Provider>
  );
};
