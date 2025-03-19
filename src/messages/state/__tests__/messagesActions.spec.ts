/**
 * @jest-environment node
 */
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
  MessageType,
} from '../../types/messagesTypes';
import * as actions from '../messagesActions';

describe('messages actions', () => {
  it('should create a ADD_MESSAGE action', () => {
    const message: MessageType = {
      id: 'job-id',
      content: 'job message',
      format: MessageFormat.POP_UP,
      level: MessageLevel.SUCCESS,
      tag: MessageTag.JOB,
    };
    const expectedAction = {
      type: actions.ADD_MESSAGE,
      error: undefined,
      meta: undefined,
      payload: message,
    };
    expect(actions.addMessage(message)).toEqual(expectedAction);
  });

  it('should create a DELETE_MESSAGE action', () => {
    const id = 'message-id';
    const expectedAction = {
      type: actions.DELETE_MESSAGE,
      error: undefined,
      meta: undefined,
      payload: { id },
    };
    expect(actions.deleteMessage(id)).toEqual(expectedAction);
  });
});
