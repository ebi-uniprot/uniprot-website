import { Link } from 'react-router-dom';

import {
  parse,
  stringify,
} from '../../../query-builder/utils/queryStringProcessor';
import { exactMatchSearchTerms } from './SearchSuggestions';

import { Clause } from '../../../query-builder/types/searchTypes';

const ExactFieldSuggestion = ({ query }: { query: string }) => {
  let modifiedClauses: Clause[] = [];
  let searchValue = '';

  const parsedQuery = parse(query);
  modifiedClauses = parsedQuery.map((clause) => {
    if (exactMatchSearchTerms.includes(clause.searchTerm.term)) {
      const queryBit = clause.queryBits;
      const modifiedQueryBit: Record<string, string> = {};
      Object.entries(queryBit).forEach(([k, v]) => {
        modifiedQueryBit[`${k}_exact`] = v;
        searchValue = v;
      });
      return { ...clause, queryBits: modifiedQueryBit };
    }
    return { ...clause };
  });

  const modifiedQuery = stringify(modifiedClauses);

  if (query !== modifiedQuery) {
    return (
      <small>
        {' '}
        or show only exact matches for{' '}
        <Link
          // eslint-disable-next-line uniprot-website/use-config-location
          to={(location) => ({
            ...location,
            search: `query=${modifiedQuery}`,
          })}
        >
          {searchValue}
        </Link>
      </small>
    );
  }
  return null;
};

export default ExactFieldSuggestion;
