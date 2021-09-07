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

  const articles = dataObject?.data?.results.map(({ matches, title, id }) => {
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
      {!!articles?.length && searchValue && (
        <Card>
          <InfoList infoData={articles} />
        </Card>
      )}
    </div>
  );
};

export default HelpAutocomplete;
