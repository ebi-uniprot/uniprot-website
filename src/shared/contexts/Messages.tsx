import {
  createContext,
  type Dispatch,
  type ReactNode,
  useReducer,
} from 'react';

import { addMessage } from '../../messages/state/messagesActions';
import messagesInitialState, {
  type MessagesState,
} from '../../messages/state/messagesInitialState';
import messagesReducers, {
  type MessagesAction,
} from '../../messages/state/messagesReducers';
import getJobMessage from '../../messages/utils/';
import { jobsSharedWorker } from '../workers/jobs/getJobSharedWorker';
import { type JobSharedWorkerMessageEvent } from '../workers/jobs/jobSharedWorker';

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
