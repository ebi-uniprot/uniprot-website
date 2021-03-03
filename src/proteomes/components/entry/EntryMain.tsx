import { FC, memo } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import ProteomesEntryConfig from '../../config/ProteomesEntryConfig';

import { ProteomesUIModel } from '../../adapters/proteomesConverter';

type EntryMainProps = {
  transformedData: ProteomesUIModel;
};

function arePropsEqual(prevProps: EntryMainProps, nextProps: EntryMainProps) {
  // Do NOT re-render the page, as long as the 'id' value is the same.
  return prevProps.transformedData.id === nextProps.transformedData.id;
}

const EntryMain: FC<EntryMainProps> = ({ transformedData }) => (
  <>
    {ProteomesEntryConfig.map(({ id, sectionContent }) => (
      <ErrorBoundary key={id}>{sectionContent(transformedData)}</ErrorBoundary>
    ))}
  </>
);

export default memo(EntryMain, arePropsEqual);
