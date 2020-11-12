import React, { FC } from 'react';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';

import {
  EntryType,
  getEntryTypeFromString,
} from '../../../uniprotkb/adapters/uniProtkbConverter';

export const EntryTypeIcon: FC<{
  entryType?: EntryType | string;
  title?: string;
}> = ({ entryType, title }) => {
  let entryTypeToCheck = entryType;
  if (typeof entryType === 'string') {
    entryTypeToCheck = getEntryTypeFromString(entryType);
  }

  if (entryTypeToCheck === EntryType.REVIEWED) {
    return (
      <span
        className="uniprot-title__status icon--reviewed"
        title={title || 'This marks a reviewed entry'}
      >
        <SwissProtIcon />
      </span>
    );
  }
  if (entryTypeToCheck === EntryType.UNREVIEWED) {
    return (
      <span
        className="uniprot-title__status icon--unreviewed"
        title={title || 'This marks an unreviewed entry'}
      >
        <TremblIcon />
      </span>
    );
  }
  // if (entryTypeToCheck === EntryType.UNIPARC) {
  //   return (
  //     <span
  //       className="uniprot-title__status icon--unreviewed"
  //       title={title || 'UniParc entry'}
  //     >
  //       <UniParcIcon />
  //     </span>
  //   );
  // }
  return null;
};

export default EntryTypeIcon;
