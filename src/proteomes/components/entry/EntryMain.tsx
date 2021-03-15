import { FC, memo } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import ProteomesEntryConfig from '../../config/ProteomesEntryConfig';

import { isSameEntry } from '../../../shared/utils/utils';

import { ProteomesUIModel } from '../../adapters/proteomesConverter';

type EntryMainProps = {
  transformedData: ProteomesUIModel;
};

const EntryMain: FC<EntryMainProps> = ({ transformedData }) => (
  <>
    {ProteomesEntryConfig.map(({ id, sectionContent }) => (
      <ErrorBoundary key={id}>{sectionContent(transformedData)}</ErrorBoundary>
    ))}
  </>
);

export default memo(EntryMain, isSameEntry);
