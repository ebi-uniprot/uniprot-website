import cn from 'classnames';
import { Loader } from 'franklin-sites';
import { Link } from 'react-router';

import { getLocationEntryPath, Location } from '../../../app/config/urls';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import NoResultsPage from '../../../shared/components/error-pages/full-pages/NoResultsPage';
import { UseDataAPIWithStaleState } from '../../../shared/hooks/useDataApiWithStale';
import { HelpSearchResponse } from '../../types/apiModel';
import CleanHighlightMarkDown from '../results/CleanHighlightMarkDown';
import styles from './styles/results.module.scss';

const Results = ({
  data,
  loading,
  error,
  status,
  progress,
}: UseDataAPIWithStaleState<HelpSearchResponse>) => {
  if (error || (!loading && !data)) {
    return <ErrorHandler status={status} error={error} noReload />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  if (data.results.length) {
    return (
      <ul className={cn('no-bullet', styles.container)}>
        {data.results.map(({ matches, title, id }) => {
          const titleMatch = matches?.title?.[0];
          const contentMatch = matches?.content?.[0];
          const to = getLocationEntryPath(Location.HelpEntry, id);
          return (
            <li key={id}>
              <Link to={to}>
                {titleMatch ? (
                  <CleanHighlightMarkDown md={titleMatch} />
                ) : (
                  title
                )}
              </Link>
              <p className={contentMatch && styles.paragraph}>
                {contentMatch && <CleanHighlightMarkDown md={contentMatch} />}
              </p>
            </li>
          );
        })}
      </ul>
    );
  }

  return <NoResultsPage />;
};

export default Results;
