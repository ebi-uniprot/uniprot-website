import { orderBy } from 'lodash-es';
import { Message } from 'franklin-sites';

import { Suggestion } from '../../types/results';

// TODO: delete line and file if not needed
// import styles from './styles/did-you-mean.module.scss';

type Props = {
  suggestions: Suggestion[];
};

const DidYouMean = ({ suggestions }: Props) => {
  console.log(suggestions);
  const suggestionsSortedByHits = orderBy(suggestions, ['hits'], ['desc']);
  return (
    <Message level="info">
      <ul>
        {suggestionsSortedByHits.map(({ query }) => (
          <li key={query}>{query}</li>
        ))}
      </ul>
    </Message>
  );
};

export default DidYouMean;
