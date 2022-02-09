import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Message } from 'franklin-sites';

import { deleteMessage } from '../state/messagesActions';

import { MessageType } from '../types/messagesTypes';

const MessageInHub = ({ level, content, id, ttl }: MessageType) => {
  const dispatch = useDispatch();

  const handleDismiss = useCallback(
    () => dispatch(deleteMessage(id)),
    [dispatch, id]
  );

  useEffect(() => {
    if (!ttl) {
      return;
    }
    const timeout = setTimeout(handleDismiss, ttl);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeout);
  }, [handleDismiss, ttl, content]);
  // ↑ add 'content' to dependencies: in case same id, but changed content

  return (
    <Message level={level} onDismiss={handleDismiss}>
      {content}
    </Message>
  );
};

export default MessageInHub;
