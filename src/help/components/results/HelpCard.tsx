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
};

const HelpCard = ({
  id,
  title,
  titleMatch,
  contentMatch,
  releaseDate,
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

  return (
    <Card
      data-testid="help-card"
      header={
        <h2 className="small" data-testid="help-title">
          <Link to={to}>
            {titleMatch ? <CleanHighlightMarkDown md={titleMatch} /> : title}
          </Link>
        </h2>
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
