import { Loader } from 'franklin-sites';
import { Suspense } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import { UniParcUIModel } from '../../adapters/uniParcConverter';
import UniParcEntryConfig from '../../config/UniParcEntryConfig';

type EntryMainProps = {
  transformedData: UniParcUIModel;
};

const EntryMain = ({ transformedData }: EntryMainProps) => (
  <>
    {UniParcEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>{sectionContent(transformedData)}</ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default EntryMain;
