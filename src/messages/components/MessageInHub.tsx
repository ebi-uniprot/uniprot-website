import { useCallback, useEffect } from 'react';
import { Message } from 'franklin-sites';

import useMessagesDispatch from '../../shared/hooks/useMessagesDispatch';

import { deleteMessage } from '../state/messagesActions';

import { MessageType } from '../types/messagesTypes';

const MessageInHub = ({ level, content, id, displayTime }: MessageType) => {
  const dispatch = useMessagesDispatch();

  const handleDismiss = useCallback(
    () => dispatch(deleteMessage(id)),
    [dispatch, id]
  );

  useEffect(() => {
    if (!displayTime) {
      return;
    }
    const timeout = setTimeout(handleDismiss, displayTime);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout);
  }, [handleDismiss, displayTime, content]);
  // ↑ add 'content' to dependencies: in case same id, but changed content

  return (
    <Message level={level} onDismiss={handleDismiss}>
      {content}
    </Message>
  );
};

export default MessageInHub;
