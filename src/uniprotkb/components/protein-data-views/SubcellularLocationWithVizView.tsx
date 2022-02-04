import { FC, Suspense, lazy, ReactNode, ReactElement } from 'react';
import { Tabs, Tab, HeroContainer } from 'franklin-sites';

import SubcellularLocationView from './SubcellularLocationView';
import SubcellularLocationGOView from './SubcellularLocationGOView';

import {
  getEvidenceCodeData,
  getEcoNumberFromGoEvidenceType,
  getEcoNumberFromString,
} from '../../config/evidenceCodes';

import * as logging from '../../../shared/utils/logging';

import { SubcellularLocationComment } from '../../types/commentTypes';
import {
  Lineage,
  TaxonomyDatum,
} from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
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

const isVirus = ([superkingdom]: Lineage | string[]) => {
  if (typeof superkingdom === 'string') {
    return superkingdom === Superkingdom.Viruses;
  }
  logging.warn(
    "Looks like we're getting a list of objects now, make sure the first item is indeed the superkingdom!"
  );
  return superkingdom.scientificName === Superkingdom.Viruses;
};

export const getSubcellularLocationId = (id: string) =>
  id.match(/SL-(\d+)/)?.[1];

export const getGoId = (id: string) => id.match(/GO:(\d+)/)?.[1];

const getNoAnnotationMessage = (name: string) => (
  <HeroContainer>{`No ${name} annotations available.`}</HeroContainer>
);

const SubcellularLocationWithVizView: FC<
  {
    primaryAccession?: string;
    comments?: SubcellularLocationComment[];
    goXrefs?: GoXref[];
  } & Partial<Pick<TaxonomyDatum, 'taxonId' | 'lineage'>>
> = ({ primaryAccession, comments, taxonId, lineage, goXrefs }) => {
  // Examples for different cases:
  // P05067      lots of UniProt & GO data
  // P11926      only GO data
  // Q00733      only notes
  // A0A2K3DA85  no data

  // Need lineage to determine if this protein is within a virus as swissbiopics is (currently) incompatible with viruses
  if ((!comments?.length && !goXrefs?.length) || !lineage) {
    return null;
  }

  const uniprotTextContent = !!comments?.length && (
    <SubcellularLocationView comments={comments} />
  );
  const goTextContent = !!goXrefs && primaryAccession && (
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

  const virus = isVirus(lineage);

  let uniprotTabContent: ReactElement;
  let selectGoTab = false;
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
    selectGoTab = true;
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
    selectGoTab = false;
    goTabContent = getNoAnnotationMessage('GO');
  }

  return (
    <Suspense fallback={null}>
      <Tabs>
        <Tab cache title="UniProt Annotation">
          {uniprotTabContent}
        </Tab>
        <Tab cache title="GO Annotation" defaultSelected={selectGoTab}>
          {goTabContent}
        </Tab>
      </Tabs>
    </Suspense>
  );
};

export default SubcellularLocationWithVizView;
