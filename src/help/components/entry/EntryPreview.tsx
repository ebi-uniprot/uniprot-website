import { useMemo } from 'react';
import { Card, Message } from 'franklin-sites';
import cn from 'classnames';

import { HelpEntryContent } from './Entry';
import HTMLHead from '../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';

import parseDate from '../../../shared/utils/parseDate';

import styles from './styles/entry.module.scss';

const EntryPreview = () => {
  console.log('preview');

  const data = {
    title: 'title',
    categories: ['categories'],
    content: 'content',
    matches: [],
    lastModified: Date.now(),
  };

  const lastModifed = parseDate(data.lastModified);

  return (
    <SingleColumnLayout>
      <HTMLHead title={[data.title, 'UniProt help']} />
      <Message level="info" className={styles['beta-message']}>
        During the beta phase, help content may not be up to date.
      </Message>
      <h1 className={data.categories.includes('faq') ? 'big' : undefined}>
        {data.title}
      </h1>
      <Card className={cn(styles.content)}>
        <HelpEntryContent data={data} />
      </Card>
      {lastModifed && (
        <div className={styles['last-updated-help']}>
          <small>
            {' '}
            Page last modified:{' '}
            <time dateTime={lastModifed.toISOString()}>
              {lastModifed.toDateString()}
            </time>
          </small>
        </div>
      )}
    </SingleColumnLayout>
  );
};

export default EntryPreview;
