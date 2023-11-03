import { Suspense } from 'react';
import { SlidingPanel } from 'franklin-sites';
import { ErrorBoundary } from '@sentry/react';

import EntryDownload from './EntryDownload';

import { Column } from '../../config/columns';

type EntryDownloadPanelProps = {
  handleToggle: () => void;
  nResults?: number;
  isoformsAvailable?: boolean;
  columns?: Column[];
};
const EntryDownloadPanel = ({
  handleToggle,
  nResults,
  isoformsAvailable,
  columns,
}: EntryDownloadPanelProps) => (
  <Suspense fallback={null}>
    <SlidingPanel title="Download" position="left" onClose={handleToggle}>
      <ErrorBoundary>
        <EntryDownload
          onClose={handleToggle}
          nResults={nResults}
          isoformsAvailable={isoformsAvailable}
          columns={columns}
        />
      </ErrorBoundary>
    </SlidingPanel>
  </Suspense>
);

export default EntryDownloadPanel;
