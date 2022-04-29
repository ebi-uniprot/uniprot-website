import { useCallback, MouseEventHandler, useMemo, useEffect } from 'react';
import { generatePath, RouteChildrenProps, useHistory } from 'react-router-dom';
import { Card, Loader, Message } from 'franklin-sites';
import { marked } from 'marked';
import {
  Attributes,
  defaults,
  Tag,
  Transformer,
  IOptions,
} from 'sanitize-html';
import cn from 'classnames';

import HTMLHead from '../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import {
  help as helpURL,
  news as newsURL,
} from '../../../shared/config/apiUrls';
import cleanText, {
  cleanTextDefaultOptions,
  getTransformTags,
  HeadingLevels,
} from '../../../shared/utils/cleanText';
import parseDate from '../../../shared/utils/parseDate';

import { HelpEntryResponse } from '../../adapters/helpConverter';
import { LocationToPath, Location } from '../../../app/config/urls';

import helper from '../../../shared/styles/helper.module.scss';
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
    if (href === attribs.href) {
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
  transformTags: {
    ...getTransformTags(headingLevel),
    a: aTransformer,
  },
});

type HelpEntryContentProps = {
  data: HelpEntryResponse;
  upperHeadingLevel?: HeadingLevels;
};

export const HelpEntryContent = ({
  data,
  upperHeadingLevel = 'h1',
}: HelpEntryContentProps) => {
  const history = useHistory();

  useEffect(() => {
    document
      .getElementById(history.location.hash.substring(1))
      ?.scrollIntoView();
  }, [history.location.hash]);

  // Hijack clicks on content
  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      // Hijack clicks on content but only interested in link clicks
      if (event.target instanceof HTMLAnchorElement) {
        const { href } = event.target;
        // If clicks are within the UniProt client
        if (sameAppURL.test(href)) {
          // Don't navigate away!
          event.preventDefault();
          // And just replace the current URL with the next page
          // eslint-disable-next-line uniprot-website/use-config-location
          history.push(href.replace(sameAppURL, '/'));
        }
      }
    },
    [history]
  );

  const html = useMemo(() => {
    if (data?.content) {
      return cleanText(
        marked(data.content),
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
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={handleClick}
    />
  );
};

type Props = {
  inPanel?: boolean;
  overrideContent?: HelpEntryResponse;
};

const HelpEntry = ({
  history,
  match,
  inPanel,
  overrideContent,
}: RouteChildrenProps<{ accession: string }> & Props) => {
  const accession = match?.params.accession;
  const isReleaseNotes = match?.path.includes('release-notes');

  let url = null;
  if (!overrideContent) {
    if (isReleaseNotes) {
      url = newsURL.accession(accession);
    } else {
      url = helpURL.accession(accession);
    }
  }

  useEffect(() => {
    if (!isReleaseNotes || !accession || !accession.includes('/')) {
      return;
    }
    // if the accession has slashes, replace with dashes
    history.replace({
      ...history.location,
      pathname: generatePath(LocationToPath[Location.ReleaseNotesEntry], {
        accession: accession.replaceAll('/', '-'),
      }),
    });
  }, [isReleaseNotes, accession, history]);

  const {
    data: loadedData,
    loading,
    error,
    status,
    progress,
    isStale,
  } = useDataApiWithStale<HelpEntryResponse>(url);

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
    return <ErrorHandler status={status} />;
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
      {!isReleaseNotes && (
        <Message level="info" className={styles['beta-message']}>
          During the beta phase, help content may not be up to date.
        </Message>
      )}
      <h1 className={data.categories?.includes('faq') ? 'big' : undefined}>
        {data.title}
      </h1>
      {isReleaseNotes && accession !== 'forthcoming-changes' && dateNode}
      <Card className={cn(styles.content, { [helper.stale]: isStale })}>
        <HelpEntryContent data={data} />
      </Card>
      {!isReleaseNotes && dateNode}
    </SingleColumnLayout>
  );
};

export default HelpEntry;
