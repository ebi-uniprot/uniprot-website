import { SetOptional } from 'type-fest';
import { action } from 'typesafe-actions';

import {
  MessageFormat,
  MessageLevel,
  MessageType,
} from '../types/messagesTypes';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const addMessage = (message: SetOptional<MessageType, 'id'>) =>
  action(ADD_MESSAGE, message);

export const copySuccessMessage = () =>
  addMessage({
    content: `Copied to clipboard`,
    format: MessageFormat.POP_UP,
    level: MessageLevel.SUCCESS,
    displayTime: 5_000,
  });

export const copyFailureMessage = () =>
  addMessage({
    content: 'There was an issue copying to clipboard',
    format: MessageFormat.POP_UP,
    level: MessageLevel.FAILURE,
    displayTime: 15_000,
  });

// Dispatched by the Message Manager when the user has either seen the message or they dismiss it
export const deleteMessage = (id: string) => action(DELETE_MESSAGE, { id });
