import { useState, Suspense, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, DownloadIcon, SlidingPanel } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import lazy from '../../../shared/utils/lazy';
import {
  DownloadMethod,
  DownloadPanelFormCloseReason,
  sendGtagEventPanelOpen,
  sendGtagEventPanelResultsDownloadClose,
} from '../../../shared/utils/gtagEvents';

import { createSelectedQueryString } from '../../../shared/config/apiUrls';
import { fileFormatsResultsDownloadForRedundant } from '../../config/download';

import { LocationToPath, Location } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import {
  Component,
  ProteomesAPIModel,
} from '../../adapters/proteomesConverter';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';

const DownloadComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "download" */ '../../../shared/components/download/Download'
    )
);

type Props = Pick<
  ProteomesAPIModel,
  'id' | 'components' | 'proteinCount' | 'proteomeType'
> & {
  selectedEntries: string[];
};

const ComponentsButtons = ({
  id,
  components,
  selectedEntries,
  proteinCount,
  proteomeType,
}: Props) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const handleDownloadToggle = useCallback(
    (reason: DownloadPanelFormCloseReason, downloadMethod?: DownloadMethod) => {
      if (displayDownloadPanel) {
        sendGtagEventPanelResultsDownloadClose(reason, downloadMethod);
        setDisplayDownloadPanel(false);
      } else {
        sendGtagEventPanelOpen('results_download');
        setDisplayDownloadPanel(true);
      }
    },
    [displayDownloadPanel]
  );

  const allQuery = `(${
    // Excluded not supported at the moment, need to wait for TRM-28011
    proteomeType === 'Redundant proteome' ? 'upid' : 'proteome'
  }:${id})`;
  const selectedQuery = useMemo(
    () =>
      `${allQuery}${
        selectedEntries.length !== 0 &&
        selectedEntries.length !== components?.length
          ? ` AND (${createSelectedQueryString(
              selectedEntries.map((component) => `"${component}"`),
              UniProtKBColumn.proteomeComponent
            )})`
          : ''
      }`,
    [allQuery, components?.length, selectedEntries]
  );

  // TODO: the number presented here can be innaccurate see JIRA: https://www.ebi.ac.uk/panda/jira/browse/TRM-26418
  const numberSelectedProteins = useMemo(() => {
    // Don't bother iterating over the components if there are no selectedEntries
    if (!selectedEntries.length || !components?.length) {
      return 0;
    }
    return components.reduce(
      (prev: number, curr: Component) =>
        prev + (selectedEntries.includes(curr.name) ? curr.proteinCount : 0),
      0
    );
  }, [components, selectedEntries]);

  // Excluded not supported at the moment, need to wait for TRM-28011
  if (!components?.length || proteomeType === 'Excluded') {
    return null;
  }

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            title="Download"
            position="left"
            onClose={handleDownloadToggle}
          >
            <ErrorBoundary>
              <DownloadComponent
                query={allQuery}
                selectedEntries={selectedEntries}
                selectedQuery={selectedQuery}
                numberSelectedEntries={numberSelectedProteins}
                totalNumberResults={proteinCount}
                onClose={handleDownloadToggle}
                namespace={
                  // Excluded not supported at the moment, need to wait for TRM-28011
                  proteomeType === 'Redundant proteome'
                    ? Namespace.uniparc
                    : Namespace.uniprotkb
                }
                supportedFormats={
                  proteomeType === 'Redundant proteome'
                    ? fileFormatsResultsDownloadForRedundant
                    : undefined
                }
                // List of proteins has to be downloaded. In that case, the default proteome columns must not be set
                excludeColumns
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group">
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => handleDownloadToggle('toggle')}
        >
          <DownloadIcon />
          Download
        </Button>
        <Button
          element={Link}
          to={{
            pathname:
              LocationToPath[
                proteomeType === 'Redundant proteome'
                  ? Location.UniParcResults
                  : Location.UniProtKBResults
              ],
            search: `query=${selectedQuery}`,
          }}
          variant="tertiary"
        >
          View proteins
        </Button>
      </div>
    </>
  );
};

export default ComponentsButtons;
