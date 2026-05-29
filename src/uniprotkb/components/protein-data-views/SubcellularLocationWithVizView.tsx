import { HeroContainer, Tab, Tabs } from 'franklin-sites';
import { type FC, lazy, type ReactElement, type ReactNode } from 'react';

import LazyComponent from '../../../shared/components/LazyComponent';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import * as logging from '../../../shared/utils/logging';
import { type Lineage } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type GoXref } from '../../adapters/subcellularLocationConverter';
import { type UniProtKBSimplifiedTaxonomy } from '../../adapters/uniProtkbConverter';
import {
  getEcoNumberFromGoEvidenceType,
  getEcoNumberFromString,
  getEvidenceCodeData,
} from '../../config/evidenceCodes';
import { type SubcellularLocationComment } from '../../types/commentTypes';
import { type Evidence, type GoEvidenceType } from '../../types/modelTypes';
import { aiEvidenceCode, protNLM2Evidence } from '../../types/protNLMAPIModel';
import SubcellularLocationGOView from './SubcellularLocationGOView';
import SubcellularLocationView from './SubcellularLocationView';

// Import it lazily in order to isolate the libraries used only for this
const SubCellViz =
  typeof window !== 'undefined' && 'customElements' in window
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

type EvidenceType = 'reviewed' | 'unreviewed' | 'ai';

export type SubCellularLocation = {
  id: string;
  evidenceType: EvidenceType;
};

/**
 * Whether we have enough lineage data to drive the SubCell viz. Callers should
 * gate the viz on this before consulting `isVirus` — without a superkingdom
 * we can't classify the organism and the viz has nothing to render.
 */
export const hasSuperkingdom = ([superkingdom]: Lineage | string[]): boolean =>
  superkingdom !== undefined;

export const isVirus = ([superkingdom]: Lineage | string[]) => {
  if (superkingdom === undefined) {
    // Belt-and-braces — callers should use hasSuperkingdom() first, but keep
    // this so isVirus is safe to call on its own.
    return false;
  }
  if (typeof superkingdom === 'string') {
    return superkingdom === Superkingdom.Viruses;
  }
  logging.warn(
    "Looks like we're getting a list of objects now, make sure the first item is indeed the superkingdom!"
  );
  return superkingdom.scientificName === Superkingdom.Viruses;
};

const getSubcellularLocationId = (id: string) => id.match(/SL-(\d+)/)?.[1];

export const getGoId = (id: string) => id.match(/GO:(\d+)/)?.[1];

const getNoAnnotationMessage = (name: string) => (
  <HeroContainer>{`No ${name} annotations available.`}</HeroContainer>
);

const isAiEvidence = (e: Evidence) => e.evidenceCode === aiEvidenceCode;

const isReviewedEvidence = (e: Evidence) => {
  const ecoNumber = getEcoNumberFromString(e.evidenceCode);
  const ecoData = ecoNumber ? getEvidenceCodeData(ecoNumber) : undefined;
  return Boolean(ecoData?.manual);
};

const isUnreviewedEvidence = (e: Evidence) =>
  !isAiEvidence(e) && !isReviewedEvidence(e);

// Evidence type precedence:
// (1) reviewed
// (2) unreviewed
// (3) ai
export const getUniProtEvidenceType = (
  evidences: Evidence[] | undefined = []
): EvidenceType | null => {
  // Empty array → not classifiable. Return null without logging; the
  // unreviewed predicate is the inverse of reviewed/ai, so for any
  // non-empty array at least one of the three branches below matches —
  // logging "Unknown Evidence Type" can only ever fire on `[]`, which
  // is a legitimate state for some entries, not a bug.
  if (!evidences.length) {
    return null;
  }
  if (evidences.some(isReviewedEvidence)) {
    return 'reviewed';
  }
  if (evidences.some(isUnreviewedEvidence)) {
    return 'unreviewed';
  }
  if (evidences.some(isAiEvidence)) {
    return 'ai';
  }
  logging.error('Unknown Evidence Type');
  return null;
};

export const getGoEvidenceType = (goEvidence: GoEvidenceType): EvidenceType => {
  if (goEvidence === protNLM2Evidence) {
    return 'ai';
  }
  const evidenceData = getEvidenceCodeData(
    getEcoNumberFromGoEvidenceType(goEvidence)
  );
  return evidenceData?.manual ? 'reviewed' : 'unreviewed';
};

const SubcellularLocationWithVizView: FC<
  {
    primaryAccession?: string;
    comments?: SubcellularLocationComment[];
    goXrefs?: GoXref[];
  } & Partial<Pick<UniProtKBSimplifiedTaxonomy, 'taxonId' | 'lineage'>>
> = ({ primaryAccession, comments, taxonId, lineage, goXrefs }) => {
  // Examples for different cases:
  // P05067      lots of UniProt & GO data
  // P11926      only GO data
  // Q00733      only notes
  // A0A2K3DA85  no data
  // A0A6P6D5T4  ProtNLM2 GO

  const isSmallScreen = useSmallScreen();

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
      (subcellularLocations || []).map(({ location }) => {
        if (!location.id || !location.evidences) {
          return null;
        }
        const id = getSubcellularLocationId(location.id);
        if (!id) {
          return null;
        }
        const evidenceType = getUniProtEvidenceType(location.evidences);
        if (!evidenceType) {
          return null;
        }
        return {
          id,
          evidenceType,
        };
      })
    )
    .filter((l: SubCellularLocation | null): l is SubCellularLocation =>
      Boolean(l)
    );

  const goLocations = (goXrefs || [])
    .map(({ id, properties }): SubCellularLocation | null => {
      const goId = getGoId(id);
      return !goId
        ? null
        : {
            id: goId,
            evidenceType: getGoEvidenceType(properties.GoEvidenceType),
          };
    })
    .filter((l: SubCellularLocation | null): l is SubCellularLocation =>
      Boolean(l)
    );

  // Gate the viz on having a superkingdom we can classify — without one the
  // viz has no way to pick a body diagram and would render empty.
  const knownLineage = hasSuperkingdom(lineage);
  const virus = isVirus(lineage);

  let uniprotTabContent: ReactElement;
  let selectGoTab = false;
  if (uniprotTextContent) {
    if (!knownLineage || virus || !taxonId || !uniProtLocations?.length) {
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
    if (!knownLineage || virus || !taxonId || !goLocations?.length) {
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

  const fallback = (
    <Tabs bordered>
      <Tab cache title="UniProt Annotation">
        {uniprotTextContent}
      </Tab>
      <Tab cache title="GO Annotation" defaultSelected={selectGoTab}>
        {goTextContent}
      </Tab>
    </Tabs>
  );

  if (isSmallScreen) {
    return fallback;
  }

  return (
    <LazyComponent fallback={fallback}>
      <Tabs bordered>
        <Tab cache title="UniProt Annotation">
          {uniprotTabContent}
        </Tab>
        <Tab cache title="GO Annotation" defaultSelected={selectGoTab}>
          {goTabContent}
        </Tab>
      </Tabs>
    </LazyComponent>
  );
};

export default SubcellularLocationWithVizView;
