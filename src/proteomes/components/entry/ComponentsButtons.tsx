import { useState, Suspense, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import {
  createSelectedQueryString,
  stringifyUrl,
} from '../../../shared/utils/url';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';

import { LocationToPath, Location } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';

const ComponentsDownloadComponent = lazy(
  () =>
    import(/* webpackChunkName: "components-download" */ './ComponentsDownload')
);

type Props = Pick<
  ProteomesAPIModel,
  'id' | 'proteinCount' | 'components' | 'proteomeType' | 'proteomeStatistics'
> & {
  selectedEntries: string[];
};

const fetchOptions = { method: 'HEAD' };

const ComponentsButtons = ({
  id,
  proteinCount,
  components,
  selectedEntries,
  proteomeType,
  proteomeStatistics,
}: Props) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const { pathname } = useLocation();

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
  const isUniparcSearch =
    proteomeType === 'Redundant proteome' || proteomeType === 'Excluded';

  const allQuery = `(${isUniparcSearch ? 'upid' : 'proteome'}:${id})`;
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

  const { headers: selectedHeaders } = useDataApi(
    displayDownloadPanel && selectedEntries.length
      ? stringifyUrl(
          apiUrls.search.searchPrefix(
            isUniparcSearch ? Namespace.uniparc : Namespace.uniprotkb
          ),
          {
            query: selectedQuery,
            size: '0',
          }
        )
      : null,
    fetchOptions
  );

  const numberSelectedProteins = Number(
    selectedHeaders?.['x-total-results'] || 0
  );

  if (!components?.length) {
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
            pathname={pathname}
          >
            <ErrorBoundary>
              <ComponentsDownloadComponent
                query={allQuery}
                selectedEntries={selectedEntries}
                selectedQuery={selectedQuery}
                totalNumberResults={proteinCount}
                numberSelectedEntries={numberSelectedProteins}
                onClose={handleToggleDownload}
                proteomeStatistics={proteomeStatistics}
                isUniparcSearch={isUniparcSearch}
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
        <Link
          className="button tertiary"
          to={{
            pathname:
              LocationToPath[
                isUniparcSearch
                  ? Location.UniParcResults
                  : Location.UniProtKBResults
              ],
            search: `query=${selectedQuery}`,
          }}
        >
          View proteins
        </Link>
      </div>
    </>
  );
};

export default ComponentsButtons;
