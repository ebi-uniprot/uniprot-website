import { orderBy } from 'lodash-es';
import { Message } from 'franklin-sites';

import useNS from '../../hooks/useNS';

import { Suggestion } from '../../types/results';
import {
  Namespace,
  SearchableNamespace,
  searchableNamespaceLabels,
} from '../../types/namespaces';

// TODO: delete line and file if not needed
// import styles from './styles/did-you-mean.module.scss';

type SuggestionSentenceProps = {
  suggestions: Suggestion[];
  namespace: SearchableNamespace;
};

const SuggestionsSentence = ({
  suggestions,
  namespace,
}: SuggestionSentenceProps) => (
  <>
    {suggestions.map(({ query }, i, a) => [
      (i > 0 && i < a.length - 1 && ', ') || (i === a.length - 1 && ' or '),
      <a href="#" key={query}>
        {query}
      </a>,
    ])}
    {` in ${searchableNamespaceLabels[namespace]}?`}
  </>
);

type DidYouMeanProps = {
  suggestions: Suggestion[];
};

const didYouMeanNamespaces = [
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
  Namespace.proteomes,
];

const DidYouMean = ({ suggestions }: DidYouMeanProps) => {
  const namespace = useNS();

  if (!namespace || !didYouMeanNamespaces.includes(namespace)) {
    return null;
  }

  const suggestionsSortedByHits = orderBy(suggestions, ['hits'], ['desc']);
  return (
    <Message level="info">
      Did you mean to search for:
      <ul>
        <li>
          <SuggestionsSentence
            suggestions={suggestionsSortedByHits}
            namespace={namespace}
          />
        </li>
      </ul>
    </Message>
  );
};

export default DidYouMean;
