import { useCallback } from 'react';
import { Loader } from 'franklin-sites';
import * as complexviewer from 'complexviewer';

import useDataApi from '../../../shared/hooks/useDataApi';
import externalUrls from '../../../shared/config/externalUrls';

import styles from './styles/complex-viewer.module.scss';

const ComplexViewer = ({ complexID }: { complexID: string }) => {
  const { loading, data } = useDataApi(externalUrls.ComplexViewer(complexID));

  let viewer: typeof complexviewer.App;
  const createComplexViewer = useCallback(
    (node) => {
      if (!viewer && node) {
        viewer = new complexviewer.App(node);
      }
      if (data) {
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
