import { useState, ChangeEvent, useCallback, useMemo } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { Chip, CodeBlock } from 'franklin-sites';
import fm from 'front-matter';
import { marked } from 'marked';

import HelpEntry, { getCleanTextOptions } from './Entry';
import HTMLHead from '../../../shared/components/HTMLHead';

import useDataApi from '../../../shared/hooks/useDataApi';

import { help as helpURL } from '../../../shared/config/apiUrls';
import cleanText from '../../../shared/utils/cleanText';
import { pluralise } from '../../../shared/utils/utils';

import { HelpEntryResponse } from '../../adapters/helpConverter';

import styles from './styles/entry-preview.module.scss';

const ghWikiRE =
  /^https:\/\/github\.com\/(?<user>[^/]+)\/(?<project>[^/]+)\/wiki\/(?<file>.+)$/;
const ghNormalRE =
  /^https:\/\/github\.com\/(?<user>[^/]+)\/(?<project>[^/]+)\/blob\/(?<filepath>.+)$/;
const arraySeparator = /\s*,\s*/;

const defaultData: HelpEntryResponse = {
  id: '_preview',
  title: 'title',
  categories: [],
  content: 'content',
  lastModified: new Date().toISOString(),
};

const Category = ({ category }: { category: string }) => {
  const { headers } = useDataApi(
    useMemo(
      () =>
        helpURL.search({
          size: '0',
          queryFacets: [`category:${category}`],
          facets: null,
        }),
      [category]
    )
  );

  const total = +(headers?.['x-total-records'] || 0);

  if (!headers) {
    return <Chip>{category}</Chip>;
  }

  return (
    <Chip>
      {category} ({total} {pluralise('article', total)}{' '}
      {total === 0 ? '❌' : '✅'})
    </Chip>
  );
};

const EntryPreview = (props: RouteChildrenProps<{ accession: string }>) => {
  const [url, setUrl] = useState('');
  const { data } = useDataApi<string>(url);

  const [parsedData, otherAttributes] = useMemo<
    [
      data: HelpEntryResponse,
      otherAttributes?: Record<string, string | undefined>
    ]
  >(() => {
    if (!data) {
      return [defaultData];
    }
    const {
      attributes: { title, categories, ...otherAttributes },
      body,
    } = fm<{
      title?: string;
      categories?: string;
      [key: string]: string | undefined;
    }>(data.trim());
    const content = cleanText(marked(body), getCleanTextOptions('h1'));
    return [
      {
        id: '_preview',
        title: title || '',
        categories:
          categories?.replaceAll('_', ' ')?.split(arraySeparator) || [],
        content,
        lastModified: new Date().toISOString(),
      },
      otherAttributes,
    ];
  }, [data]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value.trim();
    if (!url || !url.startsWith('https://')) {
      return;
    }
    if (url.startsWith('https://github.com/')) {
      // we don't have the raw file, try to find it
      const ghWikiMatch = url.match(ghWikiRE);
      if (ghWikiMatch?.groups) {
        setUrl(
          `https://raw.githubusercontent.com/wiki/${ghWikiMatch.groups.user}/${ghWikiMatch.groups.project}/${ghWikiMatch.groups.file}.md`
        );
        return;
      }

      const ghNormalMatch = url.match(ghNormalRE);
      if (ghNormalMatch?.groups) {
        setUrl(
          `https://raw.githubusercontent.com/${ghNormalMatch.groups.user}/${ghNormalMatch.groups.project}/${ghNormalMatch.groups.filepath}`
        );
        return;
      }
    }
    setUrl(url);
  }, []);

  // Note: copy structure of "normal" help entry page in order to preview it
  // Maybe we should just use the actual help entry page?
  return (
    <>
      <HTMLHead>
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <section className={styles['private-area']}>
        <div>The content outside of this area is a preview</div>
        <label>
          Load article content from a URL:{' '}
          <input type="url" onChange={handleChange} />
        </label>
        {data && (
          <output>
            <details>
              <summary>Raw loaded content</summary>
              <CodeBlock>{data}</CodeBlock>
            </details>
          </output>
        )}
        {data && (
          <output>
            <details>
              <summary>Parsed metadata</summary>
              <dl>
                <dt>
                  title{' '}
                  {parsedData.title ? '✅' : '❌ a title needs to be provided'}
                </dt>
                <dd>{parsedData.title}</dd>
              </dl>
              <dl>
                <dt>
                  categories{' '}
                  {parsedData.categories.length
                    ? '✅'
                    : '❌ one or more categories need to be provided'}
                </dt>
                <dd>
                  {parsedData.categories.map((category) => (
                    <Category category={category} key={category} />
                  ))}
                </dd>
              </dl>
              {Object.entries(otherAttributes || {}).map(([key, value]) => (
                <dl>
                  <dt>{key} ❌ ignored/invalid field</dt>
                  <dd>{value}</dd>
                </dl>
              ))}
            </details>
          </output>
        )}
      </section>
      {parsedData !== defaultData && (
        <HelpEntry {...props} overrideContent={parsedData} />
      )}
    </>
  );
};

export default EntryPreview;
