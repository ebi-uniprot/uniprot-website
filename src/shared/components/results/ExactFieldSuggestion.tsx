import {
  exactMatchSearchTerms,
  modifyQueryWithSuggestions,
  SearchTextLink,
} from './SearchSuggestions';

const ExactFieldSuggestion = ({ query }: { query: string }) => {
  const { modifiedQuery, searchValue } = modifyQueryWithSuggestions(
    query,
    'exact',
    exactMatchSearchTerms
  );

  if (query !== modifiedQuery) {
    return (
      <small>
        {' '}
        or show only exact matches for{' '}
        <SearchTextLink query={modifiedQuery} text={searchValue} />
      </small>
    );
  }
  return null;
};

export default ExactFieldSuggestion;
