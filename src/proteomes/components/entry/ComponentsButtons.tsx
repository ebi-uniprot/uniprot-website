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
import {
  Component,
  ProteomesAPIModel,
} from '../../adapters/proteomesConverter';
import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { SearchResults } from '../../../shared/types/results';

const ComponentsDownloadComponent = lazy(
  () =>
    import(/* webpackChunkName: "components-download" */ './ComponentsDownload')
);

type Props = Pick<
  ProteomesAPIModel,
  'id' | 'components' | 'proteinCount' | 'proteomeType' | 'superkingdom'
> & {
  selectedEntries: string[];
};

export type IsoformStatistics = {
  allWithIsoforms: number | undefined;
  reviewed: number | undefined;
  reviewedWithIsoforms: number | undefined;
};

const ComponentsButtons = ({
  id,
  components,
  selectedEntries,
  proteinCount,
  proteomeType,
  superkingdom,
}: Props) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const { headers } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    stringifyUrl(apiUrls.search(Namespace.uniprotkb), {
      query: `(proteome=${id}) AND (reviewed=true)`,
      size: '0',
    })
  );

  // Below is a mock prototype for passing counts to download. Once the endpoint is ready. it needs to be updated
  const isoformStats: IsoformStatistics = {
    allWithIsoforms: undefined,
    reviewed: Number(headers?.['x-total-results']) || undefined,
    reviewedWithIsoforms: undefined,
  };

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
            onClose={handleToggleDownload}
          >
            <ErrorBoundary>
              <ComponentsDownloadComponent
                query={allQuery}
                selectedEntries={selectedEntries}
                selectedQuery={selectedQuery}
                numberSelectedEntries={numberSelectedProteins}
                totalNumberResults={proteinCount}
                onClose={handleToggleDownload}
                proteomeType={proteomeType}
                superkingdom={superkingdom}
                isoformStats={isoformStats}
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
