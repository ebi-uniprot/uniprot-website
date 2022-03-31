import { Message } from 'franklin-sites';

import { Suggestion } from '../../types/results';

// TODO: delete line and file if not needed
// import styles from './styles/did-you-mean.module.scss';

type Props = {
  suggestions?: Suggestion[] | undefined;
};

const DidYouMean = ({ suggestions }: Props) => {
  console.log(suggestions);
  return <Message level="info">foo</Message>;
};

export default DidYouMean;
