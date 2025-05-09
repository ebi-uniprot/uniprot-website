import { SearchInput } from 'franklin-sites';
import { debounce } from 'lodash-es';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { stringifyQuery } from '../../../shared/utils/url';
import styles from './styles/search-bar.module.scss';

const SearchBar = ({ isLoading }: { isLoading: boolean }) => {
  const history = useHistory();
  const [value, setValue] = useState('');

  const replaceQueryInLocation = useMemo(
    () =>
      debounce((searchValue: string) => {
        // Push only the first time we get a new search, replace otherwise
        history[history.location.search ? 'replace' : 'push']({
          pathname: LocationToPath[Location.HelpResults],
          search: stringifyQuery({ query: searchValue || undefined }),
        });
      }, 500),
    [history]
  );

  useEffect(() => replaceQueryInLocation.cancel, [replaceQueryInLocation]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      replaceQueryInLocation(event.target.value);
      setValue(event.target.value);
      if (!event.target.value) {
        // get to the landing asap if no search value
        replaceQueryInLocation.flush();
      }
    },
    [replaceQueryInLocation]
  );

  return (
    <div className={styles.container}>
      <SearchInput
        placeholder="Search"
        className={styles.input}
        onChange={handleChange}
        isLoading={isLoading}
        value={value}
      />
    </div>
  );
};

export default SearchBar;
