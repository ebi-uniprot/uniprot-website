/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader, Message } from 'franklin-sites';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import useCustomElement from '../../../shared/hooks/useCustomElement';
import { Namespace } from '../../../shared/types/namespaces';
import { type IsoformSequences } from '../../adapters/structureConverter';
import { TabLocation } from '../../types/entry';
import { AFDBOutOfSync } from './AFDBOutOfSync';
import styles from './styles/structure-view.module.scss';

const StructureView = ({
  primaryAccession,
  sequence,
  isoforms,
  checksum,
  viewerOnly = false,
}: {
  primaryAccession?: string;
  checksum?: string;
  sequence?: string;
  isoforms?: IsoformSequences[];
  viewerOnly?: boolean;
}) => {
  const structureElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'
      ).then((module) => ({ default: module.ProtvistaUniprotStructure })),
    'protvista-uniprot-structure'
  );

  const structureRef = useRef<any>(null);

  const setStructureRef = (el: any) => {
    if (el) {
      structureRef.current = el;
      if (isoforms?.length) {
        el.isoforms = isoforms;
      }
    }
  };

  if (!structureElement.defined && !structureElement.errored) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      {primaryAccession && !viewerOnly && (
        <>
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
        </>
      )}
      <protvista-uniprot-structure
        ref={setStructureRef}
        accession={primaryAccession}
        checksum={checksum}
        sequence={sequence}
      />
    </div>
  );
};

export default StructureView;
