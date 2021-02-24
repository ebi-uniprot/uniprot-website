import { FC } from 'react';

import EntryTypeIcon from './EntryTypeIcon';

import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';

import './styles/entry-title.scss';

const EntryTitle: FC<{
  mainTitle: string;
  optionalTitle?: string;
  entryType?: EntryType | string | Array<EntryType | string>;
}> = ({ mainTitle, optionalTitle, entryType }) => (
  <span className="entry-title">
    {entryType instanceof Array ? (
      entryType.map((entryTypeItem) => (
        <EntryTypeIcon entryType={entryTypeItem} key={entryTypeItem} />
      ))
    ) : (
      <EntryTypeIcon entryType={entryType} />
    )}
    {mainTitle}
    {optionalTitle && ` · ${optionalTitle}`}
  </span>
);

export default EntryTitle;
