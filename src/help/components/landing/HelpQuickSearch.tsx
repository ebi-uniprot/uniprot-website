import { Card, InfoList, SearchInput } from 'franklin-sites';
import { debounce } from 'lodash-es';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import { stringifyQuery } from '../../../shared/utils/url';
import helpURL from '../../config/apiUrls';
import { HelpSearchResponse } from '../../types/apiModel';
import CleanHighlightMarkDown from '../results/CleanHighlightMarkDown';
import styles from './styles/help-quick-search.module.scss';

const numberResultsInView = 5 as const;

type LocationState = { query: string };

const HelpQuickSearch = () => {
  const location = useLocation<undefined | LocationState>();
  const history = useHistory();

  const query = location?.state?.query || '';
  const [searchValue, setSearchValue] = useState<string>(query);
  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    query && helpURL.search({ query, size: `${numberResultsInView}` })
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

  const allArticlesLocation = {
    pathname: LocationToPath[Location.HelpResults],
    search: stringifyQuery({ query: searchValue }),
  };

  const allArticles = dataObject.data?.results;
  const infoData = allArticles?.map(({ matches, title, id }) => {
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
      link: <Link to={to} />,
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
        onKeyDown={({ key }) => {
          if (key === 'Enter' && searchValue) {
            history.push(allArticlesLocation);
          }
        }}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      {!!allArticles?.length && !!infoData?.length && searchValue && (
        <div className={styles['help-quick-search__results']}>
          <Card>
            <InfoList infoData={infoData} />
            {dataObject.headers?.['x-total-results'] ? (
              <div className={styles['help-quick-search__results__all-link']}>
                <Link to={allArticlesLocation}>
                  Show all results ({dataObject.headers?.['x-total-results']})
                </Link>
              </div>
            ) : null}
          </Card>
        </div>
      )}
    </div>
  );
};

export default HelpQuickSearch;
