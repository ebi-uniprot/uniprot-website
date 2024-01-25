import { useState, ChangeEvent, useCallback, useMemo, useEffect } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { Chip, CodeBlock } from 'franklin-sites';
import fm from 'front-matter';
import { marked } from 'marked';

import HelpEntry, { getCleanTextOptions } from './Entry';
import HTMLHead from '../../../shared/components/HTMLHead';

import useDataApi from '../../../shared/hooks/useDataApi';

import helpURL from '../../config/apiUrls';
import cleanText from '../../../shared/utils/cleanText';
import { pluralise } from '../../../shared/utils/utils';

import { HelpEntryResponse } from '../../types/apiModel';

import styles from './styles/entry-preview.module.scss';

const ghWikiRE =
  /^https:\/\/github\.com\/(?<user>[^/]+)\/(?<project>[^/]+)\/wiki\/(?<file>.+)$/;
const ghNormalRE =
  /^https:\/\/github\.com\/(?<user>[^/]+)\/(?<project>[^/]+)\/blob\/(?<filepath>.+)$/;
const arraySeparator = /\s*,\s*/;

const getDefaultData = (
  type: HelpEntryResponse['type']
): HelpEntryResponse => ({
  id: '_preview',
  title: 'title',
  type,
  categories: [],
  content: 'content',
  lastModified: new Date().toISOString(),
});

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

  const total = +(headers?.['x-total-results'] || 0);

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

const EntryPreview = ({
  match,
  location,
  history,
}: RouteChildrenProps<{ accession: string }, string>) => {
  const isReleaseNotes = match?.path.includes('release-notes');

  const [url, setUrl] = useState(location.state || '');
  const { data } = useDataApi<string>(url);

  const [parsedData, otherAttributes] = useMemo<
    [data: HelpEntryResponse, otherAttributes?: Record<string, unknown>]
  >(() => {
    if (!data) {
      return [getDefaultData(isReleaseNotes ? 'releaseNotes' : 'help')];
    }
    const {
      attributes: { title, categories, type, date, ...otherAttributes },
      body,
    } = fm<{
      title?: string;
      categories?: string;
      [key: string]: string | Date | undefined;
    }>(data.trim());
    const content = cleanText(marked(body), getCleanTextOptions('h1'));
    const parsedData: HelpEntryResponse = {
      id: '_preview',
      title: title || '',
      type: isReleaseNotes ? 'releaseNotes' : 'help',
      categories: categories?.replaceAll('_', ' ')?.split(arraySeparator) || [],
      content,
      lastModified: new Date().toISOString(),
    };
    if (isReleaseNotes) {
      parsedData.releaseDate = date && (date as Date).toISOString();
    }
    if (!isReleaseNotes && date) {
      otherAttributes.date = date;
    }
    return [parsedData, otherAttributes];
  }, [data, isReleaseNotes]);

  useEffect(() => {
    history.replace({ ...history.location, state: url });
  }, [history, url]);

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
        <div>
          Content loaded in this page is a preview of what a{' '}
          <strong>
            {isReleaseNotes ? 'release note page' : 'help article'}
          </strong>{' '}
          will look like when rendered in the website
        </div>
        <label>
          Load content from a URL:{' '}
          <input
            type="url"
            onChange={handleChange}
            defaultValue={url}
            placeholder={`https://github.com/ebi-uniprot/uniprot-manual/blob/main/${
              isReleaseNotes ? 'release-notes/YYYY-MM-DD-release' : 'help/about'
            }.md`}
          />
        </label>
        {data && (
          <output>
            Parsed metadata
            <div className={styles.checks}>
              <dl>
                <dt>
                  title{' '}
                  {parsedData.title ? '✅' : '❌ a title needs to be provided'}
                </dt>
                <dd>{parsedData.title}</dd>
              </dl>
              <dl>
                <dt>
                  type{' '}
                  {parsedData.type === 'help' ||
                  parsedData.type === 'releaseNotes'
                    ? '✅'
                    : '❌ invalid type'}
                </dt>
                <dd>{parsedData.type}</dd>
              </dl>
              {isReleaseNotes ? (
                <dl>
                  <dt>
                    date{' '}
                    {parsedData.releaseDate
                      ? '✅'
                      : '❌ a release date needs to be set'}
                  </dt>
                  <dd>{parsedData.releaseDate}</dd>
                </dl>
              ) : (
                <dl>
                  <dt>
                    categories{' '}
                    {parsedData.categories?.length
                      ? '✅'
                      : '❌ one or more categories need to be provided'}
                  </dt>
                  <dd>
                    {parsedData.categories?.map((category) => (
                      <Category category={category} key={category} />
                    ))}
                  </dd>
                </dl>
              )}
              {Object.entries(otherAttributes || {}).map(([key, value]) => (
                <dl>
                  <dt>{key} ❌ ignored/invalid field</dt>
                  <dd>{`${value}`}</dd>
                </dl>
              ))}
            </div>
          </output>
        )}
        {data && (
          <output>
            <details>
              <summary>Raw loaded content</summary>
              <CodeBlock>{data}</CodeBlock>
            </details>
          </output>
        )}
      </section>
      {parsedData.content !== 'content' && (
        <HelpEntry
          history={history}
          match={match}
          location={location}
          overrideContent={parsedData}
        />
      )}
    </>
  );
};

export default EntryPreview;
