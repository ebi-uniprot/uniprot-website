import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { MainSearch } from 'franklin-sites';

import {
  LocationToPath,
  Location,
  SearchResultsLocations,
} from '../../../app/config/urls';
import { Namespace, NamespaceLabels } from '../../types/searchTypes';

import './styles/search-container.scss';

const Search = () => {
  const history = useHistory();

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

  const setNamespace = (namespace: string) => {
    setSelectedNamespace(namespace);
  };

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
