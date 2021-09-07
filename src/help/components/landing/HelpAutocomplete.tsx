import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { generatePath, Link, useHistory, useLocation } from 'react-router-dom';
import { Card, InfoList, SearchInput } from 'franklin-sites';
import { debounce } from 'lodash-es';
import qs from 'query-string';

import CleanHighlightMarkDown from '../../utils/CleanHighlightMarkDown';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import { HelpSearchResponse } from '../../adapters/helpConverter';

import styles from './styles/help-autocomplete.module.scss';

const numberResultsInView = 5 as const;

export type LocationState = { query: string };

const HelpAutocomplete = () => {
  const location = useLocation<undefined | LocationState>();
  const history = useHistory();

  const query = location?.state?.query || '';
  const [searchValue, setSearchValue] = useState<string>(query);
  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    query && helpURL.search({ query })
  );

  const replaceLocation = useMemo(
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
    replaceLocation(searchValue);
    return replaceLocation.cancel;
  }, [replaceLocation, searchValue]);

  const allArticlesLocation = useMemo(
    () => ({
      pathname: LocationToPath[Location.HelpResults],
      search: qs.stringify({ query }),
    }),
    [query]
  );

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === 'Enter') {
        history.push(allArticlesLocation);
      }
    },
    [allArticlesLocation, history]
  );

  const allArticles = dataObject?.data?.results;
  const nAllArticles = allArticles?.length;
  const infoData = allArticles
    ?.slice(0, numberResultsInView)
    .map(({ matches, title, id }) => {
      const titleMatch = matches?.title?.[0];
      const contentMatch = matches?.content?.[0];
      const to = generatePath(LocationToPath[Location.HelpEntry], {
        accession: id,
      });
      return {
        title: (
          <Link to={to}>
            {titleMatch ? <CleanHighlightMarkDown md={titleMatch} /> : title}
          </Link>
        ),
        content: contentMatch && <CleanHighlightMarkDown md={contentMatch} />,
        to,
      };
    });

  return (
    <div className={styles['help-autocomplete']}>
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
      {!!nAllArticles && !!infoData?.length && searchValue && (
        <Card>
          <InfoList
            className={styles['help-autocomplete__result-list']}
            infoData={infoData}
          />
          <div className={styles['help-autocomplete__all-link']}>
            <Link to={allArticlesLocation}>
              Show all results ({nAllArticles})
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HelpAutocomplete;
