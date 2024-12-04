import { Loader } from 'franklin-sites';

import { AFDBOutOfSync } from './AFDBOutOfSync';

import useCustomElement from '../../../shared/hooks/useCustomElement';

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
      <AFDBOutOfSync modal />
      <protvista-uniprot-structure accession={primaryAccession} />
    </div>
  );
};

export default StructureView;
