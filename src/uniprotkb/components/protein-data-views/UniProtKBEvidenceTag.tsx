import { EvidenceTag, ExpandableList } from 'franklin-sites';
import { groupBy } from 'lodash-es';
import { memo } from 'react';
import { useMatch } from 'react-router';

import { pluralise } from '../../../shared/utils/utils';
import {
  EvidenceData,
  getEcoNumberFromString,
  getEvidenceCodeData,
  labels,
} from '../../config/evidenceCodes';
import { Evidence } from '../../types/modelTypes';
import EvidenceLink from './EvidenceLink';
import UniProtKBEntryPublications from './UniProtKBEntryPublications';

export enum EvidenceTagSourceTypes {
  PUBMED = 'PubMed',
  UNIPROT = 'UniProtKB',
  PROSITE_PRORULE = 'PROSITE-ProRule',
}

export type UniProtEvidenceTagContentProps = {
  evidenceCode: string;
  evidenceData: EvidenceData;
  evidences?: Evidence[];
  useGOEvidenceContent?: boolean;
};

const UniProtEvidenceTagContent = ({
  evidenceCode,
  evidenceData,
  evidences,
  useGOEvidenceContent,
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
        {useGOEvidenceContent
          ? evidenceData.evidenceTagContentHeadingForGO
          : evidenceData.evidenceTagContentHeading(evidences)}
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
  goTermEvidence?: boolean;
}) => {
  const entryPageMatch = Boolean(useMatch('/:namespace/:accession'));
  if (!entryPageMatch || !evidences?.length) {
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
          evidenceData.evidenceTagLabel?.(references) ||
          (goTermEvidence
            ? `${references.length} ${pluralise(
                labels.PUBLICATION,
                references.length
              )}`
            : evidenceData.evidenceTagContentHeading(references));
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
              useGOEvidenceContent={goTermEvidence}
            />
          </EvidenceTag>
        );
      })}
    </>
  );
};

export default memo(UniProtKBEvidenceTag);
