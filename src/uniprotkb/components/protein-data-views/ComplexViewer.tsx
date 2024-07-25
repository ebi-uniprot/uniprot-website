import { useCallback, useState } from 'react';
import { Button, Loader, Message } from 'franklin-sites';
import * as complexviewer from 'complexviewer';

import useDataApi from '../../../shared/hooks/useDataApi';

import externalUrls from '../../../shared/config/externalUrls';

import styles from './styles/complex-viewer.module.scss';

type ComplexPortalData = {
  data: Array<object>;
};

const ComplexViewer = ({ complexID }: { complexID: string }) => {
  const { loading, data } = useDataApi<ComplexPortalData>(
    externalUrls.ComplexViewer(complexID)
  );

  const [seed, setSeed] = useState(1);

  const createComplexViewer = useCallback(
    (node: HTMLDivElement) => {
      if (node && data) {
        const viewer = new complexviewer.App(node);
        viewer.clear();
        viewer.readMIJSON(data);
      }
    },
    [data]
  );

  if (loading) {
    return <Loader />;
  }

  if (!loading && !data?.data?.length) {
    return (
      <Message level="warning" className={styles['warning-message']}>
        There is an issue with loading data from the Complex Portal. Please try
        again.
        <br />
        <Button onClick={() => setSeed(Math.random())}>Reload</Button>
      </Message>
    );
  }

  return (
    <div
      key={seed}
      ref={createComplexViewer}
      className={styles['complex-viewer-container']}
    />
  );
};

export default ComplexViewer;
