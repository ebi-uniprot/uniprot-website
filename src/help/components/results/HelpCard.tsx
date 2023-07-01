import { memo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card } from 'franklin-sites';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';

import CleanHighlightMarkDown from './CleanHighlightMarkDown';
import parseDate from '../../../shared/utils/parseDate';

import styles from '../../../shared/styles/helper.module.scss';

type Props = {
  id: string;
  title: string;
  titleMatch?: string;
  contentMatch?: string;
  releaseDate?: string;
  headingLevel?: `h${1 | 2 | 3 | 4 | 5 | 6}`;
};

const HelpCard = ({
  id,
  title,
  titleMatch,
  contentMatch,
  releaseDate,
  headingLevel = 'h2',
}: Props) => {
  const isReleaseNote = Boolean(
    useRouteMatch(LocationToPath[Location.ReleaseNotesResults])
  );
  const to = getLocationEntryPath(
    isReleaseNote ? Location.ReleaseNotesEntry : Location.HelpEntry,
    id
  );
  const now = new Date();
  const date = releaseDate ? parseDate(releaseDate) : null;

  const HeadingElement = headingLevel;

  return (
    <Card
      data-testid="help-card"
      header={
        <HeadingElement className="small" data-testid="help-title">
          <Link to={to}>
            {titleMatch ? <CleanHighlightMarkDown md={titleMatch} /> : title}
          </Link>
        </HeadingElement>
      }
      headerSeparator={false}
    >
      {isReleaseNote && (
        <>
          {date && date < now ? (
            <time className={styles.emphasized} dateTime={date.toISOString()}>
              {date.toDateString()}
            </time>
          ) : (
            <span className={styles.emphasized}>unreleased</span>
          )}
          <br />
        </>
      )}
      {contentMatch && <CleanHighlightMarkDown md={contentMatch} />}
    </Card>
  );
};

export default memo(HelpCard);
