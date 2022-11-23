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
      <h5 data-article-id="gene_ontology#list-of-go-evidence-codes-found-in-uniprotkb">
        {evidenceData.description}
      </h5>
    </EvidenceTag>
  );
};

export default GOTermEvidenceTag;
