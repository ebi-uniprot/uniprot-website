import { Fragment, ReactNode, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { orderBy } from 'lodash-es';
import { Loader, Message, sequenceProcessor } from 'franklin-sites';
import { sleep } from 'timing-functions';

import ContactLink from '../../../contact/components/ContactLink';

import useNS from '../../hooks/useNS';
import useSafeState from '../../hooks/useSafeState';

import fetchData from '../../utils/fetchData';
import listFormat from '../../utils/listFormat';
import { parseQueryString } from '../../utils/url';

import {
  searchLocations,
  LocationToPath,
  Location,
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

// example input: '( abc )' -> capturing group: 'abc'
// not matching '( id:abc )' or '( abc OR def )'
const reCleanUp = /^\( ([^: ]+) \)$/;

// Matches any generic ID that might exist within UniParc
// eg: P05067.1, P05066.1-1, xref-id.1
const reIdWithVersion = /(?<id>\S+)\.\d+/;

type QuerySuggestionListItemProps = {
  suggestions: Suggestion[];
  namespace: SearchableNamespace;
};

const QuerySuggestionListItem = ({
  suggestions,
  namespace,
}: QuerySuggestionListItemProps) => (
  <li>
    {suggestions.map(({ query }, i, a) => {
      const cleanedQuery = query.replace(reCleanUp, '$1');
      return (
        <Fragment key={query}>
          {listFormat(i, a, 'or')}
          <Link
            to={{
              pathname: searchLocations[namespace],
              search: queryString.stringify({ query: cleanedQuery }),
            }}
            key={query}
            className={styles['query-suggestion-link']}
          >
            {cleanedQuery}
          </Link>
        </Fragment>
      );
    })}
    {` in ${searchableNamespaceLabels[namespace]}`}
  </li>
);

const PeptideSearchSuggestion = ({
  potentialPeptide,
}: {
  potentialPeptide: string;
}) => (
  <li>
    <Link
      to={{
        pathname: LocationToPath[Location.PeptideSearch],
        search: `peps=${potentialPeptide}`,
      }}
    >
      {potentialPeptide}
    </Link>{' '}
    as a peptide search
  </li>
);

const didYouMeanNamespaces: SearchableNamespace[] = [
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
  Namespace.proteomes,
];

type NamespaceSuggestions = Map<SearchableNamespace, Suggestion[]>;

const TIMEOUT = 3_000;

const defaultHeading = <h1 className="small">Sorry, no results were found!</h1>;

type DidYouMeanProps = {
  suggestions?: Suggestion[];
  heading?: ReactNode;
};

const DidYouMean = ({
  suggestions,
  heading = defaultHeading,
}: DidYouMeanProps) => {
  const currentNamespace = useNS();
  const location = useLocation();
  // Blocks a render until we have all network results, or we have timed out
  const [renderContent, setRenderContent] = useSafeState(false);
  const otherNamespaceSuggestions = useRef<NamespaceSuggestions>(new Map());

  const { query } = parseQueryString(location.search);

  // Clear the map if new namespace or new query
  useEffect(() => {
    otherNamespaceSuggestions.current.clear();
  }, [currentNamespace, query]);

  useEffect(() => {
    if (!query || !currentNamespace) {
      return;
    }

    const otherNamespaces = didYouMeanNamespaces.filter(
      (ns) => ns !== currentNamespace
    );

    const promises = otherNamespaces.map((ns) =>
      fetchData<{ results: APIModel[] }>(
        queryString.stringifyUrl({
          url: apiUrls.search(ns),
          query: { query, size: 0 },
        })
      ).then((response) => {
        const hits = +(response?.headers?.['x-total-results'] || 0);
        if (hits) {
          otherNamespaceSuggestions.current.set(ns, [{ query, hits }]);
        }
      })
    );

    // Race between all of the queries having finished or the timeout triggering
    Promise.race([Promise.all(promises), sleep(TIMEOUT)]).finally(() => {
      setRenderContent(true);
    });
  }, [currentNamespace, query, setRenderContent]);

  const suggestionsSortedByHits = orderBy(suggestions, 'hits', 'desc');

  if (currentNamespace === Namespace.uniparc) {
    const match = query?.match(reIdWithVersion);
    const id = match?.groups?.id;
    if (id) {
      const idAlreadySuggested = suggestionsSortedByHits.some(
        (s) => s.query.replace(reCleanUp, '$1') === id
      );
      if (!idAlreadySuggested) {
        suggestionsSortedByHits.unshift({ query: id, hits: 1 });
      }
    }
  }

  const suggestionNodes: ReactNode[] = [];
  // Main suggestion
  if (suggestionsSortedByHits.length && currentNamespace) {
    suggestionNodes.push(
      <QuerySuggestionListItem
        suggestions={suggestionsSortedByHits}
        namespace={currentNamespace as SearchableNamespace}
        key={`${currentNamespace}-${query}`}
      />
    );
  }
  // Other namespace suggestions
  for (const [namespace, suggestions] of orderBy(
    Array.from(otherNamespaceSuggestions.current.entries()),
    ([, suggestions]) => suggestions[0].hits,
    'desc'
  )) {
    suggestionNodes.push(
      <QuerySuggestionListItem
        suggestions={suggestions}
        namespace={namespace}
        key={namespace}
      />
    );
  }
  // Peptide Search suggestion
  const potentialPeptide = query?.toUpperCase() || '';
  const [processed] = sequenceProcessor(potentialPeptide);

  if (potentialPeptide && processed.valid && processed.likelyType === 'aa') {
    suggestionNodes.push(
      <PeptideSearchSuggestion
        potentialPeptide={potentialPeptide}
        key="peptide search"
      />
    );
  }

  let content: ReactNode = null;
  if (renderContent) {
    if (suggestionNodes.length) {
      content = (
        <div className={styles.suggestions}>
          Did you mean to search for:
          <ul className={styles['suggestions-list']}>{suggestionNodes}</ul>
        </div>
      );
    }
  } else {
    content = <Loader />;
  }

  return (
    <Message level="info" className={styles['did-you-mean-message']}>
      {heading}
      {content}
      {renderContent && (
        <>
          If you can&apos;t find what you are looking for, please{' '}
          <ContactLink>contact us</ContactLink>.
          {currentNamespace === Namespace.uniparc ? (
            <p>
              Some cross-references, when there are too many of them on a
              UniParc entry, are not indexed.
              <br />
              If you think your search corresponds to one of these, do{' '}
              <ContactLink>get in touch</ContactLink> so we can provide you the
              data.
            </p>
          ) : null}
        </>
      )}
    </Message>
  );
};

export default DidYouMean;
