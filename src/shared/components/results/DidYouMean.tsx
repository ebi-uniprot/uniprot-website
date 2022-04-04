import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { orderBy, zip } from 'lodash-es';
import { Loader, Message } from 'franklin-sites';

import useNS from '../../hooks/useNS';
import useSafeState from '../../hooks/useSafeState';

import fetchData from '../../utils/fetchData';
import { parseQueryString } from '../../utils/url';

import { searchLocations } from '../../../app/config/urls';
import apiUrls from '../../config/apiUrls';

import {
  Namespace,
  SearchableNamespace,
  searchableNamespaceLabels,
} from '../../types/namespaces';
import { Suggestion } from '../../types/results';
import { APIModel } from '../../types/apiModel';
import { uuid4 } from '@sentry/utils';
import { namespace } from 'd3';

// TODO: delete line and file if not needed
// import styles from './styles/did-you-mean.module.scss';

type QuerySuggestionListItemProps = {
  suggestions: Suggestion[];
  namespace: DidYouMeanNamespace;
};

const QuerySuggestionListItem = ({
  suggestions,
  namespace,
}: QuerySuggestionListItemProps) => (
  <li>
    {suggestions.map(({ query }, i, a) => [
      (i > 0 && i < a.length - 1 && ', ') || (i === a.length - 1 && ' or '),
      <Link
        to={{
          pathname: searchLocations[namespace],
          search: queryString.stringify({ query }),
        }}
      >
        {query}
      </Link>,
    ])}
    {` in ${searchableNamespaceLabels[namespace]}?`}
  </li>
);

type DidYouMeanNamespace =
  | Namespace.uniprotkb
  | Namespace.uniref
  | Namespace.uniparc
  | Namespace.proteomes;

const didYouMeanNamespaces: DidYouMeanNamespace[] = [
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
  Namespace.proteomes,
];

type OtherNamespaceSuggestion = {
  namespace: DidYouMeanNamespace;
  suggestion: Suggestion;
};

type DidYouMeanProps = {
  suggestions?: Suggestion[];
};

const DidYouMean = ({ suggestions }: DidYouMeanProps) => {
  const currentNamespace = useNS();
  const location = useLocation();
  const [dataLoading, setDataLoading] = useSafeState(true);
  const [otherNamespaceSuggestions, setOtherNamespaceSuggestions] =
    useSafeState<OtherNamespaceSuggestion[]>([]);

  const { query } = parseQueryString(location.search);
  if (
    !query ||
    !currentNamespace ||
    !didYouMeanNamespaces.includes(currentNamespace as DidYouMeanNamespace)
  ) {
    return null;
  }

  useEffect(() => {
    const otherNamespaces = didYouMeanNamespaces.filter(
      (ns) => ns !== currentNamespace
    );

    const promises = otherNamespaces.map((ns) =>
      fetchData<{
        results: APIModel[];
      }>(
        queryString.stringifyUrl({
          url: apiUrls.search(ns),
          query: { query },
        })
      )
    );

    Promise.all(promises).then((responses) => {
      const suggestionsWithData: OtherNamespaceSuggestion[] = [];
      for (const [namespace, response] of zip(otherNamespaces, responses)) {
        /* istanbul ignore if */
        if (!namespace) {
          break; // Shouldn't happen, used to restrict types
        }
        const hits = +(response?.headers?.['x-total-records'] || 0);
        if (hits) {
          suggestionsWithData.push({ namespace, suggestion: { query, hits } });
        }
      }
      setOtherNamespaceSuggestions(
        orderBy(suggestionsWithData, ({ suggestion }) => suggestion.hits, [
          'desc',
        ])
      );
      setDataLoading(false);
    });
  }, [currentNamespace]);

  console.log(otherNamespaceSuggestions);

  if (dataLoading) {
    return <Loader />;
  }

  const suggestionsSortedByHits = orderBy(suggestions, ['hits'], ['desc']);

  return (
    <Message level="info">
      Did you mean to search for:
      <ul>
        {!!suggestionsSortedByHits.length && (
          <QuerySuggestionListItem
            suggestions={suggestionsSortedByHits}
            namespace={currentNamespace as DidYouMeanNamespace}
            key={currentNamespace}
          />
        )}
        {otherNamespaceSuggestions.map(({ namespace, suggestion }) => (
          <QuerySuggestionListItem
            namespace={namespace}
            suggestions={[suggestion]}
            key={namespace}
          />
        ))}
      </ul>
    </Message>
  );
};

export default DidYouMean;
