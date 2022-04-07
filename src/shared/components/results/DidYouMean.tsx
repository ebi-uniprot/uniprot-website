import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { orderBy } from 'lodash-es';
import { Loader, Message } from 'franklin-sites';

import ContactLink from '../../../contact/components/ContactLink';

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
  // Blocks a render until we have all network results, or we have timed out
  const [renderContent, setRenderContent] = useSafeState(false);
  const otherNamespaceSuggestions = useRef<NamespaceSuggestions[]>([]);

  const { query } = parseQueryString(location.search);

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
          query: { query, size: 0 },
        })
      ).then((response) => {
        const hits = +(response?.headers?.['x-total-records'] || 0);
        if (hits) {
          otherNamespaceSuggestions.current.push({
            namespace: ns,
            suggestions: [{ query, hits }],
          });
        }
      })
    );

    // If all of the queries have finished, trigger a render even before timeout
    Promise.all(promises).then(() => {
      setRenderContent(true);
    });
  }, [currentNamespace, query, setRenderContent]);

  // Trigger the render after a set timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRenderContent(true);
    }, TIMEOUT);
    return () => clearTimeout(timeout);
  }, [setRenderContent]);

  if (!renderContent) {
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
    ...orderBy(
      otherNamespaceSuggestions.current,
      ({ suggestions }) => suggestions[0].hits,
      ['desc']
    ),
  ];

  return (
    <Message level="info" className={styles['did-you-mean-message']}>
      <h1 className="small">Sorry, no results were found!</h1>
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
      <ContactLink>contact us</ContactLink>
    </Message>
  );
};

export default DidYouMean;
