import { FC } from 'react';
import { Message } from 'franklin-sites';

import { MessageType } from '../types/messagesTypes';
import './styles/popup-message-hub.scss';

const PopUpMessageHub: FC<{
  messages: MessageType[];
  onDismiss: (id: string) => void;
}> = ({ messages, onDismiss }) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="popup-message-container">
      {messages.map((item) => (
        <Message
          level={item.level}
          onDismiss={() => onDismiss(item.id)}
          key={item.id}
        >
          {item.content}
        </Message>
      ))}
    </div>
  );
};

export default PopUpMessageHub;
