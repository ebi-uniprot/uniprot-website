import { type MessageType } from '../types/messagesTypes';
import MessageInHub from './MessageInHub';

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
