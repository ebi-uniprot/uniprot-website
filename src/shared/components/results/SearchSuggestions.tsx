import { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LongNumber, EllipsisReveal } from 'franklin-sites';
import qs from 'query-string';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';
import listFormat from '../../utils/listFormat';
import { flatten } from '../../../query-builder/utils/parseAndMatchQuery';

import { Namespace } from '../../types/namespaces';
import { LocationToPath, Location } from '../../../app/config/urls';

import { SearchTermType } from '../../../query-builder/types/searchTypes';

type MatchedFields = Array<{
  name: string;
  hits: number;
}>;

type MatchedFieldsResponse = {
  matchedFields?: MatchedFields;
};

const simpleQuery = /^[a-zA-Z0-9]+$/;
const finalBrackets = / \[[A-Z]+\]$/;

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
  const shouldSuggest =
    // Only when there are results
    // also serves to delay the requests below to prioritise getting the results
    total &&
    // Only when it's needed to filter down results (=> many results)
    total > 10 &&
    // Only for UniProtKB
    namespace === Namespace.uniprotkb &&
    // Only for queries with content
    !!query?.length &&
    // And only simple queries
    simpleQuery.test(query);

  const { data } = useDataApi<MatchedFieldsResponse>(
    shouldSuggest
      ? `${apiUrls.search(namespace)}?${qs.stringify({
          size: 0,
          query,
          showSingleTermMatchedFields: true,
        })}`
      : null
  );

  // Data to enrich the suggestions with nice labels
  const { data: searchTermsData } = useDataApi<SearchTermType[]>(
    shouldSuggest && data?.matchedFields?.length
      ? apiUrls.queryBuilderTerms(namespace)
      : undefined
  );

  const searchTerms = useMemo(() => {
    if (!searchTermsData || !data?.matchedFields?.length) {
      return null;
    }
    const flattenedTerms = flatten(searchTermsData);

    return (
      data.matchedFields
        .map((matchField) => {
          const term = flattenedTerms.find(
            ({ term }) => term === matchField.name
          );
          return {
            ...matchField,
            label:
              (term?.label || term?.parent?.label)?.replace(
                finalBrackets,
                ''
              ) || matchField.name,
          };
        })
        // Sort by number of hits, from more to less
        .sort((a, b) => b.hits - a.hits)
    );
  }, [data, searchTermsData]);

  if (!searchTerms) {
    return null;
  }

  const fragments = searchTerms.map((matchedField, index, array) => (
    <Fragment key={matchedField.name}>
      {listFormat(index, array, 'or')}
      <Link
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=${matchedField.name}:${query}`,
        }}
      >
        {matchedField.label} (<LongNumber>{matchedField.hits}</LongNumber>)
      </Link>
    </Fragment>
  ));

  const limit = 2;

  const visibleFragments = fragments.slice(0, limit);
  const hiddenFragments = fragments.slice(limit);

  return (
    <small>
      {' '}
      or search &quot;{query}&quot; as a {visibleFragments}
      {hiddenFragments.length ? (
        <EllipsisReveal>{hiddenFragments}</EllipsisReveal>
      ) : null}
    </small>
  );
};

export default SearchSuggestions;
