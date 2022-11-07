import { memo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { groupBy } from 'lodash-es';
import { EvidenceTag, ExpandableList } from 'franklin-sites';

import UniProtKBEntryPublications from './UniProtKBEntryPublications';
import EvidenceLink from '../../config/evidenceUrls';

import {
  getEvidenceCodeData,
  EvidenceData,
  getEcoNumberFromString,
} from '../../config/evidenceCodes';
import { allEntryPages } from '../../../app/config/urls';

import { Evidence } from '../../types/modelTypes';

export enum EvidenceTagSourceTypes {
  PUBMED = 'PubMed',
  UNIPROT = 'UniProtKB',
  PROSITE_PRORULE = 'PROSITE-ProRule',
}

export type UniProtEvidenceTagContentProps = {
  evidenceCode: string;
  evidenceData: EvidenceData;
  evidences?: Evidence[];
  useDescriptionAsLabel?: Boolean;
};

export const UniProtEvidenceTagContent = ({
  evidenceCode,
  evidenceData,
  evidences,
  useDescriptionAsLabel,
}: UniProtEvidenceTagContentProps) => {
  if (!evidences?.length) {
    return null;
  }
  const groupedEvidences =
    evidences && groupBy(evidences, (evidence) => evidence.source);
  const {
    [EvidenceTagSourceTypes.PUBMED]: publicationReferences,
    ...groupedEvidencesWithoutPubs
  } = groupedEvidences;
  return (
    <div>
      <h5 data-article-id={`evidences#${evidenceCode}`}>
        {useDescriptionAsLabel ? evidenceData.description : evidenceData.label}
      </h5>
      {publicationReferences && (
        <UniProtKBEntryPublications
          pubmedIds={publicationReferences
            .map((reference: Evidence) => reference.id)
            .filter((id?: string): id is string => Boolean(id))}
        />
      )}

      {Object.entries(groupedEvidencesWithoutPubs).map(
        ([key, mappedEvidences]) => (
          <ExpandableList
            numberCollapsedItems={10}
            displayNumberOfHiddenItems
            descriptionString={`${key} sources`}
            key={key}
          >
            {mappedEvidences.map(({ id, url }: Evidence, index) => (
              <span key={id || index}>
                <EvidenceLink source={key} value={id} url={url} />
              </span>
            ))}
          </ExpandableList>
        )
      )}
    </div>
  );
};

const UniProtKBEvidenceTag = ({
  evidences,
  goTermEvidence,
}: {
  evidences?: Evidence[];
  goTermEvidence?: Boolean;
}) => {
  const entryPageMatch = useRouteMatch(allEntryPages);
  if (!entryPageMatch || !evidences) {
    return null;
  }
  const evidenceObj = groupBy(evidences, (evidence) => evidence.evidenceCode);
  return (
    <>
      {Object.entries(evidenceObj).map(([evidenceCode, references]) => {
        const evidenceData = getEvidenceCodeData(
          getEcoNumberFromString(evidenceCode)
        );
        if (!evidenceData) {
          return null;
        }
        const preferrredLabel =
          evidenceData.labelRender?.(references) ||
          (goTermEvidence ? evidenceData.description : evidenceData.label);
        return (
          <EvidenceTag
            label={preferrredLabel}
            className={
              evidenceData.manual
                ? 'svg-colour-reviewed'
                : 'svg-colour-unreviewed'
            }
            key={evidenceCode}
          >
            <UniProtEvidenceTagContent
              evidenceCode={evidenceCode}
              evidenceData={evidenceData}
              evidences={references}
              useDescriptionAsLabel={goTermEvidence}
            />
          </EvidenceTag>
        );
      })}
    </>
  );
};

export default memo(UniProtKBEvidenceTag);
