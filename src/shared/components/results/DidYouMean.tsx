import { orderBy } from 'lodash-es';
import { Message } from 'franklin-sites';

import useNS from '../../hooks/useNS';

import { Suggestion } from '../../types/results';
import {
  SearchableNamespace,
  searchableNamespaceLabels,
} from '../../types/namespaces';

// TODO: delete line and file if not needed
// import styles from './styles/did-you-mean.module.scss';

type Props = {
  suggestions: Suggestion[];
};

const DidYouMean = ({ suggestions }: Props) => {
  const namespace = useNS();
  if (!namespace) {
    return null;
  }
  // TODO: fix type
  const namespaceLabel =
    searchableNamespaceLabels[namespace as SearchableNamespace];
  const suggestionsSortedByHits = orderBy(suggestions, ['hits'], ['desc']);
  return (
    <Message level="info">
      Did you mean to search for:
      <ul>
        <li>
          {suggestionsSortedByHits.map(({ query }, i, a) => [
            (i > 0 && i < a.length - 1 && ', ') ||
              (i === a.length - 1 && ' or '),
            <a href="#" key={query}>
              {query}
            </a>,
          ])}
          {` in ${namespaceLabel}?`}
        </li>
      </ul>
    </Message>
  );
};

export default DidYouMean;
