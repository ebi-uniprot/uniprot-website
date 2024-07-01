import { Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';

type EntryMainProps = {
  transformedData: UniParcSubEntryUIModel;
};

const SubEntryMain = ({ transformedData }: EntryMainProps) => (
  <>
    {Object.values(UniParcSubEntryConfig).map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>{sectionContent(transformedData)}</ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default SubEntryMain;
