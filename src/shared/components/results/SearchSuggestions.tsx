import { Link } from 'react-router-dom';

import AdvancedSearchSuggestion from './AdvancedSearchSuggestion';
import ExactFieldSuggestion from './ExactFieldSuggestion';
import TaxonomyLevelsSuggestion from './TaxonomyLevelsSuggestion';

import { Namespace } from '../../types/namespaces';

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
    to={() => ({
      search: `query=${query}`,
    })}
  >
    {text}
  </Link>
);

const SearchSuggestions = ({
  query,
  namespace,
  total,
}: {
  query?: string;
  namespace?: Namespace;
  total?: number;
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
    return (
      <>
        {simpleQuery.test(query) && <AdvancedSearchSuggestion query={query} />}
        {exactMatchSearchTerms.some((term) => query.includes(term)) && (
          <ExactFieldSuggestion query={query} />
        )}
        {taxonHierarchySearchTerms.some((term) => query.includes(term)) && (
          <TaxonomyLevelsSuggestion query={query} />
        )}
      </>
    );
  }
  return null;
};

export default SearchSuggestions;
