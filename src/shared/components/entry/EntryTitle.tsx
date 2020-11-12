import React, { FC } from 'react';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';

import {
  EntryType,
  getEntryTypeFromString,
} from '../../../uniprotkb/adapters/uniProtkbConverter';

import './styles/uniprotkb-title.scss';

export const EntryTypeIcon: FC<{ entryType?: EntryType | string }> = ({
  entryType,
}) => {
  let entryTypeToCheck = entryType;
  if (typeof entryType === 'string') {
    entryTypeToCheck = getEntryTypeFromString(entryType);
  }

  if (entryTypeToCheck === EntryType.REVIEWED) {
    return (
      <span
        className="uniprot-title__status icon--reviewed"
        title="This marks a reviewed entry"
      >
        <SwissProtIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.UNREVIEWED) {
    return (
      <span
        className="uniprot-title__status icon--unreviewed"
        title="This marks an unreviewed entry"
      >
        <TremblIcon />
      </span>
    );
  }
  // if (entryTypeToCheck === EntryType.UNIPARC) {
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
  entryType?: EntryType | string;
}> = ({ mainTitle, optionalTitle, entryType }) => (
  <span className="uniprot-title">
    <EntryTypeIcon entryType={entryType} />
    {mainTitle}
    {optionalTitle && ` · ${optionalTitle}`}
  </span>
);

export default EntryTitle;
