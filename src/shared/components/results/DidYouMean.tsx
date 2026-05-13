import { Loader, Message, sequenceProcessor } from 'franklin-sites';
import { orderBy, truncate } from 'lodash-es';
import { type ReactNode, useEffect, useMemo, useRef } from 'react';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { sleep } from 'timing-functions';

import {
  Location,
  LocationToPath,
  searchLocations,
} from '../../../app/config/urls';
import ContactLink from '../../../contact/components/ContactLink';
import ChecksumSuggester from '../../../jobs/components/ChecksumSuggester';
import apiUrls from '../../config/apiUrls/apiUrls';
import { PEPTIDE_SEARCH_SEQ_MINIMUM_LENGTH } from '../../config/limits';
import useNS from '../../hooks/useNS';
import useSafeState from '../../hooks/useSafeState';
import { type APIModel } from '../../types/apiModel';
import {
  Namespace,
  type SearchableNamespace,
  searchableNamespaceLabels,
} from '../../types/namespaces';
import { type Suggestion } from '../../types/results';
import fetchData from '../../utils/fetchData';
import { translatedWebsite } from '../../utils/translatedWebsite';
import { stringifyQuery, stringifyUrl } from '../../utils/url';
import styles from './styles/did-you-mean.module.scss';

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
      {suggestions.map(({ query }) => (
        <li key={query}>
          <Link
            to={{
              pathname: searchLocations[namespace],
              search: stringifyQuery({ query }),
            }}
            key={query}
            className={styles['query-suggestion-link']}
            translate="no"
          >
            {query}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const PeptideSearchSuggestion = ({
  potentialPeptide,
}: {
  potentialPeptide: string;
}) => (
  <div>
    Are you searching for protein sequences containing the peptide{' '}
    <span>{truncate(potentialPeptide, truncateOptions)}?</span>
    <ul>
      <li>
        Our basic search tool allows to find protein entries by{' '}
        <Link
          to={generatePath(LocationToPath[Location.HelpEntry], {
            accession: 'text-search',
          })}
        >
          name, organism, identifier, etc
        </Link>
        , but not by sequence.
      </li>
      <li>
        For sequence-based queries, please use{' '}
        <Link
          to={{
            pathname: LocationToPath[Location.Blast],
            search: `sequence=${potentialPeptide}`,
          }}
          translate="no"
        >
          BLAST
        </Link>{' '}
        or{' '}
        <Link
          to={{
            pathname: LocationToPath[Location.PeptideSearch],
            search: `peps=${potentialPeptide}`,
          }}
        >
          Peptide Search
        </Link>
        .
      </li>
    </ul>
  </div>
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
        (s) => s.query === id
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
    processed.valid && processed.likelyType === 'aa' && potentialPeptide;

  const checksumSuggestionsNode = searchableSequence && (
    <ChecksumSuggester
      sequence={searchableSequence}
      sequenceDescription={truncate(potentialPeptide, truncateOptions)}
      asMessage={false}
    />
  );

  const peptideSearchSuggestion = searchableSequence && (
    <PeptideSearchSuggestion
      potentialPeptide={searchableSequence}
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

  const websiteTranslation = useMemo(() => translatedWebsite(), []);

  return (
    <Message level="info" className={styles['did-you-mean-message']}>
      {heading}
      {content}
      {renderContent && (
        <>
          <p>
            If you can&apos;t find what you are looking for, please{' '}
            <ContactLink>contact us</ContactLink>.
          </p>
          {websiteTranslation && (
            <p>
              Even though you translated the website,{' '}
              <strong>make sure that your query is in English</strong>.
            </p>
          )}
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
