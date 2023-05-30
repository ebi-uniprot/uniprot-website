import { Button, CodeBlock, CopyIcon, LongNumber } from 'franklin-sites';
import { useCallback } from 'react';
import { generatePath, Link } from 'react-router-dom';
import queryString from 'query-string';

import useMessagesDispatch from '../../hooks/useMessagesDispatch';
import useScrollIntoViewRef from '../../hooks/useScrollIntoView';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import { sendGtagEventUrlCopy } from '../../utils/gtagEvents';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

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
export const DOWNLOAD_SIZE_LIMIT = 10_000_000 as const;

type Props = {
  apiURL: string;
  ftpURL?: string | null;
  onCopy: () => void;
  count: number;
  disableAll?: boolean;
};

const DownloadAPIURL = ({
  apiURL,
  ftpURL,
  onCopy,
  count,
  disableAll,
}: Props) => {
  const scrollRef = useScrollIntoViewRef<HTMLDivElement>();
  const dispatch = useMessagesDispatch();
  const handleCopyURL = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        // Success with Clipboard API, display message
        dispatch(copySuccessMessage());
        sendGtagEventUrlCopy('api', text);
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

  if (disableAll) {
    return (
      <div className={styles['api-url']} ref={scrollRef}>
        <CodeBlock lightMode>
          {
            // eslint-disable-next-line react/jsx-curly-brace-presence
            "// this specific combination of parameters doesn't have a corresponding direct API endpoint"
          }
        </CodeBlock>
      </div>
    );
  }

  return (
    <div className={styles['api-url']} ref={scrollRef}>
      {ftpURL && (
        <>
          <br />
          <h4>FTP URL</h4>
          This file is available compressed on the{' '}
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'downloads',
            })}
          >
            UniProt FTP server
          </Link>
          <CodeBlock lightMode>{ftpURL}</CodeBlock>
          <section className="button-group">
            <Button
              variant="primary"
              className={styles['copy-button']}
              onClick={() => handleCopyURL(ftpURL)}
            >
              <CopyIcon />
              Copy
            </Button>
          </section>
        </>
      )}
      <h4>API URL {isStreamEndpoint && ' using the streaming endpoint'}</h4>
      {isStreamEndpoint &&
        'This endpoint is resource-heavy but will return all requested results.'}
      <CodeBlock lightMode>
        {disableStream ? (
          <>
            {
              '// the streaming endpoint is unavailable for queries of more than '
            }
            <LongNumber>{DOWNLOAD_SIZE_LIMIT}</LongNumber> results
            <br />
          </>
        ) : (
          apiURL
        )}
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
