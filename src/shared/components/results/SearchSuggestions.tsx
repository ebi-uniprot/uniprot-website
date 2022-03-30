import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { MatchedField } from '../../types/results';

import helper from '../../styles/helper.module.scss';

type MatchedFieldsResponse = {
  matchedFields?: Array<MatchedField>;
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
  const [linesToDisplay, setLinesToDisplay] = useState(1);
  const [termsToDisplay, setTermsToDisplay] = useState(+Infinity);
  const ref = useRef<HTMLElement>(null);

  // We try to not have a request if not needed, under these conditions:
  const shouldSuggest =
    // Only when there are results
    // also serves to delay the requests below to prioritise getting the results
    total &&
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

  /* Use useLayoutEffect and useState to display the elements, calculate their
  size and wrapping, and update (through react renders) iteratively in order to
  avoid painting flashes to the user */

  useLayoutEffect(() => {
    if (!searchTerms?.length) {
      return;
    }
    setTermsToDisplay(searchTerms.length);
  }, [searchTerms]);

  useLayoutEffect(() => {
    if (!searchTerms?.length || termsToDisplay === +Infinity) {
      return;
    }
    // get the node's rectangles, one per line used (if there's a line-break)
    const clientRects = ref.current?.getClientRects();
    if (!clientRects?.length) {
      return;
    }
    if (clientRects.length > linesToDisplay) {
      // We have more lines than required
      if (termsToDisplay === 1) {
        // Way too small to display anything, just make it use one more line
        setLinesToDisplay(2);
        // And reset the terms to display
        setTermsToDisplay(searchTerms.length);
        return;
      }
      setTermsToDisplay((termsToDisplay) => termsToDisplay - 1);
    }
  }, [searchTerms, linesToDisplay, termsToDisplay]);

  if (!searchTerms?.length) {
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
        className={helper['no-wrap']}
      >
        {matchedField.label} (<LongNumber>{matchedField.hits}</LongNumber>)
      </Link>
    </Fragment>
  ));

  const visibleFragments = fragments.slice(0, termsToDisplay);
  const hiddenFragments = fragments.slice(termsToDisplay);

  // Need to wrap 2 elements in order to have getClientRects work fine
  return (
    <span ref={ref}>
      <small>
        {' '}
        or search &quot;{query}&quot; as a {visibleFragments}
        {hiddenFragments.length ? (
          <EllipsisReveal>{hiddenFragments}</EllipsisReveal>
        ) : null}
      </small>
    </span>
  );
};

export default SearchSuggestions;
