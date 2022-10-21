import { memo, Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import ProteomesEntryConfig from '../../config/ProteomesEntryConfig';

import { isSameEntry } from '../../../shared/utils/utils';

import { ProteomesUIModel } from '../../adapters/proteomesConverter';

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

export default memo(EntryMain, isSameEntry);
