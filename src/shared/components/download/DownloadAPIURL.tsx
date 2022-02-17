import { Button, CodeBlock, CopyIcon } from 'franklin-sites';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import styles from './styles/download-api-url.module.scss';

const DownloadAPIURL = ({ apiURL }: { apiURL: string }) => {
  const dispatch = useDispatch();
  const handleCopyURL = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(apiURL);
      // Success with Clipboard API, display message
      dispatch(copySuccessMessage());
    } catch {
      // Issue with Clipboard API too, bail with error message
      dispatch(copyFailureMessage());
    }
  }, [apiURL, dispatch]);

  return (
    <div className={styles['api-url']}>
      <h4>API URL</h4>
      <CodeBlock lightMode className={styles.codeblock}>
        {apiURL}
      </CodeBlock>
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
