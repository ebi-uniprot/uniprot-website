import { FC } from 'react';

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

const EntryMain: FC<EntryMainProps> = ({
  transformedData,
  xrefs,
  totalNResults,
}) => (
  <>
    {UniParcEntryConfig.map(({ id, sectionContent }) => (
      <ErrorBoundary key={id}>
        {sectionContent(transformedData, xrefs, totalNResults)}
      </ErrorBoundary>
    ))}
  </>
);

export default EntryMain;
