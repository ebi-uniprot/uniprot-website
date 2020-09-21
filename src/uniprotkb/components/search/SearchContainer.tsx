import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { MainSearch } from 'franklin-sites';

import { SearchResultsLocations } from '../../../app/config/urls';
import { Namespace, NamespaceLabels } from '../../../shared/types/namespaces';

import './styles/search-container.scss';

const Search = () => {
  const history = useHistory();
  const location = useLocation();

  // local state to hold the search value without modifying URL
  const [searchTerm, setSearchTerm] = useState(
    // initialise with whatever is already in the URL
    queryString.parse(history.location.search, { decode: true }).query
  );

  const [selectedNamespace, setSelectedNamespace] = useState(
    Namespace.uniprotkb
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
      pathname: SearchResultsLocations[selectedNamespace],
      search: stringifiedSearch,
    });
  };

  const setNamespace = (namespace: Namespace) => {
    setSelectedNamespace(namespace);
  };

  // reset the text content when there is a navigation to reflect what is in the
  // URL. That includes removing the text when browsing to a non-search page.
  useEffect(() => {
    setSearchTerm(queryString.parse(location.search, { decode: true }).query);
  }, [location]);

  return (
    <MainSearch
      namespaces={NamespaceLabels}
      searchTerm={searchTerm}
      onChange={setSearchTerm}
      onSubmit={handleSubmit}
      onNamespaceChange={setNamespace}
      selectedNamespace={selectedNamespace}
    />
  );
};

export default Search;
