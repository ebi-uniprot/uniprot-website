import { useState, useEffect, FC, Fragment } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { MainSearch, Button } from 'franklin-sites';

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
            {examples[namespace] && (
              <>
                Examples:{' '}
                {examples[namespace]?.map((example, index) => (
                  <Fragment key={example}>
                    {index === 0 ? null : ', '}
                    <Button
                      variant="tertiary"
                      onClick={() => loadExample(example)}
                    >
                      {example}
                    </Button>
                  </Fragment>
                ))}
              </>
            )}
          </section>
          <section>
            <Button
              variant="tertiary"
              element={Link}
              to={LocationToPath[Location.UploadList]}
            >
              Search with a list of IDs
            </Button>
          </section>
        </section>
      )}
    </section>
  );
};

export default Search;
