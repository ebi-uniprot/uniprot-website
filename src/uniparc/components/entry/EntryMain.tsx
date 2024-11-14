import { Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniParcEntryConfig from '../../config/UniParcEntryConfig';

import { UniParcUIModel, UniParcXRef } from '../../adapters/uniParcConverter';
import { PaginatedResults } from '../../../shared/hooks/usePagination';

type EntryMainProps = {
  transformedData: UniParcUIModel;
  xrefs: PaginatedResults<UniParcXRef>;
};

const EntryMain = ({ transformedData, xrefs }: EntryMainProps) => (
  <>
    {UniParcEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />} key={id}>
        <ErrorBoundary>{sectionContent(transformedData, xrefs)}</ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default EntryMain;
