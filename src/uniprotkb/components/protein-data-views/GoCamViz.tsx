import { useEffect, useState } from 'react';
import { ExternalLink, Loader } from 'franklin-sites';
import * as goCamVizLoader from '@geneontology/wc-gocam-viz/loader';

import externalUrls from '../../../shared/config/externalUrls';

import styles from './styles/go-cam-viz.module.scss';

const GoCamViz = () => {
  const [defined, setDefined] = useState(false);
  useEffect(() => {
    goCamVizLoader.defineCustomElements();
    customElements.whenDefined('wc-gocam-viz').then(() => {
      setDefined(true);
    });
  }, []);
  // TODO: make gocamId a prop
  const gocamId = 'gomodel:56170d5200000012';
  //   const gocamId = 'gomodel:568b0f9600000284';
  //   const gocamId = 'gomodel:568b0f9600000284';
  //   const gocamId = 'gomodel:5e72450500004237';
  return (
    <div className={styles['go-cam-viz-container']}>
      {defined ? <wc-gocam-viz id="gocam-1" gocam-id={gocamId} /> : <Loader />}
      <ExternalLink url={externalUrls.NoctuaAlliancePathwayPreview(gocamId)}>
        View in Noctua Alliance Pathway Preview
      </ExternalLink>
    </div>
  );
};

export default GoCamViz;
