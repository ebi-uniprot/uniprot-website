import { Button, CodeBlock, CopyIcon } from 'franklin-sites';
import { useCallback, useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';
import queryString from 'query-string';

import { useMessagesDispatch } from '../../contexts/Messages';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import { gtagFn } from '../../utils/logging';

import { LocationToPath, Location } from '../../../app/config/urls';

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
  const handleCopyURL = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        // Success with Clipboard API, display message
        dispatch(copySuccessMessage());
        gtagFn('event', 'copy API URL', {
          event_category: 'copy',
          event_label: text,
        });
      } catch {
        // Issue with Clipboard API too, bail with error message
        dispatch(copyFailureMessage());
      }
      onCopy();
    },
    [dispatch, onCopy]
  );

  const isStreamEndpoint = apiURL.includes('/stream');
  const parsed = queryString.parseUrl(apiURL);
  const batchSize = 500;
  const searchEndpoint = queryString.stringifyUrl({
    url: parsed.url.replace('/stream', '/search'),
    query: { ...parsed.query, size: batchSize },
  });

  return (
    <div className={styles['api-url']}>
      <h4>API URL {isStreamEndpoint && ' using the streaming endpoint'}</h4>
      {isStreamEndpoint &&
        'This endpoint is resource-heavy but will return all requested results.'}
      <CodeBlock lightMode>{apiURL}</CodeBlock>
      <section className="button-group">
        <Button
          variant="primary"
          className={styles['copy-button']}
          onClick={() => handleCopyURL(apiURL)}
        >
          <CopyIcon />
          Copy
        </Button>
      </section>
      {isStreamEndpoint && (
        <>
          <br />
          <h4>API URL using the search endpoint</h4>
          This endpoint is lighter and returns chunks of {batchSize} at a time
          and requires&nbsp;
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'pagination',
            })}
          >
            pagination
          </Link>
          .<CodeBlock lightMode>{searchEndpoint}</CodeBlock>
          <section className="button-group">
            <Button
              variant="primary"
              className={styles['copy-button']}
              onClick={() => handleCopyURL(searchEndpoint)}
            >
              <CopyIcon />
              Copy
            </Button>
          </section>
        </>
      )}
    </div>
  );
};

export default DownloadAPIURL;
