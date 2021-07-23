import { useCallback, MouseEventHandler } from 'react';
import { Loader, Card } from 'franklin-sites';
import marked from 'marked';
import { Attributes, defaults } from 'sanitize-html';
import cn from 'classnames';
import { RouteChildrenProps } from 'react-router-dom';
import urlJoin from 'url-join';

import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';
import cleanText, {
  cleanTextDefaultOptions,
} from '../../../shared/utils/cleanText';

import { HelpEntryResponse } from '../../adapters/helpConverter';

import helper from '../../../shared/styles/helper.module.scss';

// TODO: probably need to play with the options here in order to make it look OK
const cleanTextOptions = {
  ...cleanTextDefaultOptions,
  allowedTags: defaults.allowedTags,
  transformTags: {
    ...cleanTextDefaultOptions.transformTags,
    a(_: string, attribs: Attributes) {
      const href = attribs.href.replace(
        /^(https?:)?\/\/www.uniprot.org\//i,
        ''
      );
      console.log(href, attribs.href);
      const isExternal = href === attribs.href;
      return {
        tagName: 'a',
        attribs: {
          ...attribs,
          href: isExternal ? href : urlJoin(BASE_URL, href),
        },
      };
    },
  },
};

console.log('first time');

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
        const url = new URL(href);
        console.log('pushing', href);
        event.preventDefault();
        props.history.push(href);
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

  return (
    <SingleColumnLayout>
      <h1 className="big">{data.title}</h1>
      <Card className={cn({ [helper.stale]: isStale })}>
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
