import { Suspense } from 'react';
import { SlidingPanel } from 'franklin-sites';
import { ErrorBoundary } from '@sentry/react';
import EntryDownload from './EntryDownload';

type EntryDownloadPanelProps = {
  handleToggle: () => void;
  nResults?: number;
  isoformsAvailable?: boolean;
};
const EntryDownloadPanel = ({
  handleToggle,
  nResults,
  isoformsAvailable,
}: EntryDownloadPanelProps) => (
  <Suspense fallback={null}>
    <SlidingPanel title="Download" position="left" onClose={handleToggle}>
      <ErrorBoundary>
        <EntryDownload
          onClose={handleToggle}
          nResults={nResults}
          isoformsAvailable={isoformsAvailable}
        />
      </ErrorBoundary>
    </SlidingPanel>
  </Suspense>
);

export default EntryDownloadPanel;
