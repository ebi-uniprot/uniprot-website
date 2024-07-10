import { useCallback, useState } from 'react';
import { Loader } from 'franklin-sites';
import * as complexviewer from 'complexviewer';
import { Link } from 'react-router-dom';

import useDataApi from '../../../shared/hooks/useDataApi';

import externalUrls from '../../../shared/config/externalUrls';
import { Location, LocationToPath } from '../../../app/config/urls';

import styles from './styles/complex-viewer.module.scss';

interface ComplexPortalData {
  data: Datum[];
}
interface Datum {
  object: string;
  id: string;
  sequence?: string;
  type?: Type;
  organism: Organism;
  identifier?: Identifier;
  label?: string;
  interactionType?: Type;
  complexType?: Type;
  evidenceType?: Type;
  identifiers?: Identifier[];
  participants?: Participant[];
}
interface Participant {
  id: string;
  interactorRef: string;
  bioRole: Type;
}
interface Identifier {
  db: string;
  id: string;
}
interface Organism {
  taxid: string;
  common: string;
  scientific: string;
}
interface Type {
  id: string;
  name: string;
}

const ComplexViewer = ({ complexID }: { complexID: string }) => {
  const { loading, data } = useDataApi(externalUrls.ComplexViewer(complexID));
  const [interactors, setInteractors] = useState<string[]>([]);

  const createComplexViewer = useCallback(
    (node: HTMLDivElement) => {
      if (node && data) {
        const viewer = new complexviewer.App(node);
        viewer.clear();
        viewer.readMIJSON(data);

        // Get the list of interactors from the data
        const { data: complexPortalData } = data as ComplexPortalData;
        if (complexPortalData.length) {
          const uniprotAccessions = complexPortalData
            .filter(
              ({ object, identifier }) =>
                object === 'interactor' && identifier?.db === 'uniprotkb'
            )
            .map(({ identifier }) => identifier?.id.split('-')[0] || '');
          setInteractors([...new Set(uniprotAccessions)]);
        }
      }
    },
    [data]
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div
        ref={createComplexViewer}
        className={styles['complex-viewer-container']}
      />
      {interactors.length && (
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: `query=${interactors
              ?.map((accession) => `accession:${accession}`)
              .sort()
              .join(' OR ')}`,
          }}
        >
          View the interactors in UniProtKB
        </Link>
      )}
    </>
  );
};

export default ComplexViewer;
