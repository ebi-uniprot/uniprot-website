import { FC, ReactNode } from 'react';

import EntryTypeIcon, { EntryType } from './EntryTypeIcon';

import './styles/entry-title.scss';

const EntryTitle: FC<
  React.PropsWithChildren<{
    mainTitle: string;
    optionalTitle?: ReactNode;
    entryType?: EntryType | string | Array<EntryType | string>;
  }>
> = ({ mainTitle, optionalTitle, entryType }) => (
  <span className="entry-title" translate="no">
    {entryType instanceof Array ? (
      entryType.map((entryTypeItem) => (
        <EntryTypeIcon entryType={entryTypeItem} key={entryTypeItem} />
      ))
    ) : (
      <EntryTypeIcon entryType={entryType} />
    )}
    {mainTitle}
    {optionalTitle && (
      <>
        {' · '}
        {optionalTitle}
      </>
    )}
  </span>
);

export default EntryTitle;
