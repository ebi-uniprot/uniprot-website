import { Fragment, FC } from 'react';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import { FreeTextComment, TextWithEvidence } from '../../types/commentTypes';

type FreeTextProps = {
  comments?: FreeTextComment[];
  title?: string;
  showMolecule?: boolean;
};

export const TextView: FC<{ comments: TextWithEvidence[] }> = ({
  comments,
}) => (
  <section className="text-block">
    {comments.map((comment, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Fragment key={index}>
        {comment.value}
        {comment.evidences && (
          <UniProtKBEvidenceTag evidences={comment.evidences} />
        )}
      </Fragment>
    ))}
  </section>
);

const FreeTextView: FC<FreeTextProps> = ({
  comments,
  title,
  showMolecule = true,
}) => {
  if (!comments || comments.length <= 0) {
    return null;
  }
  const freeTextData = comments.map(
    (item, index) =>
      item.texts && (
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {showMolecule && item.molecule && <h5>{item.molecule}</h5>}
          <TextView comments={item.texts} />
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
