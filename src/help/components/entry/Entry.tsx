import cn from 'classnames';
import { Card, Loader } from 'franklin-sites';
import { MouseEventHandler, useCallback, useEffect, useMemo } from 'react';
import {
  generatePath,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';
import {
  Attributes,
  defaults,
  IOptions,
  Tag,
  Transformer,
} from 'sanitize-html';

import { Location, LocationToPath } from '../../../app/config/urls';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../shared/components/layouts/SingleColumnLayout';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import helper from '../../../shared/styles/helper.module.scss';
import {
  cleanTextDefaultOptions,
  getTransformTags,
  HeadingLevels,
} from '../../../shared/utils/cleanText';
import { sendGtagEventOutboundLinkClick } from '../../../shared/utils/gtagEvents';
import * as logging from '../../../shared/utils/logging';
import { parseMarkdown } from '../../../shared/utils/markdown';
import parseDate from '../../../shared/utils/parseDate';
import { stringifyQuery } from '../../../shared/utils/url';
import helpApiUrls from '../../config/apiUrls';
import { HelpEntryResponse } from '../../types/apiModel';
import RelatedArticles from './RelatedArticles';
import styles from './styles/entry.module.scss';

const internalRE = /^(https?:)?\/\/www.uniprot.org\//i;
const sameAppURL = new RegExp(window.location.origin + BASE_URL, 'i');
// NOTE: in production, internalRE and sameAppURL should be the same

const aTransformer: Transformer = (_: string, attribs: Attributes) => {
  const output: Tag = {
    tagName: 'a',
    attribs: {
      ...attribs,
      title: 'link',
    },
  };
  const href = attribs.href?.replace(internalRE, BASE_URL);
  if (href) {
    output.attribs.href = href;
    // if external link
    if (href === attribs.href && !href.startsWith('#')) {
      output.attribs.class = styles.external;
      output.attribs.target = '_blank';
      output.attribs.rel = 'noopener noreferrer';
    }
  }
  return output;
};

const allowedClasses = (cleanTextDefaultOptions.allowedClasses?.['*'] ||
  []) as string[];

// TODO: probably need to play with the options here in order to make it look OK
export const getCleanTextOptions = (headingLevel: HeadingLevels): IOptions => ({
  ...cleanTextDefaultOptions,
  allowedTags: [...defaults.allowedTags, 'img'],
  // none by default, so explicitely accept only the ones from the stylesheets
  allowedClasses: {
    '*': [
      ...allowedClasses,
      ...Object.values(helper),
      ...Object.values(styles),
    ],
  },
  allowedAttributes: {
    ...cleanTextDefaultOptions.allowedAttributes,
    img: ['src', 'width', 'height', 'alt'],
  },
  transformTags: {
    ...getTransformTags(headingLevel),
    a: aTransformer,
  },
});

type HelpEntryContentProps = {
  data: HelpEntryResponse;
  upperHeadingLevel?: HeadingLevels;
};

const HelpEntryContent = ({
  data,
  upperHeadingLevel = 'h1',
}: HelpEntryContentProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById(location.hash.substring(1))?.scrollIntoView();
  }, [location.hash]);

  // Hijack clicks on content
  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      // Hijack clicks on content but only interested in link clicks
      if (event.target instanceof HTMLAnchorElement) {
        const { href } = event.target;
        // If clicks are within the UniProt client
        if (sameAppURL.test(href)) {
          if (event.metaKey || event.ctrlKey || event.shiftKey) {
            return; // default behaviour of opening a new tab or new window
          }
          // Don't navigate away!
          event.preventDefault();
          // And just replace the current URL with the next page
          navigate(href.replace(sameAppURL, '/'));
        } else {
          // analytics, similar as in InstrumentedExternalLink
          const url = new URL(href);
          sendGtagEventOutboundLinkClick(url.toString());
        }
      }
    },
    [navigate]
  );

  const html = useMemo(() => {
    if (data?.content) {
      return parseMarkdown(
        data.content,
        getCleanTextOptions(upperHeadingLevel)
      );
    }
    return null;
  }, [data, upperHeadingLevel]);

  if (!html) {
    return <ErrorHandler />;
  }

  // event delegation here, not actually doing anything with the div
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div dangerouslySetInnerHTML={{ __html: html }} onClick={handleClick} />
  );
};

type Props = {
  inPanel?: boolean;
  overrideContent?: HelpEntryResponse;
};

const HelpEntry = ({ inPanel, overrideContent }: Props) => {
  const { accession } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const isReleaseNotes = location.pathname.includes('release-notes');

  let url = null;
  if (!overrideContent) {
    if (isReleaseNotes) {
      url = apiUrls.releaseNotes.entry(accession);
    } else {
      url = helpApiUrls.entry(accession);
    }
  }

  useEffect(() => {
    if (!isReleaseNotes || !accession || !accession.includes('/')) {
      return;
    }
    // if the accession has slashes, replace with dashes
    navigate(
      {
        ...location,
        pathname: generatePath(LocationToPath[Location.ReleaseNotesEntry], {
          accession: accession.replaceAll('/', '-'),
        }),
      },
      { replace: true }
    );
  }, [isReleaseNotes, accession, navigate, location]);

  const {
    data: loadedData,
    loading,
    error,
    progress,
    isStale,
  } = useDataApiWithStale<HelpEntryResponse>(url);

  useEffect(() => {
    if (inPanel && error) {
      logging.warn('contextual help article loading error', {
        extra: { data: accession },
      });
    }
  }, [inPanel, error, accession]);

  const data = overrideContent || loadedData;

  const date = useMemo(() => {
    if (data?.content) {
      return parseDate(isReleaseNotes ? data.releaseDate : data.lastModified);
    }
    return null;
  }, [data, isReleaseNotes]);

  if (loading && !data) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return (
      <Navigate
        replace
        to={{
          pathname: LocationToPath[Location.HelpResults],
          search: stringifyQuery({
            query: accession?.replaceAll('_', ' ') || '*',
          }),
        }}
      />
    );
  }

  if (inPanel) {
    return (
      <div className={styles['in-panel']}>
        <h2 className="medium">{data.title}</h2>
        <HelpEntryContent data={data} upperHeadingLevel="h3" />
      </div>
    );
  }

  const dateNode = date && (
    <div className={isReleaseNotes ? undefined : styles['last-updated-help']}>
      <small>
        {' '}
        {isReleaseNotes ? 'Released on' : 'Page last modified'}:{' '}
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
      </small>
    </div>
  );

  return (
    <SingleColumnLayout>
      <HTMLHead title={[data.title, 'UniProt help']} />
      <h1 className={data.categories?.includes('faq') ? 'big' : undefined}>
        {data.title}
      </h1>
      {isReleaseNotes && accession !== 'forthcoming-changes' && dateNode}
      <Card className={cn(styles.content, { [helper.stale]: isStale })}>
        <HelpEntryContent data={data} />
      </Card>
      {!isReleaseNotes && dateNode}
      {!loading && !isReleaseNotes && accession && data.categories?.length ? (
        <RelatedArticles current={accession} categories={data.categories} />
      ) : null}
    </SingleColumnLayout>
  );
};

export default HelpEntry;
