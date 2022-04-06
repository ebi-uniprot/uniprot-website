import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { orderBy, zip } from 'lodash-es';
import { Loader, Message } from 'franklin-sites';

import useNS from '../../hooks/useNS';
import useSafeState from '../../hooks/useSafeState';

import fetchData from '../../utils/fetchData';
import { parseQueryString } from '../../utils/url';

import {
  LocationToPath,
  Location,
  searchLocations,
} from '../../../app/config/urls';
import apiUrls from '../../config/apiUrls';

import {
  Namespace,
  SearchableNamespace,
  searchableNamespaceLabels,
} from '../../types/namespaces';
import { Suggestion } from '../../types/results';
import { APIModel } from '../../types/apiModel';

import styles from './styles/did-you-mean.module.scss';

type QuerySuggestionListItemProps = {
  suggestions: Suggestion[];
  namespace: SearchableNamespace;
};

const QuerySuggestionListItem = ({
  suggestions,
  namespace,
}: QuerySuggestionListItemProps) => (
  <li>
    {suggestions.map(({ query }, i, a) => [
      (i > 0 && i < a.length - 1 && ', ') ||
        (a.length > 1 && i === a.length - 1 && ' or '),
      <Link
        to={{
          pathname: searchLocations[namespace],
          search: queryString.stringify({ query }),
        }}
        key={query}
        className={styles['query-suggestion-link']}
      >
        {query}
      </Link>,
    ])}
    {` in ${searchableNamespaceLabels[namespace]}`}
  </li>
);

const didYouMeanNamespaces: SearchableNamespace[] = [
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
  Namespace.proteomes,
];

type NamespaceSuggestions = {
  namespace: SearchableNamespace;
  suggestions: Suggestion[];
};

const TIMEOUT = 3_000;

type DidYouMeanProps = {
  suggestions?: Suggestion[];
};

const DidYouMean = ({ suggestions }: DidYouMeanProps) => {
  const currentNamespace = useNS();
  const location = useLocation();
  const [dataLoading, setDataLoading] = useSafeState(true);
  const [hasTimedOut, setHasTimedOut] = useSafeState(false);
  const [otherNamespaceSuggestions, setOtherNamespaceSuggestions] =
    useSafeState<NamespaceSuggestions[]>([]);

  const { query } = parseQueryString(location.search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasTimedOut(true);
    }, TIMEOUT);
    return () => clearTimeout(timeout);
  }, [setHasTimedOut]);

  useEffect(() => {
    if (!query || !currentNamespace) {
      return;
    }

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
      const suggestionsWithData: NamespaceSuggestions[] = [];
      for (const [namespace, response] of zip(otherNamespaces, responses)) {
        /* istanbul ignore if */
        if (!namespace) {
          break; // Shouldn't happen, used to restrict types
        }
        const hits = +(response?.headers?.['x-total-records'] || 0);
        if (hits) {
          suggestionsWithData.push({
            namespace,
            suggestions: [{ query, hits }],
          });
        }
      }
      setOtherNamespaceSuggestions(
        orderBy(suggestionsWithData, ({ suggestions }) => suggestions[0].hits, [
          'desc',
        ])
      );
      setDataLoading(false);
    });
  }, [currentNamespace, query, setDataLoading, setOtherNamespaceSuggestions]);

  if (dataLoading && !hasTimedOut) {
    return <Loader />;
  }

  const suggestionsSortedByHits = orderBy(suggestions, ['hits'], ['desc']);
  const querySuggestions: NamespaceSuggestions[] = [
    ...(suggestionsSortedByHits.length && currentNamespace
      ? [
          {
            suggestions: suggestionsSortedByHits,
            namespace: currentNamespace as SearchableNamespace,
          },
        ]
      : []),
    ...otherNamespaceSuggestions,
  ];

  return (
    <Message level="info" className={styles['did-you-mean-message']}>
      <h4>Sorry, no results were found!</h4>
      {!!querySuggestions.length && (
        <div className={styles.suggestions}>
          Did you mean to search for:
          <ul className={styles['suggestions-list']}>
            {querySuggestions.map(({ namespace, suggestions }) => (
              <QuerySuggestionListItem
                suggestions={suggestions}
                namespace={namespace}
                key={namespace}
              />
            ))}
          </ul>
        </div>
      )}
      Can&apos;t find what you are looking for? Please{' '}
      <Link to={LocationToPath[Location.ContactGeneric]}>contact us</Link>
    </Message>
  );
};

export default DidYouMean;
