import React, { FC } from 'react';

import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';
import EntryTypeIcon from './EntryTypeIcon';

import './styles/uniprotkb-title.scss';

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
