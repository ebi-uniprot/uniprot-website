import { FC, memo } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniRefEntryConfig from '../../config/UniRefEntryConfig';

import { UniRefUIModel } from '../../adapters/uniRefConverter';

type EntryMainProps = {
  transformedData: UniRefUIModel;
  metadata?: Record<string, string>;
};

function arePropsEqual(prevProps: EntryMainProps, nextProps: EntryMainProps) {
  // Do NOT re-render the page, as long as the 'id' value is the same.
  return prevProps.transformedData.id === nextProps.transformedData.id;
}

const EntryMain: FC<EntryMainProps> = ({ transformedData, metadata }) => (
  <>
    {UniRefEntryConfig.map(({ id, sectionContent }) => (
      <ErrorBoundary key={id}>
        {sectionContent(transformedData, metadata)}
      </ErrorBoundary>
    ))}
  </>
);

export default memo(EntryMain, arePropsEqual);
