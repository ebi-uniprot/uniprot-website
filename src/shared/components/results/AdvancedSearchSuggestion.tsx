import { Fragment, useLayoutEffect, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { EllipsisReveal } from 'franklin-sites';

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

const finalBrackets = / \[[A-Z]+\]$/;

const AdvancedSearchSuggestion = ({
  query,
  total,
}: {
  query: string;
  total: number;
}) => {
  const [linesToDisplay, setLinesToDisplay] = useState(1);
  const [termsToDisplay, setTermsToDisplay] = useState(+Infinity);
  const ref = useRef<HTMLElement>(null);

  const searchParams = new URLSearchParams({
    size: '0',
    query: `${query}`,
    showSingleTermMatchedFields: 'true',
  });

  const { data } = useDataApi<MatchedFieldsResponse>(
    `${apiUrls.search(Namespace.uniprotkb)}?${searchParams}`
  );

  // Data to enrich the suggestions with nice labels
  const { data: searchTermsData } = useDataApi<SearchTermType[]>(
    data?.matchedFields?.length
      ? apiUrls.queryBuilderTerms(Namespace.uniprotkb)
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

  /*  If the single matched field's number of hits is equal to the existing total that is displayed, do not suggest.
      As the results will be a subset of the overall search anyway, comparing by number of hits is enough in this use case.
  */
  if (termsToDisplay === 1 && searchTerms[0].hits === total) {
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
        or search &quot;{query}&quot; as a {visibleFragments}
        {hiddenFragments.length ? (
          <EllipsisReveal>{hiddenFragments}</EllipsisReveal>
        ) : null}
      </small>
    </span>
  );
};

export default AdvancedSearchSuggestion;
