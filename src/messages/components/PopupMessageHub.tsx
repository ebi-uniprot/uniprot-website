import { FC } from 'react';
import { Message } from 'franklin-sites';
import { useTransition, animated } from '@react-spring/web';

import { MessageType } from '../types/messagesTypes';
import './styles/popup-message-hub.scss';

const PopUpMessageHub: FC<{
  messages: MessageType[];
  onDismiss: (id: string) => void;
}> = ({ messages, onDismiss }) => {
  const transition = useTransition(messages, {
    from: { opacity: 0, marginRight: -100, marginLeft: 100 },
    enter: {
      opacity: 1,
      marginRight: 0,
      marginLeft: 0,
    },
    leave: {
      opacity: 0,
    },
  });

  if (messages.length <= 0) {
    return null;
  }

  return (
    <div className="popup-message-container">
      {transition((style, item) => (
        <animated.div style={style}>
          <Message level={item.level} onDismiss={() => onDismiss(item.id)}>
            {item.content}
          </Message>
        </animated.div>
      ))}
    </div>
  );
};

export default PopUpMessageHub;
