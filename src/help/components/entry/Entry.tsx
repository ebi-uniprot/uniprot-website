import { useCallback, MouseEventHandler } from 'react';
import { Loader, Card } from 'franklin-sites';
import marked from 'marked';
import { Attributes, defaults, Transformer } from 'sanitize-html';
import cn from 'classnames';
import { RouteChildrenProps } from 'react-router-dom';

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
const absoluteURL = /^(https?:)?\/\//i;

// TODO: probably need to play with the options here in order to make it look OK
const aTransformer: Transformer = (_: string, attribs: Attributes) => {
  const href = attribs.href.replace(internalRE, '/');
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
const cleanTextOptions = {
  ...cleanTextDefaultOptions,
  allowedTags: defaults.allowedTags,
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

  // Hijack clicks on links
  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A') {
        const { href } = target as HTMLAnchorElement;
        if (!absoluteURL.test(href)) {
          event.preventDefault();
          props.history.push(href);
        }
      }
    },
    [props.history]
  );

  if (loading && !data) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  const lastModifed = parseDate(data.lastModified);

  return (
    <SingleColumnLayout>
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
          dangerouslySetInnerHTML={{
            __html: cleanText(marked(data.content), cleanTextOptions),
          }}
          onClick={handleClick}
        />
      </Card>
    </SingleColumnLayout>
  );
};

export default HelpEntry;
