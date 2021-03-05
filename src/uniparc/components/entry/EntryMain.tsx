import { FC } from 'react';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniParcEntryConfig from '../../config/UniParcEntryConfig';

import {
  UniParcAPIModel,
  UniParcUIModel,
} from '../../adapters/uniParcConverter';
import { UseDataAPIWithStaleState } from '../../../shared/hooks/useDataApiWithStale';
import UniParcFeaturesView from './UniParcFeaturesView';

type EntryMainProps = {
  transformedData: UniParcUIModel;
  xrefs: UseDataAPIWithStaleState<UniParcAPIModel>;
};

const EntryMain: FC<EntryMainProps> = ({ transformedData, xrefs }) => (
  <>
    {transformedData.sequenceFeatures && (
      <UniParcFeaturesView
        data={transformedData.sequenceFeatures}
        sequence={transformedData.sequence.value}
      />
    )}
    {UniParcEntryConfig.map(({ id, sectionContent }) => (
      <ErrorBoundary key={id}>
        {sectionContent(transformedData, xrefs)}
      </ErrorBoundary>
    ))}
  </>
);

export default EntryMain;
