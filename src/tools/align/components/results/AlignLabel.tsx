import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { ReviewedUnreviewed } from '../../../../uniprotkb/components/protein-data-views/UniProtKBTitle';

import { EntryType } from '../../../../uniprotkb/adapters/uniProtkbConverter';

type Props = {
  accession?: string;
  children: string;
};

const AlignLabel: FC<Props> = ({ accession, children }) => {
  if (!accession) {
    return <>{children}</>;
  }

  // separate text by chunks where we find the accession string
  const [before, ...after] = children.split(accession);

  let reviewImg;
  switch (before.toLowerCase()) {
    case 'sp|':
      reviewImg = <ReviewedUnreviewed entryType={EntryType.REVIEWED} />;
      break;
    case 'tr|':
      reviewImg = <ReviewedUnreviewed entryType={EntryType.UNREVIEWED} />;
      break;
    default:
      reviewImg = null;
  }

  return (
    <>
      {reviewImg}
      {before}
      {/* inject a link to the entry page */}
      <Link to={`/uniprotkb/${accession}`}>{accession}</Link>
      {after.join(accession)}
    </>
  );
};

export default AlignLabel;
