import { Suspense } from 'react';
import { Loader } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniParcEntryConfig from '../../config/UniParcEntryConfig';

import {
  UniParcAPIModel,
  UniParcUIModel,
} from '../../adapters/uniParcConverter';
import { UseDataAPIWithStaleState } from '../../../shared/hooks/useDataApiWithStale';

type EntryMainProps = {
  transformedData: UniParcUIModel;
  xrefs: UseDataAPIWithStaleState<UniParcAPIModel>;
  totalNResults?: number;
};

const EntryMain = ({
  transformedData,
  xrefs,
  totalNResults,
}: EntryMainProps) => (
  <>
    {UniParcEntryConfig.map(({ id, sectionContent }) => (
      <Suspense fallback={<Loader />}>
        <ErrorBoundary key={id}>
          {sectionContent(transformedData, xrefs, totalNResults)}
        </ErrorBoundary>
      </Suspense>
    ))}
  </>
);

export default EntryMain;
