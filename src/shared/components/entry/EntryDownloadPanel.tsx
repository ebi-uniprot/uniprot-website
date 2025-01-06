import { Suspense } from 'react';
import { useLocation } from 'react-router';
import { SlidingPanel } from 'franklin-sites';

import EntryDownload, { Dataset } from './EntryDownload';
import ErrorBoundary from '../error-component/ErrorBoundary';

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
        title={<span data-article-id="downloads">Download</span>}
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
