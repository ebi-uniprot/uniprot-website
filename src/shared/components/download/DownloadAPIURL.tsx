import { Button, CodeBlock, CopyIcon } from 'franklin-sites';
import { useCallback, useEffect } from 'react';

import { useMessagesDispatch } from '../../contexts/Messages';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import styles from './styles/download-api-url.module.scss';

const DownloadAPIURL = ({
  apiURL,
  onCopy,
  onMount,
}: {
  apiURL: string;
  onCopy: () => void;
  onMount: () => void;
}) => {
  useEffect(() => {
    onMount();
  }, [onMount]);

  const dispatch = useMessagesDispatch();
  const handleCopyURL = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(apiURL);
      // Success with Clipboard API, display message
      dispatch(copySuccessMessage());
    } catch {
      // Issue with Clipboard API too, bail with error message
      dispatch(copyFailureMessage());
    }
    onCopy();
  }, [apiURL, dispatch, onCopy]);

  return (
    <div className={styles['api-url']}>
      <h4>API URL</h4>
      <CodeBlock lightMode>{apiURL}</CodeBlock>
      <Button
        variant="primary"
        className={styles['copy-button']}
        onClick={handleCopyURL}
      >
        <CopyIcon />
        Copy
      </Button>
    </div>
  );
};

export default DownloadAPIURL;
