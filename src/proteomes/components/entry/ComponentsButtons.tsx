import { Button, DownloadIcon, SlidingPanel } from 'franklin-sites';
import { Suspense, useCallback, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import {
  DownloadMethod,
  DownloadPanelFormCloseReason,
  sendGtagEventPanelOpen,
  sendGtagEventPanelResultsDownloadClose,
} from '../../../shared/utils/gtagEvents';
import lazy from '../../../shared/utils/lazy';
import {
  createSelectedQueryString,
  stringifyUrl,
} from '../../../shared/utils/url';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

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

  const selectedQuery = useMemo(
    () =>
      `(proteome:${id})${
        selectedEntries.length !== 0 &&
        selectedEntries.length !== components?.length
          ? ` AND (${createSelectedQueryString(
              selectedEntries.map((component) => `"${component}"`),
              UniProtKBColumn.proteomeComponent
            )})`
          : ''
      }`,
    [id, components?.length, selectedEntries]
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
            title={<span data-article-id="downloads">Download</span>}
            position="left"
            onClose={handleToggleDownload}
            pathname={pathname}
          >
            <ErrorBoundary>
              <ComponentsDownloadComponent
                query={`(proteome:${id})`}
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
