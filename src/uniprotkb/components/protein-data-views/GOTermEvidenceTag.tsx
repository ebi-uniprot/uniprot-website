import { EvidenceTag } from 'franklin-sites';

import * as logging from '../../../shared/utils/logging';

import {
  getEcoNumberFromGoEvidenceType,
  getEvidenceCodeData,
} from '../../config/evidenceCodes';

import { GoEvidenceType } from '../../types/modelTypes';

const GOTermEvidenceTag = ({ evidence }: { evidence?: GoEvidenceType }) => {
  if (!evidence) {
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
      <h5 data-article-id="evidences#evidence-types-that-are-used-in-go-annotation">
        {evidenceData.description}
      </h5>
    </EvidenceTag>
  );
};

export default GOTermEvidenceTag;
