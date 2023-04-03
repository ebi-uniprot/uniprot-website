import ProteomeSuggestion from './ProteomeSuggestion';
import {
  modifyQueryWithSuggestions,
  SearchTextLink,
  taxonHierarchySearchTerms,
} from './SearchSuggestions';
import OrganismSuggestion from './OrganismSuggestion';

const TaxonomyLevelsSuggestion = ({ query }: { query: string }) => {
  const { modifiedQuery, searchValue } = modifyQueryWithSuggestions(
    query,
    'taxon',
    taxonHierarchySearchTerms
  );

  if (query !== modifiedQuery) {
    const searchByOrganism = query.includes('organism');
    return (
      <small>
        {searchByOrganism ? (
          <>
            {' '}
            or expand search to "<b>{searchValue}</b>" to{' '}
            <SearchTextLink
              query={modifiedQuery}
              text="include lower taxonomic ranks"
            />
            {!query.includes('proteome') && (
              <ProteomeSuggestion query={query} organismID={searchValue} />
            )}
          </>
        ) : (
          <OrganismSuggestion query={modifiedQuery} taxonID={searchValue} />
        )}
      </small>
    );
  }
  return null;
};

export default TaxonomyLevelsSuggestion;
