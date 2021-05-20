import { Fragment, FC } from 'react';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { FreeTextComment, TextWithEvidence } from '../../types/commentTypes';

type TextViewProps = { comments: TextWithEvidence[]; noEvidence?: boolean };

export const TextView = ({ comments, noEvidence }: TextViewProps) => (
  <section className="text-block">
    {comments.map((comment, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {comment.value}
        {!noEvidence && comment.evidences && (
          <UniProtKBEvidenceTag evidences={comment.evidences} />
        )}
      </Fragment>
    ))}
  </section>
);

type FreeTextProps = {
  comments?: FreeTextComment[];
  title?: string;
  showMolecule?: boolean;
  noEvidence?: boolean;
};

const FreeTextView: FC<FreeTextProps> = ({
  comments,
  title,
  showMolecule = true,
  noEvidence,
}) => {
  if (!comments?.length) {
    return null;
  }
  const freeTextData = comments.map(
    (item, index) =>
      item.texts && (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {showMolecule && item.molecule && <h5>{item.molecule}</h5>}
          <TextView comments={item.texts} noEvidence={noEvidence} />
        </Fragment>
      )
  );

  return (
    <>
      {title && <h3 style={{ textTransform: 'capitalize' }}>{title}</h3>}
      {freeTextData}
    </>
  );
};

export default FreeTextView;
