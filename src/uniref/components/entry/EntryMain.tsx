import { Loader } from 'franklin-sites';
import { memo, Suspense } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { type UniRefUIModel } from '../../adapters/uniRefConverter';
import UniRefEntryConfig from '../../config/UniRefEntryConfig';

type EntryMainProps = {
  transformedData: UniRefUIModel;
};

const EntryMain = ({ transformedData }: EntryMainProps) => (
  <>
    {UniRefEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>{sectionContent(transformedData)}</ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default memo(EntryMain);
