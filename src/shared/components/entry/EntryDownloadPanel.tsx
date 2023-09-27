import { Suspense } from 'react';
import { SlidingPanel } from 'franklin-sites';
import { ErrorBoundary } from '@sentry/react';
import EntryDownload from './EntryDownload';

type EntryDownloadPanelProps = {
  handleToggle: () => void;
  nResults?: number;
};
const EntryDownloadPanel = ({
  handleToggle,
  nResults,
}: EntryDownloadPanelProps) => (
  <Suspense fallback={null}>
    <SlidingPanel title="Download" position="left" onClose={handleToggle}>
      <ErrorBoundary>
        <EntryDownload onClose={handleToggle} nResults={nResults} />
      </ErrorBoundary>
    </SlidingPanel>
  </Suspense>
);

export default EntryDownloadPanel;
