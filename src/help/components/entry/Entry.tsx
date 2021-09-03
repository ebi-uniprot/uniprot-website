import { useCallback, MouseEventHandler, useMemo } from 'react';
import { Loader, Card } from 'franklin-sites';
import marked from 'marked';
import { Attributes, defaults, Transformer } from 'sanitize-html';
import cn from 'classnames';
import { RouteChildrenProps } from 'react-router-dom';

import HTMLHead from '../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';
import cleanText, {
  cleanTextDefaultOptions,
} from '../../../shared/utils/cleanText';
import parseDate from '../../../shared/utils/parseDate';

import { HelpEntryResponse } from '../../adapters/helpConverter';

import helper from '../../../shared/styles/helper.module.scss';
import styles from './styles/entry.module.scss';

const internalRE = /^(https?:)?\/\/www.uniprot.org\//i;
const sameAppURL = new RegExp(window.location.origin + BASE_URL, 'i');
// NOTE: in production, internalRE and sameAppURL should be the same

const aTransformer: Transformer = (_: string, attribs: Attributes) => {
  const href = attribs.href.replace(internalRE, BASE_URL);
  const isExternal = href === attribs.href;
  return {
    tagName: 'a',
    attribs: {
      ...attribs,
      title: 'link',
      class: isExternal ? styles.external : '',
      href,
    },
  };
};

const allowedClasses = (cleanTextDefaultOptions.allowedClasses?.['*'] ||
  []) as string[];

// TODO: probably need to play with the options here in order to make it look OK
const cleanTextOptions = {
  ...cleanTextDefaultOptions,
  allowedTags: defaults.allowedTags,
  // none by default, so explicitely accept only the ones from the stylesheets
  allowedClasses: {
    '*': [
      ...allowedClasses,
      ...Object.values(helper),
      ...Object.values(styles),
    ],
  },
  transformTags: {
    ...cleanTextDefaultOptions.transformTags,
    a: aTransformer,
  },
};

const HelpEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<HelpEntryResponse>(helpURL.accession(accession));

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
          props.history.push(href.replace(sameAppURL, '/'));
        }
      }
    },
    [props.history]
  );

  const [lastModifed, html] = useMemo(
    () =>
      data
        ? [
            parseDate(data.lastModified),
            cleanText(marked(data.content), cleanTextOptions),
          ]
        : [],
    [data]
  );

  if (loading && !data && !html) {
    return <Loader progress={progress} />;
  }

  if (error || !data || !html) {
    return <ErrorHandler status={status} />;
  }

  return (
    <SingleColumnLayout>
      <HTMLHead title={[data.title, 'UniProt help']} />
      <h1 className={data.categories.includes('faq') ? 'medium' : 'big'}>
        {data.title}
      </h1>
      {lastModifed && (
        <span>
          Last modified:{' '}
          <time dateTime={lastModifed.toISOString()}>
            {lastModifed.toDateString()}
          </time>
        </span>
      )}
      <Card className={cn(styles.content, { [helper.stale]: isStale })}>
        {/* event delegation here, not actually doing anything with the div */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
          onClick={handleClick}
        />
      </Card>
    </SingleColumnLayout>
  );
};

export default HelpEntry;
