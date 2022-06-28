import MessageInHub from './MessageInHub';

import { MessageType } from '../types/messagesTypes';

type Props = {
  messages: MessageType[];
};

const PopUpMessageHub = ({ messages }: Props) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="popup-message-container">
      {messages.map((message) => (
        <MessageInHub key={message.id} {...message} />
      ))}
    </div>
  );
};

export default PopUpMessageHub;
