import { Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniParcEntryConfig from '../../config/UniParcEntryConfig';

import { UniParcUIModel } from '../../adapters/uniParcConverter';

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
