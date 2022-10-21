import { memo, Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniRefEntryConfig from '../../config/UniRefEntryConfig';

import { isSameEntry } from '../../../shared/utils/utils';

import { UniRefUIModel } from '../../adapters/uniRefConverter';

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

export default memo(EntryMain, isSameEntry);
