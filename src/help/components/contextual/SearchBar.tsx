import { SearchInput } from 'franklin-sites';
import { useCallback, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/search-bar.module.scss';

const SearchBar = () => {
  const history = useHistory();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      history.push({
        pathname: LocationToPath[Location.HelpResults],
        search: `query=${event.target.value || '*'}`,
      });
    },
    [history]
  );

  return (
    <div className={styles.container}>
      <SearchInput
        placeholder="Search"
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
