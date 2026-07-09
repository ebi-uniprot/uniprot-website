import { AiAnnotationsIcon, EvidenceTag, ExpandableList } from 'franklin-sites';
import { groupBy } from 'lodash-es';
import { memo } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { allEntryPages } from '../../../app/config/urls';
import { pluralise } from '../../../shared/utils/utils';
import {
  type EvidenceData,
  getEcoNumberFromString,
  getEvidenceCodeData,
  labels,
} from '../../config/evidenceCodes';
import { type Evidence } from '../../types/modelTypes';
import { type EvidenceProperty, protNLM2Id } from '../../types/protNLMAPIModel';
import EvidenceLink from './EvidenceLink';
import ProtNLM2EvidenceLink from './ProtNLM2EvidenceLink';
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
  accession?: string;
};

const UniProtEvidenceTagContent = ({
  evidenceCode,
  evidenceData,
  evidences,
  useGOEvidenceContent,
  accession,
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
            {mappedEvidences.map(({ id, url, properties }: Evidence, index) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key -- static, API-ordered evidence list; evidence may lack an id
              <span key={id || index}>
                {id === protNLM2Id && accession ? (
                  <ProtNLM2EvidenceLink
                    // Safe narrowing: the `id === protNLM2Id` check above
                    // means these properties came from a ProtNlmEvidence,
                    // whose `properties` is typed as EvidenceProperty[].
                    properties={properties as EvidenceProperty[]}
                    accession={accession}
                  />
                ) : (
                  <EvidenceLink source={key} value={id} url={url} />
                )}
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
  const entryPageMatch = useRouteMatch<{ accession: string }>(allEntryPages);
  if (!entryPageMatch || !evidences?.length) {
    return null;
  }
  const evidenceObj = groupBy(evidences, (evidence) => evidence.evidenceCode);
  const hasProtNLM2 = evidences.some((evidence) => evidence.id === protNLM2Id);
  return (
    <>
      {hasProtNLM2 && (
        <AiAnnotationsIcon
          className="ai-annotation-marker"
          aria-label="AI-predicted annotation"
        />
      )}
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
              accession={entryPageMatch.params.accession}
            />
          </EvidenceTag>
        );
      })}
    </>
  );
};

export default memo(UniProtKBEvidenceTag);
