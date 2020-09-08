import React, { FC } from 'react';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';
import { EntryType } from '../../adapters/uniProtkbConverter';
import './styles/uniprotkb-title.scss';

export const ReviewedUnreviewed: FC<{ entryType: EntryType }> = ({
  entryType,
}) =>
  entryType === EntryType.REVIEWED ? (
    <span
      className="uniprot-title__status icon--reviewed"
      title="This marks a reviewed entry"
    >
      <SwissProtIcon />
    </span>
  ) : (
    <span
      className="uniprot-title__status icon--unreviewed"
      title="This marks an unreviewed entry"
    >
      <TremblIcon />
    </span>
  );

const UniProtKBTitle: FC<{
  primaryAccession: string;
  entryType: EntryType;
  uniProtkbId: string;
}> = ({ primaryAccession, entryType, uniProtkbId }) => (
  <span className="uniprot-title">
    <ReviewedUnreviewed entryType={entryType} />
    {primaryAccession}
    {` · ${uniProtkbId}`}
  </span>
);

export default UniProtKBTitle;
