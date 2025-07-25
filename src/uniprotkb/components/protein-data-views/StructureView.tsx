import { Loader, Message } from 'franklin-sites';
import { Link } from 'react-router';

import { getEntryPath } from '../../../app/config/urls';
import useCustomElement from '../../../shared/hooks/useCustomElement';
import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation } from '../../types/entry';
import { AFDBOutOfSync } from './AFDBOutOfSync';
import styles from './styles/structure-view.module.scss';

const StructureView = ({ primaryAccession }: { primaryAccession: string }) => {
  const structureElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'
      ).then((module) => ({ default: module.ProtvistaUniprotStructure })),
    'protvista-uniprot-structure'
  );

  if (!structureElement.defined && !structureElement.errored) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <Message level="info">
        View UniProt features on this structure in the{' '}
        <Link
          to={{
            pathname: getEntryPath(
              Namespace.uniprotkb,
              primaryAccession,
              TabLocation.FeatureViewer
            ),
            hash: 'structure',
          }}
        >
          Feature Viewer
        </Link>
        .
      </Message>
      <AFDBOutOfSync modal />
      <protvista-uniprot-structure accession={primaryAccession} />
    </div>
  );
};

export default StructureView;
