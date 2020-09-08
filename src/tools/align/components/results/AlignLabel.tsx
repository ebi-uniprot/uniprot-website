import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ReviewedUnreviewed } from '../../../../uniprotkb/components/protein-data-views/UniProtKBTitle';

import { EntryType } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { ParsedSequenceAndFeatures } from '../../utils/useSequenceInfo';

import './styles/AlignLabel.scss';

type Props = {
  accession?: string;
  children: string;
  info?: ParsedSequenceAndFeatures;
  loading: boolean;
};

const AlignLabel: FC<Props> = ({ accession, info, loading, children }) => {
  const invalid = accession && !loading && !info;
  const title = invalid
    ? 'Even though this looks like a valid accession, the sequence appears to have been edited and does not match our data'
    : undefined;
  const className = cn('align-label', {
    'align-label--invalid': invalid,
    'align-label--loading': loading,
  });

  if (!accession || loading || invalid) {
    return (
      <span className={className} title={title}>
        {children}
      </span>
    );
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
    <span className={className}>
      {reviewImg}
      {before}
      {/* inject a link to the entry page */}
      <Link to={`/uniprotkb/${accession}`}>{accession}</Link>
      {after.join(accession)}
    </span>
  );
};

export default AlignLabel;
