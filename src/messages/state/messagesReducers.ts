import { ActionType } from 'typesafe-actions';
import { MessageType } from '../types/messagesTypes';

import * as messagesActions from './messagesActions';
import messagesInitialState, { MessagesState } from './messagesInitialState';

export type MessagesAction = ActionType<typeof messagesActions>;

let fallbackId = 0;

const messagesReducers = (
  // eslint-disable-next-line default-param-last
  state: MessagesState = messagesInitialState,
  action: MessagesAction
): MessagesState => {
  switch (action.type) {
    case messagesActions.ADD_MESSAGE: {
      let payload: MessageType;
      if (action.payload.id) {
        payload = action.payload as MessageType;
      } else {
        // eslint-disable-next-line no-plusplus
        payload = { ...action.payload, id: `${++fallbackId}` };
      }
      return {
        ...state,
        [payload.id]: payload,
      };
    }
    case messagesActions.DELETE_MESSAGE: {
      const { [action.payload.id]: _toBeDeleted, ...restOfMessages } = state;
      return restOfMessages;
    }
    default:
      return state;
  }
};

export default messagesReducers;
