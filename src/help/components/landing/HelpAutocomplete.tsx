import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { generatePath, Link, useHistory, useLocation } from 'react-router-dom';
import { Card, InfoList, SearchInput } from 'franklin-sites';
import qs from 'query-string';
import { debounce } from 'lodash-es';

import CleanHighlightMarkDown from '../../utils/CleanHighlightMarkDown';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { help as helpURL } from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import { HelpSearchResponse } from '../../adapters/helpConverter';

import styles from './styles/help-autocomplete.module.scss';

const numberResultsInView = 5 as const;

const HelpAutocomplete = () => {
  const location = useLocation();
  const history = useHistory();

  const [searchValue, setSearchValue] = useState<string>(() => {
    const { query } = qs.parse(location.search);
    const searchValue = Array.isArray(query) ? query.join(' ') : query;
    return searchValue || '';
  });

  const parsed = location.search && qs.parse(location.search);
  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    parsed && helpURL.search(parsed)
  );

  const replaceLocation = useMemo(
    () =>
      debounce((searchValue: string) => {
        history.replace({
          pathname: LocationToPath[Location.HelpLanding],
          search: qs.stringify({
            ...qs.parse(history.location.search),
            query: searchValue || undefined,
          }),
        });
      }, 500),
    [history]
  );

  useEffect(() => {
    replaceLocation(searchValue);
    return replaceLocation.cancel;
  }, [replaceLocation, searchValue]);

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
            {' '}
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
        autoFocus
      />
      {!!nAllArticles && !!infoData?.length && searchValue && (
        <Card>
          <InfoList
            className={styles['help-autocomplete__result-list']}
            infoData={infoData}
          />
          <div className={styles['help-autocomplete__all-link']}>
            <Link
              to={{
                pathname: LocationToPath[Location.HelpResults],
                search: location.search,
              }}
            >
              Show all results ({nAllArticles})
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HelpAutocomplete;
