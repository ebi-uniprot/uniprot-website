import { Context, useContext } from 'react';

import { MessagesContext } from '../contexts/Messages';

import * as logging from '../utils/logging';

// Disabling rules of hooks because we are not using anything within components

const useGlobalReducer =
  <T>(context: Context<T>) =>
  () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ctx = useContext(context);
    if (ctx === undefined) {
      logging.error(
        `useGlobalReducer must be used within the corresponding context provider: "${context.displayName}"`
      );
    }
    return ctx;
  };

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useMessagesReducer = useGlobalReducer(MessagesContext);

// Add more as needed (e.g. => for job context when moved away from redux)
