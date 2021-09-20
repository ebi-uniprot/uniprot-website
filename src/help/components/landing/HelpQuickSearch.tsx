import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
  KeyboardEvent,
} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Card, InfoList, SearchInput } from 'franklin-sites';
import { debounce } from 'lodash-es';
import qs from 'query-string';

import CleanHighlightMarkDown from '../results/CleanHighlightMarkDown';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';
import {
  LocationToPath,
  Location,
  getLocationEntryPath,
} from '../../../app/config/urls';

import { HelpSearchResponse } from '../../adapters/helpConverter';

import styles from './styles/help-quick-search.module.scss';

const numberResultsInView = 5 as const;

type LocationState = { query: string };

const HelpQuickSearch = () => {
  const location = useLocation<undefined | LocationState>();
  const history = useHistory();

  const query = location?.state?.query || '';
  const [searchValue, setSearchValue] = useState<string>(query);
  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    query && helpURL.search({ query })
  );
  const replaceQueryInHistory = useMemo(
    () =>
      debounce((searchValue: string) => {
        history.replace({
          pathname: LocationToPath[Location.HelpResults],
          state: {
            query: searchValue || undefined,
          },
        });
      }, 500),
    [history]
  );

  useEffect(() => {
    replaceQueryInHistory(searchValue);
    return replaceQueryInHistory.cancel;
  }, [replaceQueryInHistory, searchValue]);

  const allArticlesLocation = useMemo(
    () => ({
      pathname: LocationToPath[Location.HelpResults],
      search: qs.stringify({ query }),
    }),
    [query]
  );

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent<HTMLInputElement>) => {
      if (key === 'Enter') {
        history.push(allArticlesLocation);
      }
    },
    [allArticlesLocation, history]
  );

  const allArticles = dataObject?.data?.results;
  const infoData = allArticles
    ?.slice(0, numberResultsInView)
    .map(({ matches, title, id }) => {
      const titleMatch = matches?.title?.[0];
      const contentMatch = matches?.content?.[0];
      const to = getLocationEntryPath(Location.HelpEntry, id);
      return {
        title: (
          <Link to={to}>
            {titleMatch ? <CleanHighlightMarkDown md={titleMatch} /> : title}
          </Link>
        ),
        content: contentMatch ? (
          <CleanHighlightMarkDown md={contentMatch} />
        ) : (
          ' '
        ),
        to,
      };
    });

  return (
    <div className={styles['help-quick-search']}>
      <SearchInput
        isLoading={dataObject.loading}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
        placeholder="Search"
        value={searchValue}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      {!!allArticles?.length && !!infoData?.length && searchValue && (
        <div className={styles['help-quick-search__results']}>
          <Card>
            <InfoList infoData={infoData} />
            <div className={styles['help-quick-search__results__all-link']}>
              <Link to={allArticlesLocation}>
                Show all results ({allArticles.length})
              </Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HelpQuickSearch;
