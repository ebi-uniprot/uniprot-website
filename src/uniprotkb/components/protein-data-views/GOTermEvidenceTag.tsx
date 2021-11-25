import { FC } from 'react';
import { EvidenceTag } from 'franklin-sites';

const GOTermEvidenceTag: FC<{ evidence?: string }> = ({ evidence }) => {
  if (!evidence) {
    return null;
  }

  // Add logic to determin className underneath based on the evidence (see current website)
  // Might want to change type of 'evidence' to be union of strings instead of 'string
  return (
    <>
      <EvidenceTag
        label={evidence}
        //   className={
        //     evidenceData.manual ? 'svg-colour-reviewed' : 'svg-colour-unreviewed'
        //
      />
    </>
  );
};

export default GOTermEvidenceTag;
