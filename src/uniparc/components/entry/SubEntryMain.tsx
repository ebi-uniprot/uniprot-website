import { Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

import { UniParcUIModel } from '../../adapters/uniParcConverter';

type EntryMainProps = {
  transformedData: UniParcUIModel;
  totalNResults?: number;
};

const SubEntryMain = ({ transformedData, totalNResults }: EntryMainProps) => (
  <>
    {UniParcSubEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>{sectionContent(transformedData)}</ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default SubEntryMain;
