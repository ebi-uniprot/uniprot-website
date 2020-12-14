import { FC } from 'react';
import { Message } from 'franklin-sites';
import { MessageType } from '../types/messagesTypes';

type InPageMessageHubProps = {
  messages: MessageType[];
  onDismiss: (id: string) => void;
};

const InPageMessageHub: FC<InPageMessageHubProps> = ({
  messages = [],
  onDismiss,
}) => (
  <div>
    {messages.map(({ level, content, id }) => (
      <Message key={id} level={level} onDismiss={() => onDismiss(id)}>
        {content}
      </Message>
    ))}
  </div>
);

export default InPageMessageHub;
