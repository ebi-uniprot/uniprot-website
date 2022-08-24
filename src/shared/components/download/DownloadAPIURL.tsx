import { Button, CodeBlock, CopyIcon, LongNumber } from 'franklin-sites';
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

import { Namespace } from '../../types/namespaces';

import helper from '../../styles/helper.module.scss';
import styles from './styles/download-api-url.module.scss';

const reIdMapping = new RegExp(
  `/idmapping/(?:(${Namespace.uniprotkb}|${Namespace.uniparc}|${Namespace.uniref})/)?(?:results/)?stream/`
);

export const getSearchURL = (streamURL: string, batchSize = 500) => {
  const parsed = queryString.parseUrl(streamURL);
  let { url } = parsed;
  if (url.search(reIdMapping) >= 0) {
    url = url.replace(reIdMapping, (_match, namespace) =>
      namespace ? `/idmapping/${namespace}/results/` : '/idmapping/results/'
    );
  } else {
    url = url.replace('/stream', '/search');
  }
  return queryString.stringifyUrl({
    url,
    query: { ...parsed.query, size: batchSize },
  });
};

// NOTE: update as needed if backend limitations change!
export const DOWNLOAD_SIZE_LIMIT = 5_000_000 as const;

type Props = {
  apiURL: string;
  onCopy: () => void;
  onMount: () => void;
  count: number;
};

const DownloadAPIURL = ({ apiURL, onCopy, onMount, count }: Props) => {
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
  const disableStream = isStreamEndpoint && count > DOWNLOAD_SIZE_LIMIT;
  const batchSize = 500;
  const searchURL = getSearchURL(apiURL, batchSize);

  return (
    <div className={styles['api-url']}>
      <h4>API URL {isStreamEndpoint && ' using the streaming endpoint'}</h4>
      {isStreamEndpoint &&
        'This endpoint is resource-heavy but will return all requested results.'}
      <CodeBlock
        lightMode
        className={disableStream ? helper.disabled : undefined}
      >
        {disableStream && (
          <>
            {
              '// the streaming endpoint is unavailable for queries of more than '
            }
            <LongNumber>{DOWNLOAD_SIZE_LIMIT}</LongNumber> results
            <br />
          </>
        )}
        {apiURL}
      </CodeBlock>
      <section className="button-group">
        <Button
          variant="primary"
          className={styles['copy-button']}
          onClick={() => handleCopyURL(apiURL)}
          disabled={disableStream}
          title={
            disableStream
              ? 'Download size is too big, please restrict your search'
              : undefined
          }
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
          .<CodeBlock lightMode>{searchURL}</CodeBlock>
          <section className="button-group">
            <Button
              variant="primary"
              className={styles['copy-button']}
              onClick={() => handleCopyURL(searchURL)}
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
