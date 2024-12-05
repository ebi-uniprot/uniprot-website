import { ReactNode, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { orderBy, truncate } from 'lodash-es';
import { Loader, Message, sequenceProcessor } from 'franklin-sites';
import { sleep } from 'timing-functions';

import ContactLink from '../../../contact/components/ContactLink';
import ChecksumSuggester from '../../../tools/components/ChecksumSuggester';

import useNS from '../../hooks/useNS';
import useSafeState from '../../hooks/useSafeState';

import fetchData from '../../utils/fetchData';
import { stringifyQuery, stringifyUrl } from '../../utils/url';

import {
  searchLocations,
  LocationToPath,
  Location,
} from '../../../app/config/urls';
import apiUrls from '../../config/apiUrls/apiUrls';
import { PEPTIDE_SEARCH_SEQ_MINIMUM_LENGTH } from '../../config/limits';

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

const nsToHelpPage = new Map([
  [Namespace.uniprotkb, 'uniprotkb'],
  [Namespace.uniref, 'uniref'],
  [Namespace.uniparc, 'uniparc'],
  [Namespace.proteomes, 'proteome'],
]);
const truncateOptions = { length: 10 };

type QuerySuggestionListItemProps = {
  suggestions: Suggestion[];
  namespace: SearchableNamespace;
};

const QuerySuggestionListItem = ({
  suggestions,
  namespace,
}: QuerySuggestionListItemProps) => (
  <div>
    In{' '}
    <span data-article-id={nsToHelpPage.get(namespace)}>
      {searchableNamespaceLabels[namespace]}
    </span>
    <ul className={styles['suggestions-list']}>
      {suggestions.map(({ query }) => {
        const cleanedQuery = query.replace(reCleanUp, '$1');
        return (
          <li key={query}>
            <Link
              to={{
                pathname: searchLocations[namespace],
                search: stringifyQuery({ query: cleanedQuery }),
              }}
              key={query}
              className={styles['query-suggestion-link']}
            >
              {cleanedQuery}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

const PeptideSearchSuggestion = ({
  potentialPeptide,
}: {
  potentialPeptide: string;
}) => (
  <p>
    Are you searching for protein sequences containing the peptide{' '}
    <Link
      to={{
        pathname: LocationToPath[Location.PeptideSearch],
        search: `peps=${potentialPeptide}`,
      }}
    >
      {truncate(potentialPeptide, truncateOptions)}?
    </Link>
  </p>
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

  const sp = new URLSearchParams(location.search);
  const query = sp.get('query');

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
        stringifyUrl(apiUrls.search.searchPrefix(ns), {
          query,
          size: 0,
          didyoumean: true,
        })
      ).then(
        (response) => {
          const hits = +(response?.headers?.['x-total-results'] || 0);
          if (hits) {
            otherNamespaceSuggestions.current.set(ns, [{ query, hits }]);
          }
        },
        () => {
          /** In case of error avoid leaving it uncaught, it's fine, suggestions
           * are a just a plus, and the query might not even be correct in other
           * namespaces depending on the search fields
           * */
        }
      )
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

  const namespaceSuggestionNodes: ReactNode[] = [];
  // Main suggestion
  if (suggestionsSortedByHits.length && currentNamespace) {
    namespaceSuggestionNodes.push(
      <QuerySuggestionListItem
        suggestions={suggestionsSortedByHits}
        namespace={currentNamespace as SearchableNamespace}
        key={`${currentNamespace}-${query}`}
      />
    );
  }
  // Other namespace suggestions
  for (const [namespace, suggestions] of Array.from(
    otherNamespaceSuggestions.current.entries()
  )) {
    namespaceSuggestionNodes.push(
      <QuerySuggestionListItem
        suggestions={suggestions}
        namespace={namespace}
        key={namespace}
      />
    );
    // If UniProtKB suggestion available, stop there
    if (namespace === Namespace.uniprotkb) {
      break;
    }
  }
  // Peptide Search suggestion
  const potentialPeptide = query?.toUpperCase() || '';
  const [processed] = sequenceProcessor(
    potentialPeptide,
    PEPTIDE_SEARCH_SEQ_MINIMUM_LENGTH,
    true
  );

  const searchableSequence =
    potentialPeptide && processed.valid && processed.likelyType === 'aa';

  const checksumSuggestionsNode = searchableSequence && (
    <ChecksumSuggester
      sequence={potentialPeptide}
      sequenceDescription={truncate(potentialPeptide, truncateOptions)}
    />
  );

  const peptideSearchSuggestion = searchableSequence && (
    <PeptideSearchSuggestion
      potentialPeptide={potentialPeptide}
      key="peptide search"
    />
  );

  let content: ReactNode = null;
  if (renderContent) {
    content = (
      <div className={styles.suggestions}>
        {!!namespaceSuggestionNodes.length && (
          <>
            Did you mean to search for:
            {namespaceSuggestionNodes}
          </>
        )}
        {checksumSuggestionsNode}
        {peptideSearchSuggestion}
      </div>
    );
  } else {
    content = <Loader />;
  }

  return (
    <Message level="info" className={styles['did-you-mean-message']}>
      <small>
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
                <ContactLink>get in touch</ContactLink> so we can provide you
                the data.
              </p>
            ) : null}
          </>
        )}
      </small>
    </Message>
  );
};

export default DidYouMean;
