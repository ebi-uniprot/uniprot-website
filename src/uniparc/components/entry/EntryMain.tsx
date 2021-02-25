import { memo } from 'react';

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
};

const EntryMain = memo<EntryMainProps>(({ transformedData, xrefs }) => (
  <>
    {UniParcEntryConfig.map(({ id, sectionContent }) => (
      <ErrorBoundary key={id}>
        {sectionContent(transformedData, xrefs)}
      </ErrorBoundary>
    ))}
  </>
));

export default EntryMain;
