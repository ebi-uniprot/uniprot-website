import {
  Button,
  CodeBlock,
  CopyIcon,
  ExternalLink,
  LongNumber,
} from 'franklin-sites';
import { useCallback, useEffect, useRef } from 'react';
import { generatePath, Link } from 'react-router-dom';
import cn from 'classnames';

import useMessagesDispatch from '../../hooks/useMessagesDispatch';
import useScrollIntoViewRef from '../../hooks/useScrollIntoView';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import { sendGtagEventUrlCopy } from '../../utils/gtagEvents';
import { splitUrl, stringifyUrl } from '../../utils/url';

import { LocationToPath, Location } from '../../../app/config/urls';
import {
  DOWNLOAD_SIZE_LIMIT,
  DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED,
} from '../../config/limits';
import { proteinsApiPrefix } from '../../config/apiUrls';

import { Namespace } from '../../types/namespaces';

import styles from './styles/download-api-url.module.scss';

const reIdMapping = new RegExp(
  `/idmapping/(?:(${Namespace.uniprotkb}|${Namespace.uniparc}|${Namespace.uniref})/)?(?:results/)?stream/`
);

export const getSearchURL = (streamURL: string, batchSize = 500) => {
  const { base, query } = splitUrl(streamURL);
  return stringifyUrl(
    base.search(reIdMapping) >= 0
      ? base.replace(reIdMapping, (_match, namespace) =>
          namespace ? `/idmapping/${namespace}/results/` : '/idmapping/results/'
        )
      : base.replace('/stream', '/search'),
    query,
    { size: batchSize }
  );
};

type Props = {
  apiURL: string;
  ftpURL?: string | null;
  onCopy: () => void;
  disableSearch?: boolean;
  disableStream?: boolean;
  isEntry?: boolean;
};

const DownloadAPIURL = ({
  apiURL,
  ftpURL,
  onCopy,
  disableSearch,
  disableStream,
  isEntry,
}: Props) => {
  const scrollRef = useScrollIntoViewRef<HTMLDivElement>();
  const copyRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    if (copyRef.current) {
      copyRef.current.focus();
    }
  }, []);

  const isStreamEndpoint = apiURL.includes('/stream');
  const isIdMapping = apiURL.includes('/id-mapping/');
  const downloadSizeLimit = isIdMapping
    ? DOWNLOAD_SIZE_LIMIT_ID_MAPPING_ENRICHED
    : DOWNLOAD_SIZE_LIMIT;

  const batchSize = 500;
  const searchURL = getSearchURL(apiURL, batchSize);

  if (isEntry) {
    return (
      <div className={styles['api-url']} ref={scrollRef}>
        <h4>API URL</h4>
        <CodeBlock lightMode>{apiURL}</CodeBlock>
        <section className={cn('button-group', styles['entry-button-group'])}>
          <ExternalLink
            className={cn('button', 'tertiary')}
            url={
              apiURL.includes('proteins/api')
                ? `${proteinsApiPrefix}/doc/`
                : generatePath(LocationToPath[Location.HelpEntry], {
                    accession: 'api',
                  })
            }
          >
            API Documentation
          </ExternalLink>
          <Button
            ref={copyRef}
            variant="primary"
            className={styles['copy-button']}
            onClick={() => handleCopyURL(apiURL)}
          >
            <CopyIcon />
            Copy
          </Button>
        </section>
      </div>
    );
  }

  if (disableSearch && disableStream) {
    return (
      <div className={styles['api-url']} ref={scrollRef}>
        <CodeBlock lightMode>
          {
            // eslint-disable-next-line react/jsx-curly-brace-presence
            "// this specific combination of parameters doesn't have a corresponding direct API or download endpoint."
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
            {'// the streaming endpoint is unavailable for more than '}
            <LongNumber>{downloadSizeLimit}</LongNumber> results
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
              ref={copyRef}
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
