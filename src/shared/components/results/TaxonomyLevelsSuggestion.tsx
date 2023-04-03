import ProteomeSuggestion from './ProteomeSuggestion';
import { SearchTextLink, taxonHierarchySearchTerms } from './SearchSuggestions';

import {
  parse,
  stringify,
} from '../../../query-builder/utils/queryStringProcessor';

import { Clause } from '../../../query-builder/types/searchTypes';

import OrganismSuggestion from './OrganismSuggestion';

const TaxonomyLevelsSuggestion = ({ query }: { query: string }) => {
  let modifiedClauses: Clause[] = [];

  let searchValue = '';

  const parsedQuery = parse(query);
  modifiedClauses = parsedQuery.map((clause) => {
    if (taxonHierarchySearchTerms.includes(clause.searchTerm.term)) {
      const queryBit = clause.queryBits;
      const modifiedQueryBit: Record<string, string> = {};
      Object.entries(queryBit).forEach(([k, v]) => {
        const suggestion = k === 'taxonomy_id' ? 'organism_id' : 'taxonomy_id';
        modifiedQueryBit[suggestion] = v;
        searchValue = v;
      });
      return { ...clause, queryBits: modifiedQueryBit };
    }
    return { ...clause };
  });

  const modifiedQuery = stringify(modifiedClauses);

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
