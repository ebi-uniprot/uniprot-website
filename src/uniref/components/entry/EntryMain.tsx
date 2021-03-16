import { FC, memo } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniRefEntryConfig from '../../config/UniRefEntryConfig';

import { isSameEntry } from '../../../shared/utils/utils';

import { UniRefUIModel } from '../../adapters/uniRefConverter';

type EntryMainProps = {
  transformedData: UniRefUIModel;
};

const EntryMain: FC<EntryMainProps> = ({ transformedData }) => (
  <>
    {UniRefEntryConfig.map(({ id, sectionContent }) => (
      <ErrorBoundary key={id}>{sectionContent(transformedData)}</ErrorBoundary>
    ))}
  </>
);

export default memo(EntryMain, isSameEntry);
