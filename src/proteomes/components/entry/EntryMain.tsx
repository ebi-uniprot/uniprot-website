import { Loader } from 'franklin-sites';
import { memo, Suspense } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { type ProteomesUIModel } from '../../adapters/proteomesConverter';
import ProteomesEntryConfig from '../../config/ProteomesEntryConfig';

type EntryMainProps = {
  transformedData: ProteomesUIModel;
};

const EntryMain = ({ transformedData }: EntryMainProps) => (
  <>
    {ProteomesEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>{sectionContent(transformedData)}</ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default memo(EntryMain);
