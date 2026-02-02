/**
 * @jest-environment node
 */
import {
  MessageFormat,
  MessageLevel,
  type MessageType,
} from '../../types/messagesTypes';
import { addMessage, deleteMessage } from '../messagesActions';
import { type MessagesState } from '../messagesInitialState';
import messagesReducers from '../messagesReducers';

const dateNow = 1542736574043;
jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

describe('Messages reducer', () => {
  let state: MessagesState;
  let message: MessageType;
  beforeEach(() => {
    state = {};
    message = {
      id: 'job-id',
      content: 'job message',
      format: MessageFormat.POP_UP,
      level: MessageLevel.SUCCESS,
    };
  });

  it('should add message', () => {
    const action = addMessage(message);
    expect(messagesReducers(state, action)).toEqual({
      [message.id]: message,
    });
  });

  it('should add id-less messages', () => {
    const { id: _id, ...idLessMessage } = message;
    // Add messages twice
    const finalState = messagesReducers(
      messagesReducers(state, addMessage(idLessMessage)),
      addMessage(idLessMessage)
    );
    expect(Object.keys(finalState)).toHaveLength(2);
  });

  it('should delete message', () => {
    state = {
      [message.id]: message,
    };
    const action = deleteMessage(message.id);
    expect(messagesReducers(state, action)).toEqual({});
  });

  it('should try to delete a message, even if it is not there already', () => {
    state = {
      'other-id': { ...message, id: 'other-id' },
    };
    const action = deleteMessage(message.id);
    expect(messagesReducers(state, action)).toEqual(state);
  });
});
