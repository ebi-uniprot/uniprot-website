import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EllipsisReveal } from 'franklin-sites';
import qs from 'query-string';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';
import listFormat from '../../utils/listFormat';
import { flatten } from '../../../query-builder/utils/parseAndMatchQuery';
import {
  parse,
  stringify,
} from '../../../query-builder/utils/queryStringProcessor';

import { Namespace } from '../../types/namespaces';
import { LocationToPath, Location } from '../../../app/config/urls';

import {
  Clause,
  SearchTermType,
} from '../../../query-builder/types/searchTypes';
import { MatchedField } from '../../types/results';

import helper from '../../styles/helper.module.scss';

type MatchedFieldsResponse = {
  matchedFields?: Array<MatchedField>;
};

const simpleQuery = /^[a-zA-Z0-9]+$/;
const finalBrackets = / \[[A-Z]+\]$/;
const exactMatchSearchTerms = ['gene', 'ec'];

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
  const validQueryWithContent = // Only when there are results
    // also serves to delay the requests below to prioritise getting the results
    total &&
    // Only for UniProtKB
    namespace === Namespace.uniprotkb &&
    // Only for queries with content
    !!query?.length;

  const shouldSuggest =
    validQueryWithContent &&
    // And for simple queries
    simpleQuery.test(query);

  // For exact match query. Example: gene -> gene_exact, ec -> ec_exact
  const exactMatch =
    validQueryWithContent &&
    exactMatchSearchTerms.some((term) => query.includes(term));

  const { data } = useDataApi<MatchedFieldsResponse>(
    shouldSuggest
      ? `${apiUrls.search(Namespace.uniprotkb)}?${qs.stringify({
          size: 0,
          query,
          showSingleTermMatchedFields: true,
        })}`
      : null
  );

  // Data to enrich the suggestions with nice labels
  const { data: searchTermsData } = useDataApi<SearchTermType[]>(
    shouldSuggest && data?.matchedFields?.length
      ? apiUrls.queryBuilderTerms(Namespace.uniprotkb)
      : undefined
  );

  const parsedQuery = parse(query);
  let modifiedClauses: Clause[] = [];
  let searchValue = '';
  if (exactMatch) {
    modifiedClauses = parsedQuery.map((clause) => {
      if (exactMatchSearchTerms.includes(clause.searchTerm.term)) {
        const queryBit = clause.queryBits;
        const modifiedQueryBit: Record<string, string> = {};
        Object.entries(queryBit).forEach(([k, v]) => {
          modifiedQueryBit[`${k}_exact`] = v;
          searchValue = v;
        });
        clause.queryBits = modifiedQueryBit;
        return clause;
      }
      return clause;
    });
  }

  const searchTerms = useMemo(() => {
    if (exactMatch && searchValue) {
      return [{ name: searchValue, label: searchValue }];
    }

    if (simpleQuery) {
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
    }
  }, [data, searchTermsData, searchValue]);

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
        {matchedField.label}
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
        {shouldSuggest && (
          <>
            or search &quot;{query}&quot; as a {visibleFragments}
            {hiddenFragments.length ? (
              <EllipsisReveal>{hiddenFragments}</EllipsisReveal>
            ) : null}
          </>
        )}
        {exactMatch && modifiedClauses.length > 0 && (
          <>
            or show only exact matches for{' '}
            <Link
              // eslint-disable-next-line uniprot-website/use-config-location
              to={(location) => ({
                ...location,
                search: `query=${stringify(modifiedClauses)}`,
              })}
            >
              {searchValue}
            </Link>
          </>
        )}
      </small>
    </span>
  );
};

export default SearchSuggestions;
