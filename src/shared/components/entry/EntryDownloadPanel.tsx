import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
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
  featureTypes?: string[];
  sequence?: string;
};
const EntryDownloadPanel = ({
  handleToggle,
  nResults,
  isoformsAvailable,
  columns,
  dataset,
  featureTypes,
  sequence,
}: EntryDownloadPanelProps) => {
  const { pathname } = useLocation();
  return (
    <Suspense fallback={null}>
      <SlidingPanel
        title="Download"
        position="left"
        onClose={handleToggle}
        pathname={pathname}
      >
        <ErrorBoundary>
          <EntryDownload
            onClose={handleToggle}
            nResults={nResults}
            isoformsAvailable={isoformsAvailable}
            columns={columns}
            dataset={dataset}
            featureTypes={featureTypes}
            sequence={sequence}
          />
        </ErrorBoundary>
      </SlidingPanel>
    </Suspense>
  );
};

export default EntryDownloadPanel;
