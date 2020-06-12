/**
 * @jest-environment node
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { addMessage, deleteMessage } from '../messagesActions';
import messagesReducers from '../messagesReducers';
import {
  MessageFormat,
  MessageLevel,
  MessageType,
} from '../../types/messagesTypes';

const dateNow = 1542736574043;
jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

describe('Messages reducer', () => {
  let state;
  let message: MessageType;
  beforeEach(() => {
    state = { active: [], deleted: {} };
    message = {
      id: 'job-id',
      content: 'job message',
      format: MessageFormat.POP_UP,
      level: MessageLevel.SUCCESS,
    };
  });

  test('should add message', () => {
    const action = addMessage(message);
    expect(messagesReducers(state, action)).toEqual({
      active: [message],
      deleted: {},
    });
  });

  test('should not add message if it has already expired', () => {
    message = {
      ...message,
      dateExpired: dateNow - 1,
    };
    const action = addMessage(message);
    expect(messagesReducers(state, action)).toEqual(state);
  });

  test('should not add message if it is not active yet', () => {
    message = {
      ...message,
      dateActive: dateNow + 1,
    };
    const action = addMessage(message);
    expect(messagesReducers(state, action)).toEqual(state);
  });

  test('should delete message', () => {
    const { id } = message;
    state = {
      ...state,
      active: [message],
    };
    const action = deleteMessage(id);
    expect(messagesReducers(state, action)).toEqual({
      active: [],
      deleted: { [id]: true },
    });
  });
});
