import { SetOptional } from 'type-fest';
import { action } from 'typesafe-actions';

import { MessageType } from '../types/messagesTypes';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const addMessage = (message: SetOptional<MessageType, 'id'>) =>
  action(ADD_MESSAGE, message);

// Dispatched by the Message Manager when the user has either seen the message or they dismiss it
export const deleteMessage = (id: string) => action(DELETE_MESSAGE, { id });
