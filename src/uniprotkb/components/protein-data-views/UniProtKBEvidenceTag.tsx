import { FC, Fragment } from 'react';
import { groupBy } from 'lodash-es';
import { ExternalLink, EvidenceTag } from 'franklin-sites';
import {
  getEvidenceCodeData,
  EvidenceData,
  getEcoNumberFromString,
} from '../../config/evidenceCodes';
import { Evidence } from '../../types/modelTypes';
import UniProtKBEntryPublications from './UniProtKBEntryPublications';
import { processUrlTemplate } from './XRefView';
import evidenceUrls from '../../config/evidenceUrls';

enum evidenceTagSourceTypes {
  PUBMED = 'PubMed',
  UNIPROT = 'UniProtKB',
  PROSITE_PRORULE = 'PROSITE-ProRule',
}

export const UniProtEvidenceTagContent: FC<{
  evidenceData: EvidenceData;
  evidences: Evidence[] | undefined;
}> = ({ evidenceData, evidences }) => {
  if (!evidences?.length) {
    return null;
  }
  const groupedEvidences =
    evidences && groupBy(evidences, (evidence) => evidence.source);

  const {
    [evidenceTagSourceTypes.PUBMED]: publicationReferences,
    ...groupedEvidencesWithoutPubs
  } = groupedEvidences;

  return (
    <div>
      <h5>{evidenceData.label}</h5>
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
          <Fragment key={key}>
            {mappedEvidences.map(({ id }: Evidence) => {
              if (!id) {
                return null;
              }
              const urlPattern = evidenceUrls[key];
              return urlPattern ? (
                <ExternalLink
                  url={processUrlTemplate(urlPattern, { value: id })}
                  key={id}
                >
                  {id}
                </ExternalLink>
              ) : (
                <Fragment key={id}>{id}</Fragment>
              );
            })}
          </Fragment>
        )
      )}
    </div>
  );
};

const UniProtKBEvidenceTag = ({ evidences }: { evidences?: Evidence[] }) => {
  if (!evidences) {
    return null;
  }
  const evidenceObj = groupBy(evidences, (evidence) => evidence.evidenceCode);
  const evidenceTags = Object.entries(evidenceObj).map(
    ([evidenceCode, references]) => {
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
    }
  );
  return <>{evidenceTags}</>;
};

export default UniProtKBEvidenceTag;
