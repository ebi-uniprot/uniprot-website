import AdvancedSearchSuggestion from './AdvancedSearchSuggestion';
import ExactFieldSuggestion from './ExactFieldSuggestion';

import { Namespace } from '../../types/namespaces';

const simpleQuery = /^[a-zA-Z0-9]+$/;

export const exactMatchSearchTerms = ['gene', 'ec'];

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
      </>
    );
  }
  return null;
};

export default SearchSuggestions;
