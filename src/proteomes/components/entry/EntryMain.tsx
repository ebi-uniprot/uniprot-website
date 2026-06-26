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
      <section id={id} key={id}>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>{sectionContent(transformedData)}</ErrorBoundary>
        </Suspense>
      </section>
    ))}
  </>
);

export default memo(EntryMain);
