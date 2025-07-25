import { Clause } from '../../query-builder/types/searchTypes';
import {
  parse,
  stringify,
} from '../../query-builder/utils/queryStringProcessor';

export const taxonHierarchySearchTerms = ['taxonomy_id', 'organism_id'];

export const exactMatchSearchTerms = ['gene', 'ec'];

export const modifyQueryWithSuggestions = (
  query: string,
  searchType: 'exact' | 'taxon',
  searchTerms: string[]
) => {
  const parsedQuery = parse(query);
  let searchValue = '';

  const modifiedClauses: Clause[] = parsedQuery.map((clause) => {
    if (
      clause.searchTerm.term &&
      searchTerms.includes(clause.searchTerm.term)
    ) {
      const queryBit = clause.queryBits;
      const modifiedQueryBit: Record<string, string> = {};
      Object.entries(queryBit).forEach(([k, v]) => {
        if (searchType === 'exact') {
          modifiedQueryBit[`${k}_exact`] = v;
        } else if (searchType === 'taxon') {
          const suggestion =
            k === 'taxonomy_id' ? 'organism_id' : 'taxonomy_id';
          modifiedQueryBit[suggestion] = v;
        }
        searchValue = v;
      });
      return { ...clause, queryBits: modifiedQueryBit };
    }
    return { ...clause };
  });

  const modifiedQuery = stringify(modifiedClauses);
  return { modifiedQuery, searchValue };
};
