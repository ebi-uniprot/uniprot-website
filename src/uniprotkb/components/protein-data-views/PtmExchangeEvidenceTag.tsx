import { memo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { groupBy } from 'lodash-es';
import { EvidenceTag, ExpandableList } from 'franklin-sites';

import UniProtKBEntryPublications from './UniProtKBEntryPublications';
import EvidenceLink from './EvidenceLink';

import {
  getEvidenceCodeData,
  getEcoNumberFromString,
} from '../../config/evidenceCodes';
import { allEntryPages } from '../../../app/config/urls';

import { Evidence } from '../../types/modelTypes';
import { ConfidenceScore } from './UniProtKBFeaturesView';
import { EvidenceTagSourceTypes } from './UniProtKBEvidenceTag';

import style from './styles/ptmexchange-evidence-tag.module.scss';

const PtmExchangeEvidence = ({ evidences }: { evidences?: Evidence[] }) => {
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
      {publicationReferences && (
        // Remove this className - using as a stopgap until data is imported into citations
        <div className={style.publications}>
          <UniProtKBEntryPublications
            pubmedIds={publicationReferences
              .map((reference: Evidence) => reference.id)
              .filter((id?: string): id is string => Boolean(id))}
          />
        </div>
      )}
    </div>
  );
};

const PtmExchangeEvidenceTag = ({
  evidences,
  confidenceScore,
}: {
  evidences?: Evidence[];
  confidenceScore?: ConfidenceScore;
}) => {
  const entryPageMatch = useRouteMatch(allEntryPages);
  if (!entryPageMatch || !evidences) {
    return null;
  }

  /* TODO: Determine how to split original evidence from reanalysed data
  For now assuming all original data will have ECO:0007829. Eventually use the 
  <PtmExchangeEvidence evidences={reanalysedEvidences} />
  */
  const evidenceObj = groupBy(evidences, (evidence) => evidence.evidenceCode);
  const originalEvidenceCode = 'ECO:0007829';
  const originalEvidences = evidenceObj[originalEvidenceCode];
  const originalEvidenceData = getEvidenceCodeData(
    getEcoNumberFromString(originalEvidenceCode)
  );
  if (!originalEvidenceData) {
    return null;
  }
  return (
    <EvidenceTag
      label={
        originalEvidenceData.evidenceTagLabel?.(originalEvidences) ||
        originalEvidenceData.evidenceTagContentHeading(originalEvidences)
      }
      className={
        originalEvidenceData.manual
          ? 'svg-colour-reviewed'
          : 'svg-colour-unreviewed'
      }
    >
      <section className={style['evidence-tag-content']}>
        <h5 data-article-id={`evidences#${originalEvidenceCode}`}>
          {originalEvidenceData.evidenceTagContentHeading(originalEvidences)}
        </h5>
        <section>
          <h5 data-article-id="mod_res_large_scale#what-is-the-goldsilverbronze-criterion">
            Confidence score: {confidenceScore || 'Unknown'}
          </h5>
          This score has been used to reflect the strength of the evidence for
          this modified site following reanalysis of available datasets.
        </section>
        <section className="styles.section">
          <h5 className="small">Evidence</h5>
          <PtmExchangeEvidence evidences={originalEvidences} />
        </section>
      </section>
    </EvidenceTag>
  );
};

export default memo(PtmExchangeEvidenceTag);
