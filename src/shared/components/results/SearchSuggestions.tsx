import { Link } from 'react-router-dom';

import AdvancedSearchSuggestion from './AdvancedSearchSuggestion';
import ExactFieldSuggestion from './ExactFieldSuggestion';
import TaxonomyLevelsSuggestion from './TaxonomyLevelsSuggestion';

import {
  parse,
  stringify,
} from '../../../query-builder/utils/queryStringProcessor';

import { Namespace } from '../../types/namespaces';
import { Clause } from '../../../query-builder/types/searchTypes';
import { APIModel } from '../../types/apiModel';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';

const simpleQuery = /^[a-zA-Z0-9]+$/;

export const exactMatchSearchTerms = ['gene', 'ec'];
export const taxonHierarchySearchTerms = ['taxonomy_id', 'organism_id'];

export const SearchTextLink = ({
  query,
  text,
}: {
  query: string;
  text: string;
}) => (
  <Link
    // eslint-disable-next-line uniprot-website/use-config-location
    to={() => ({
      search: `query=${query}`,
    })}
  >
    {text}
  </Link>
);

export const modifyQueryWithSuggestions = (
  query: string,
  searchType: 'exact' | 'taxon',
  searchTerms: string[]
) => {
  const parsedQuery = parse(query);
  let searchValue = '';

  const modifiedClauses: Clause[] = parsedQuery.map((clause) => {
    if (searchTerms.includes(clause.searchTerm.term)) {
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

const hasMatchingQuery = (terms: string[], query: string) =>
  new RegExp(terms.map((w) => `\\b${w}\\b`).join('|'), 'g').test(query);

const SearchSuggestions = ({
  query,
  namespace,
  total,
  loadedResults,
}: {
  query?: string;
  namespace?: Namespace;
  total?: number;
  loadedResults?: APIModel[];
}) => {
  // We try to not have a request if not needed, under these conditions:
  const validQueryWithContent = // Only when there are results
    // also serves to delay the requests below to prioritise getting the results
    total &&
    // Only for UniProtKB
    namespace === Namespace.uniprotkb &&
    // Only for queries with content
    !!query?.length;

  if (validQueryWithContent) {
    if (simpleQuery.test(query)) {
      return <AdvancedSearchSuggestion query={query} total={total} />;
    }
    if (
      hasMatchingQuery(exactMatchSearchTerms, query) &&
      !query.includes('exact')
    ) {
      return (
        <ExactFieldSuggestion
          query={query}
          total={total}
          results={loadedResults as UniProtkbAPIModel[]}
        />
      );
    }
    if (hasMatchingQuery(taxonHierarchySearchTerms, query)) {
      return <TaxonomyLevelsSuggestion query={query} total={total} />;
    }
    // Add more suggestions in the future here
  }
  return null;
};

export default SearchSuggestions;
