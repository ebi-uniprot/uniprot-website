import { History } from 'history';
import { RouteChildrenProps } from 'react-router-dom';

import HelpResults from '../results/Results';
import Shortcuts from './Shortcuts';

import styles from './styles/results.module.css';

type Props = RouteChildrenProps & { globalHistory: History };

const Results = ({ globalHistory, ...props }: Props) => (
  <>
    {props.location.search ? null : <Shortcuts globalHistory={globalHistory} />}
    <div className={styles.container}>
      <HelpResults inPanel {...props} />
    </div>
  </>
);

export default Results;
