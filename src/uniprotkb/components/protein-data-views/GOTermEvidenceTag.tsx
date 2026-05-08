import { EvidenceTag } from 'franklin-sites';

import * as logging from '../../../shared/utils/logging';
import {
  getEcoNumberFromGoEvidenceType,
  getEvidenceCodeData,
} from '../../config/evidenceCodes';
import { type GoEvidenceType } from '../../types/modelTypes';
import { ProtNLM2Id } from '../../types/protNLMAPIModel';

const GOTermEvidenceTag = ({ evidence }: { evidence?: GoEvidenceType }) => {
  if (!evidence) {
    return null;
  }
  // ProtNLM2 contribution is already surfaced by the row stripe and the
  // AI marker on the sibling UniProtKBEvidenceTag — skip the duplicate chip.
  if (evidence === `IEA:${ProtNLM2Id}`) {
    return null;
  }
  const evidenceCode = getEcoNumberFromGoEvidenceType(evidence);
  const evidenceData = getEvidenceCodeData(evidenceCode);

  if (!evidenceData) {
    logging.warn(`GO evidence missing for ${evidence}`);
    return null;
  }

  const codeRegEx = /(.*):/;
  const match = codeRegEx.exec(evidence)?.[1] || '';
  return (
    <EvidenceTag
      label={evidence.replace(match, 'Source')}
      className={
        evidenceData?.manual ? 'svg-colour-reviewed' : 'svg-colour-unreviewed'
      }
    >
      <h5 data-article-id="evidences#evidence-types-used-for-go-annotations">
        {evidenceData.evidenceTagContentHeadingForGO}
      </h5>
    </EvidenceTag>
  );
};

export default GOTermEvidenceTag;
