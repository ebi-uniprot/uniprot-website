import { Button, CodeBlock, CopyIcon } from 'franklin-sites';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import style from './styles/download-api-url.module.scss';

const DownloadAPIURL = ({ apiURL }: { apiURL: string }) => {
  const dispatch = useDispatch();
  const handleCopyURL = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(apiURL);
      // Success with Clipboard API, display message
      dispatch(
        addMessage({
          id: 'copy link api',
          content: `Link copied to clipboard`,
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          displayTime: 5_000,
        })
      );
    } catch {
      // Issue with Clipboard API too, bail with error message
      dispatch(
        addMessage({
          id: 'copy link api',
          content: `There was an issue while copying to clipboard`,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
          displayTime: 15_000,
        })
      );
    }
  }, [apiURL, dispatch]);

  return (
    <div className={style['api-url']}>
      <h4>API URL</h4>
      <CodeBlock lightMode className={style.codeblock}>
        {apiURL}
      </CodeBlock>
      <Button
        variant="primary"
        className={style['copy-button']}
        onClick={handleCopyURL}
      >
        <CopyIcon />
        Copy
      </Button>
    </div>
  );
};

export default DownloadAPIURL;
