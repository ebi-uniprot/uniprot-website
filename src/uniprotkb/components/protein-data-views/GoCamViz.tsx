import { useEffect } from 'react';
import { Loader } from 'franklin-sites';
import * as goCamVizLoader from '@geneontology/wc-gocam-viz/loader';

import useSafeState from '../../../shared/hooks/useSafeState';

import styles from './styles/go-cam-viz.module.scss';

type Props = {
  id: string;
};

const GoCamViz = ({ id }: Props) => {
  const [defined, setDefined] = useSafeState(false);
  useEffect(() => {
    goCamVizLoader.defineCustomElements();
    customElements.whenDefined('wc-gocam-viz').then(() => {
      setDefined(true);
    });
  }, []);

  return (
    <div className={styles['go-cam-viz-container']}>
      {defined ? <wc-gocam-viz id="gocam" gocam-id={id} /> : <Loader />}
    </div>
  );
};

export default GoCamViz;
