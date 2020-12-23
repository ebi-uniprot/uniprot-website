import { useState, useEffect, FC } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { MainSearch } from 'franklin-sites';

import {
  Location,
  LocationToPath,
  SearchResultsLocations,
} from '../../../app/config/urls';
import { Namespace, NamespaceLabels } from '../../../shared/types/namespaces';

import './styles/search-container.scss';

// Keep partial until all are added
const examples: Partial<Record<Namespace, string[]>> = {
  [Namespace.uniprotkb]: ['p53', 'Human EGFR', 'Albumin'],
  [Namespace.uniref]: [''],
};

const Search: FC<{
  className?: string;
  includeFooter?: boolean;
  namespace: Namespace;
  onNamespaceChange: (namespace: Namespace) => void;
}> = ({ className, includeFooter = false, namespace, onNamespaceChange }) => {
  const history = useHistory();
  const location = useLocation();

  // local state to hold the search value without modifying URL
  const [searchTerm, setSearchTerm] = useState(
    // initialise with whatever is already in the URL
    queryString.parse(history.location.search, { decode: true }).query
  );

  const handleSubmit = (event: Event) => {
    // prevent normal browser submission
    event.preventDefault();

    // restringify the resulting search
    const stringifiedSearch = queryString.stringify(
      { query: searchTerm || '*' },
      { encode: true }
    );

    // push a new location to the history containing the modified search term
    history.push({
      pathname: SearchResultsLocations[namespace],
      search: stringifiedSearch,
    });
  };

  const setNamespace = (namespace: Namespace) => {
    onNamespaceChange(namespace);
  };

  const loadExample = (example: string) => {
    setSearchTerm(example);
  };

  // reset the text content when there is a navigation to reflect what is in the
  // URL. That includes removing the text when browsing to a non-search page.
  useEffect(() => {
    setSearchTerm(queryString.parse(location.search, { decode: true }).query);
  }, [location]);

  return (
    <section className={className}>
      <MainSearch
        namespaces={NamespaceLabels}
        searchTerm={searchTerm}
        onChange={setSearchTerm}
        onSubmit={handleSubmit}
        onNamespaceChange={setNamespace}
        selectedNamespace={namespace}
      />
      {includeFooter && (
        <section className="search-container-footer">
          <section>
            Examples:{' '}
            {examples[namespace]
              ?.map<React.ReactNode>((example) => (
                <button
                  type="button"
                  onClick={() => loadExample(example)}
                  key={example}
                >
                  {example}
                </button>
              ))
              .reduce((prev, curr) => [prev, ', ', curr])}
          </section>
          <section>
            <Link to={LocationToPath[Location.UploadList]}>
              Search with a list of IDs
            </Link>
          </section>
        </section>
      )}
    </section>
  );
};

export default Search;
