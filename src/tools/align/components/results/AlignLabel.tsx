import React, { FC, CSSProperties, useCallback, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { noop } from 'lodash-es';

import { ReviewedUnreviewed } from '../../../../shared/components/entry/EntryTitle';

import { EntryType } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { ParsedSequenceAndFeatures } from '../../utils/useSequenceInfo';
import { MSAInput } from '../../../components/AlignmentView';
import { Sequence } from '../../../components/Wrapped';

import './styles/AlignLabel.scss';

type AlignLabelProps = {
  accession?: string;
  children: string;
  info?: ParsedSequenceAndFeatures | MSAInput | Sequence;
  loading: boolean;
  style?: CSSProperties;
  checked?: boolean;
  onSequenceChecked?: (id: string) => void;
  onIdClick?: () => void;
  active?: boolean;
};

const AlignLabel: FC<AlignLabelProps> = ({
  accession,
  info,
  loading,
  children,
  style,
  checked,
  onSequenceChecked,
  onIdClick,
  active = false,
}) => {
  const invalid = accession && !loading && !info;
  const title = invalid
    ? 'Even though this looks like a valid accession, the sequence appears to have been edited and does not match our data'
    : undefined;
  const className = cn('align-label', {
    'align-label--invalid': invalid,
    'align-label--loading': loading,
    'align-label--active': active,
    'align-label--selectable': onIdClick,
  });

  const handleChange = useCallback(
    () => accession && onSequenceChecked?.(accession),
    [onSequenceChecked, accession]
  );

  const handleClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

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
    <button
      type="button"
      className={className}
      style={style}
      onClick={onIdClick || noop}
      tabIndex={onIdClick ? 0 : -1}
    >
      {onSequenceChecked && accession && (
        <input
          type="checkbox"
          onChange={handleChange}
          onClick={handleClick}
          checked={checked}
        />
      )}
      {reviewImg}
      {before}
      {/* inject a link to the entry page */}
      <Link to={`/uniprotkb/${accession}`}>{accession}</Link>
      {after.join(accession)}
    </button>
  );
};

export default AlignLabel;
