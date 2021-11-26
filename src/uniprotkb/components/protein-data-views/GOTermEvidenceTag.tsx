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

  return (
    <EvidenceTag
      label={evidence}
      className={
        evidenceData?.manual ? 'svg-colour-reviewed' : 'svg-colour-unreviewed'
      }
    />
  );
};

export default GOTermEvidenceTag;
