import { useEffect, useState } from 'react';
import { Loader } from 'franklin-sites';
import * as goCamVizLoader from '@geneontology/wc-gocam-viz/loader';

const GoCamViz = () => {
  const [defined, setDefined] = useState(false);
  useEffect(() => {
    goCamVizLoader.defineCustomElements();
    customElements.whenDefined('wc-gocam-viz').then(() => {
      setDefined(true);
    });
  }, []);
  return defined ? (
    <wc-gocam-viz id="gocam-1" gocam-id="gomodel:56170d5200000012" />
  ) : (
    <Loader />
  );
};

export default GoCamViz;
