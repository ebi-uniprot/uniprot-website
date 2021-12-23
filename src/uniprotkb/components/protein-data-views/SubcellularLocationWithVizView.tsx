import { FC, Suspense, lazy, ReactNode, ReactElement } from 'react';
import { Tabs, Tab } from 'franklin-sites';

import SubcellularLocationView from './SubcellularLocationView';
import SubcellularLocationGOView from './SubcellularLocationGOView';

import {
  getEvidenceCodeData,
  getEcoNumberFromGoEvidenceType,
  getEcoNumberFromString,
} from '../../config/evidenceCodes';

import { SubcellularLocationComment } from '../../types/commentTypes';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { GoXref } from '../../adapters/subcellularLocationConverter';

// Import it lazily in order to isolate the libraries used only for this
const SubCellViz =
  'customElements' in window
    ? lazy(() => import(/* webpackChunkName: "subcellviz" */ './SubCellViz'))
    : // Fallback for now custom elements supports
      ({ children }: { children?: ReactNode }) => <>{children}</>;

enum Superkingdom {
  Viruses = 'Viruses',
}

export enum VizTab {
  UniProt = 'uniprot',
  GO = 'go',
}

export type SubCellularLocation = {
  id: string;
  reviewed: boolean;
};

const isVirus = ([superkingdom]: string[]) =>
  superkingdom === Superkingdom.Viruses;

export const getSubcellularLocationId = (id: string) =>
  id.match(/SL-(\d+)/)?.[1];

export const getGoId = (id: string) => id.match(/GO:(\d+)/)?.[1];

const getNoAnnotationMessage = (name: string) => (
  <>{`No specific ${name} annotations available regarding subcellular location`}</>
);

const SubcellularLocationWithVizView: FC<
  {
    primaryAccession?: string;
    comments?: SubcellularLocationComment[];
    goXrefs?: GoXref[];
  } & Partial<Pick<TaxonomyDatum, 'taxonId' | 'lineage'>>
> = ({ primaryAccession, comments, taxonId, lineage, goXrefs }) => {
  if (!comments?.length || !goXrefs?.length) {
    return null;
  }

  const uniprotTextContent = <SubcellularLocationView comments={comments} />;
  const goTextContent = (
    <SubcellularLocationGOView
      primaryAccession={primaryAccession}
      goXrefs={goXrefs}
    />
  );

  const uniProtLocations = (comments || [])
    .flatMap(({ subcellularLocations }) =>
      subcellularLocations?.map(({ location }) =>
        location.id
          ? {
              id: getSubcellularLocationId(location.id),
              reviewed: location.evidences?.some((evidence) => {
                const evidenceData = getEvidenceCodeData(
                  getEcoNumberFromString(evidence.evidenceCode)
                );
                return Boolean(evidenceData?.manual);
              }),
            }
          : undefined
      )
    )
    .filter(
      (l: Partial<SubCellularLocation> | undefined): l is SubCellularLocation =>
        Boolean(l)
    );

  const goLocations = (goXrefs || [])
    .map(({ id, properties }) => {
      const goId = getGoId(id);
      if (!goId) {
        return;
      }
      const evidenceData = getEvidenceCodeData(
        getEcoNumberFromGoEvidenceType(properties.GoEvidenceType)
      );
      // eslint-disable-next-line consistent-return
      return {
        id: goId,
        reviewed: evidenceData?.manual,
      };
    })
    .filter(
      (l: Partial<SubCellularLocation> | undefined): l is SubCellularLocation =>
        Boolean(l)
    );

  if (!lineage || !(uniprotTextContent && goTextContent)) {
    return null;
  }

  const virus = isVirus(lineage as string[]);

  let uniprotTabContent: ReactElement;
  if (uniprotTextContent) {
    if (virus || !taxonId || !uniProtLocations?.length) {
      uniprotTabContent = uniprotTextContent;
    } else {
      uniprotTabContent = (
        <SubCellViz uniProtLocations={uniProtLocations} taxonId={taxonId}>
          {uniprotTextContent}
        </SubCellViz>
      );
    }
  } else {
    uniprotTabContent = getNoAnnotationMessage('UniProt');
  }

  let goTabContent: ReactElement;
  if (goTextContent) {
    if (virus || !taxonId || !goLocations?.length) {
      goTabContent = goTextContent;
    } else {
      goTabContent = (
        <SubCellViz goLocations={goLocations} taxonId={taxonId}>
          {goTextContent}
        </SubCellViz>
      );
    }
  } else {
    goTabContent = getNoAnnotationMessage('GO');
  }

  return (
    <Suspense fallback={null}>
      <Tabs>
        <Tab cache title="UniProt Annotation">
          {uniprotTabContent}
        </Tab>
        <Tab cache title="GO Annotation">
          {goTabContent}
        </Tab>
      </Tabs>
    </Suspense>
  );
};

export default SubcellularLocationWithVizView;
