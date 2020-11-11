import React, { FC } from 'react';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';

import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';

import './styles/uniprotkb-title.scss';

export const EntryTypeIcon: FC<{ entryType?: EntryType }> = ({ entryType }) => {
  if (entryType === EntryType.REVIEWED) {
    return (
      <span
        className="uniprot-title__status icon--reviewed"
        title="This marks a reviewed entry"
      >
        <SwissProtIcon />
      </span>
    );
  }
  if (entryType === EntryType.UNREVIEWED) {
    return (
      <span
        className="uniprot-title__status icon--unreviewed"
        title="This marks an unreviewed entry"
      >
        <TremblIcon />
      </span>
    );
  }
  // if (entryType === EntryType.UNIPARC) {
  //   return (
  //     <span
  //       className="uniprot-title__status icon--unreviewed"
  //       title="UniParc entry"
  //     >
  //       <UniParcIcon />
  //     </span>
  //   );
  // }
  return null;
};

const EntryTitle: FC<{
  mainTitle: string;
  optionalTitle?: string;
  entryType?: EntryType;
}> = ({ mainTitle, optionalTitle, entryType }) => (
  <span className="uniprot-title">
    <EntryTypeIcon entryType={entryType} />
    {mainTitle}
    {optionalTitle && ` · ${optionalTitle}`}
  </span>
);

export default EntryTitle;
