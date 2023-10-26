import { Suspense } from 'react';
import { SlidingPanel } from 'franklin-sites';
import { ErrorBoundary } from '@sentry/react';

import EntryDownload, { Dataset } from './EntryDownload';

import { Column } from '../../config/columns';

type EntryDownloadPanelProps = {
  handleToggle: () => void;
  nResults?: number;
  isoformsAvailable?: boolean;
  columns?: Column[];
  dataset?: Dataset;
  availableDatasets?: Dataset[];
  featureTypes?: string[];
};
const EntryDownloadPanel = ({
  handleToggle,
  nResults,
  isoformsAvailable,
  columns,
  dataset,
  availableDatasets,
  featureTypes,
}: EntryDownloadPanelProps) => (
  <Suspense fallback={null}>
    <SlidingPanel title="Download" position="left" onClose={handleToggle}>
      <ErrorBoundary>
        <EntryDownload
          onClose={handleToggle}
          nResults={nResults}
          isoformsAvailable={isoformsAvailable}
          columns={columns}
          dataset={dataset}
          availableDatasets={availableDatasets}
          featureTypes={featureTypes}
        />
      </ErrorBoundary>
    </SlidingPanel>
  </Suspense>
);

export default EntryDownloadPanel;
