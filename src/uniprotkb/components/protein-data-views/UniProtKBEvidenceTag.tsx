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
import { allSearchResultLocations } from '../../../app/config/urls';

import { Evidence } from '../../types/modelTypes';

export enum EvidenceTagSourceTypes {
  PUBMED = 'PubMed',
  UNIPROT = 'UniProtKB',
  PROSITE_PRORULE = 'PROSITE-ProRule',
}

export type UniProtEvidenceTagContentProps = {
  evidenceData: EvidenceData;
  evidences?: Evidence[];
};

export const UniProtEvidenceTagContent = ({
  evidenceData,
  evidences,
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
      <h5 data-article-id="evidences">
        {evidenceData.label} <small>({evidenceData.description})</small>
      </h5>
      {publicationReferences && (
        <UniProtKBEntryPublications
          pubmedIds={
            publicationReferences
              .map((reference: Evidence) => reference.id)
              .filter((id?: string) => id) as string[]
          }
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

const UniProtKBEvidenceTag = ({ evidences }: { evidences?: Evidence[] }) => {
  const searchPageMatch = useRouteMatch(allSearchResultLocations);
  if (searchPageMatch?.isExact || !evidences) {
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
        return (
          <EvidenceTag
            label={evidenceData.labelRender?.(references) || evidenceData.label}
            className={
              evidenceData.manual
                ? 'svg-colour-reviewed'
                : 'svg-colour-unreviewed'
            }
            key={evidenceCode}
          >
            <UniProtEvidenceTagContent
              evidenceData={evidenceData}
              evidences={references}
            />
          </EvidenceTag>
        );
      })}
    </>
  );
};

export default memo(UniProtKBEvidenceTag);
