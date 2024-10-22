import { useEffect, useState } from 'react';
import { ExternalLink, Loader } from 'franklin-sites';
import * as goCamVizLoader from '@geneontology/wc-gocam-viz/loader';

import externalUrls from '../../../shared/config/externalUrls';

import styles from './styles/go-cam-viz.module.scss';

type Props = {
  id: string;
};

const GoCamViz = ({ id }: Props) => {
  const [defined, setDefined] = useState(false);
  useEffect(() => {
    goCamVizLoader.defineCustomElements();
    customElements.whenDefined('wc-gocam-viz').then(() => {
      setDefined(true);
    });
  }, []);

  // const gocamId = 'gomodel:SYNGO_2279';
  // const gocamId = 'gomodel:56170d5200000012';
  //   const gocamId = 'gomodel:568b0f9600000284';
  //   const gocamId = 'gomodel:568b0f9600000284';
  //   const gocamId = 'gomodel:5e72450500004237';
  return (
    <div className={styles['go-cam-viz-container']}>
      {defined ? <wc-gocam-viz id="gocam" gocam-id={id} /> : <Loader />}
      <ExternalLink url={externalUrls.NoctuaAlliancePathwayPreview(id)}>
        View in Noctua Alliance Pathway Preview
      </ExternalLink>
    </div>
  );
};

export default GoCamViz;
