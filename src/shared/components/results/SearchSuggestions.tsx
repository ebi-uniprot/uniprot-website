import { Namespace } from '../../types/namespaces';
import {
  exactMatchSearchTerms,
  taxonHierarchySearchTerms,
} from '../../utils/searchSuggestions';
import AdvancedSearchSuggestion from './AdvancedSearchSuggestion';
import ExactFieldSuggestion from './ExactFieldSuggestion';
import TaxonomyLevelsSuggestion from './TaxonomyLevelsSuggestion';

const simpleQuery = /^[a-zA-Z0-9]+$/;

const hasMatchingQuery = (terms: string[], query: string) =>
  new RegExp(terms.map((w) => `\\b${w}\\b`).join('|'), 'g').test(query);

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
    // Only for queries with content
    !!query?.length;

  if (validQueryWithContent) {
    if (simpleQuery.test(query) && namespace === Namespace.uniprotkb) {
      return <AdvancedSearchSuggestion query={query} total={total} />;
    }
    if (
      hasMatchingQuery(exactMatchSearchTerms, query) &&
      !query.includes('exact') &&
      namespace === Namespace.uniprotkb
    ) {
      return <ExactFieldSuggestion query={query} total={total} />;
    }
    if (
      hasMatchingQuery(taxonHierarchySearchTerms, query) &&
      (namespace === Namespace.uniprotkb || namespace === Namespace.uniparc)
    ) {
      return (
        <TaxonomyLevelsSuggestion
          namespace={namespace}
          query={query}
          total={total}
        />
      );
    }
    // Add more suggestions in the future here
  }
  return null;
};

export default SearchSuggestions;
