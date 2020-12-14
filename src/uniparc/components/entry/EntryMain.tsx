import { FC, memo } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniParcEntryConfig from '../../config/UniParcEntryConfig';

import { UniParcUIModel } from '../../adapters/uniParcConverter';

type EntryMainProps = {
  transformedData: UniParcUIModel;
  metadata?: Record<string, string>;
};

function arePropsEqual(prevProps: EntryMainProps, nextProps: EntryMainProps) {
  // Do NOT re-render the page, as long as the 'id' value is the same.
  return (
    prevProps.transformedData.uniParcId === nextProps.transformedData.uniParcId
  );
}

const EntryMain: FC<EntryMainProps> = ({ transformedData, metadata }) => (
  <>
    {UniParcEntryConfig.map(({ name, sectionContent }) => (
      <ErrorBoundary key={name}>
        {sectionContent(transformedData, metadata)}
      </ErrorBoundary>
    ))}
  </>
);

export default memo(EntryMain, arePropsEqual);
