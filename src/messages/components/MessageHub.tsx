import MessageInHub from './MessageInHub';

import { MessageType } from '../types/messagesTypes';

type MessageHubProps = {
  messages: MessageType[];
  className?: string;
};

const MessageHub = ({ messages = [], className }: MessageHubProps) => (
  <div className={className}>
    {messages.map((message) => (
      <MessageInHub key={message.id} {...message} />
    ))}
  </div>
);

export default MessageHub;
