import { useCallback } from 'react';
import { Loader } from 'franklin-sites';
import * as complexviewer from 'complexviewer';

import useDataApi from '../../../shared/hooks/useDataApi';
import externalUrls from '../../../shared/config/externalUrls';

import styles from './styles/complex-viewer.module.scss';

const ComplexViewer = ({ complexID }: { complexID: string }) => {
  const { loading, data } = useDataApi(externalUrls.ComplexViewer(complexID));

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

  return (
    <div
      ref={createComplexViewer}
      className={styles['complex-viewer-container']}
    />
  );
};

export default ComplexViewer;
