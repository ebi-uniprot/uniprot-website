import React, { FC } from 'react';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';

import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';

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

const EntryTitle: FC<{
  mainTitle: string;
  optionalTitle?: string;
  entryType?: EntryType;
}> = ({ mainTitle, optionalTitle, entryType }) => (
  <span className="uniprot-title">
    {entryType && <ReviewedUnreviewed entryType={entryType} />}
    {mainTitle}
    {optionalTitle && ` · ${optionalTitle}`}
  </span>
);

export default EntryTitle;
