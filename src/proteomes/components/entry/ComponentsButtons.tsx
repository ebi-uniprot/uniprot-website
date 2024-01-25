import { useState, Suspense, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, DownloadIcon, SlidingPanel } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import lazy from '../../../shared/utils/lazy';
import {
  DownloadMethod,
  DownloadPanelFormCloseReason,
  sendGtagEventPanelOpen,
  sendGtagEventPanelResultsDownloadClose,
} from '../../../shared/utils/gtagEvents';
import { stringifyUrl } from '../../../shared/utils/url';

import apiUrls, {
  createSelectedQueryString,
} from '../../../shared/config/apiUrls';

import { LocationToPath, Location } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { SearchResults } from '../../../shared/types/results';

const ComponentsDownloadComponent = lazy(
  () =>
    import(/* webpackChunkName: "components-download" */ './ComponentsDownload')
);

type Props = Pick<
  ProteomesAPIModel,
  'id' | 'components' | 'proteomeType' | 'proteomeStatistics'
> & {
  selectedEntries: string[];
};

const fetchOptions = { method: 'HEAD' };

const ComponentsButtons = ({
  id,
  components,
  selectedEntries,
  proteomeType,
  proteomeStatistics,
}: Props) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const handleToggleDownload = useCallback(
    (reason: DownloadPanelFormCloseReason, downloadMethod?: DownloadMethod) => {
      setDisplayDownloadPanel((displayDownloadPanel) => {
        if (displayDownloadPanel) {
          sendGtagEventPanelResultsDownloadClose(reason, downloadMethod);
        } else {
          sendGtagEventPanelOpen('results_download');
        }
        return !displayDownloadPanel;
      });
    },
    []
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

  const { headers: selectedHeaders } = useDataApi<
    SearchResults<UniProtkbAPIModel>
  >(
    displayDownloadPanel && selectedEntries.length
      ? stringifyUrl(apiUrls.search(Namespace.uniprotkb), {
          query: selectedQuery,
          size: '0',
        })
      : null,
    fetchOptions
  );

  const numberSelectedProteins = Number(
    selectedHeaders?.['x-total-results'] || 0
  );

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
            onClose={handleToggleDownload}
          >
            <ErrorBoundary>
              <ComponentsDownloadComponent
                query={allQuery}
                selectedEntries={selectedEntries}
                selectedQuery={selectedQuery}
                numberSelectedEntries={numberSelectedProteins}
                onClose={handleToggleDownload}
                proteomeType={proteomeType}
                proteomeStatistics={proteomeStatistics}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group">
        <Button
          variant="tertiary"
          onPointerOver={ComponentsDownloadComponent.preload}
          onFocus={ComponentsDownloadComponent.preload}
          onClick={() => handleToggleDownload('toggle')}
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
