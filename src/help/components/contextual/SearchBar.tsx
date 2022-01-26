import { SearchInput } from 'franklin-sites';
import { debounce } from 'lodash-es';
import { useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/search-bar.module.scss';

const SearchBar = () => {
  const history = useHistory();

  const replaceQueryInLocation = useMemo(
    () =>
      debounce((searchValue: string) => {
        history.replace({
          pathname: LocationToPath[Location.HelpResults],
          search: qs.stringify({ query: searchValue || undefined }),
        });
      }, 500),
    [history]
  );

  useEffect(() => replaceQueryInLocation.cancel, [replaceQueryInLocation]);

  return (
    <div className={styles.container}>
      <SearchInput
        placeholder="Search"
        className={styles.input}
        onChange={(event) => replaceQueryInLocation(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
