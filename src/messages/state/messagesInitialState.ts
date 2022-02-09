import { MessageType } from '../types/messagesTypes';

export type MessagesState = {
  [key: MessageType['id']]: MessageType;
};

const messagesInitialState: MessagesState = {};

export default messagesInitialState;
