import { FC, CSSProperties, useCallback, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { noop } from 'lodash-es';

import { MSAInput } from '../../../types/alignment';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';

import { getEntryPath } from '../../../../app/config/urls';
import accessionToNamespace from '../../../../shared/utils/accessionToNamespace';

import { ParsedSequenceAndFeatures } from '../../utils/useSequenceInfo';

import './styles/AlignLabel.scss';

type AlignLabelProps = {
  accession?: string;
  children: string;
  info?: Partial<ParsedSequenceAndFeatures | MSAInput>;
  loading: boolean;
  style?: CSSProperties;
  checked?: boolean;
  onSequenceChecked?: (id: string) => void;
  onIdClick?: () => void;
  active?: boolean;
};

const AlignLabel: FC<React.PropsWithChildren<AlignLabelProps>> = ({
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
      <EntryTypeIcon entryType={before} />
      {before}
      {/* inject a link to the entry page */}
      <Link to={getEntryPath(accessionToNamespace(accession), accession)}>
        {accession}
      </Link>
      {after.join(accession)}
    </button>
  );
};

export default AlignLabel;
