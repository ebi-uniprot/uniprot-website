import { FC } from 'react';

import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';
import EntryTypeIcon from './EntryTypeIcon';

import './styles/entry-title.scss';

const EntryTitle: FC<{
  mainTitle: string;
  optionalTitle?: string;
  entryType?: EntryType | string | EntryType[];
}> = ({ mainTitle, optionalTitle, entryType }) => (
  <span className="entry-title">
    {entryType instanceof Array ? (
      entryType.map((memberType) => (
        <EntryTypeIcon entryType={memberType} key={memberType} />
      ))
    ) : (
      <EntryTypeIcon entryType={entryType} />
    )}
    {mainTitle}
    {optionalTitle && ` · ${optionalTitle}`}
  </span>
);

export default EntryTitle;
