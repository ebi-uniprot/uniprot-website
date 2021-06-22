import { FC, useState, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, DownloadIcon, SlidingPanel } from 'franklin-sites';

import lazy from '../../../shared/utils/lazy';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import { createSelectedQueryString } from '../../../shared/config/apiUrls';

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

const ComponentsButtons: FC<
  Pick<ProteomesAPIModel, 'id' | 'components' | 'proteinCount'> & {
    selectedEntries: string[];
  }
> = ({ id, components, selectedEntries, proteinCount }) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const allQuery = `(${UniProtKBColumn.proteome}:${id})`;
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

  const numberSelectedProteins = useMemo(
    () =>
      components?.reduce(
        (prev: number, curr: Component) => prev + curr.proteinCount,
        0
      ),
    [components]
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
            onClose={() => setDisplayDownloadPanel(false)}
          >
            <ErrorBoundary>
              <DownloadComponent
                query={allQuery}
                selectedEntries={selectedEntries}
                selectedQuery={selectedQuery}
                numberSelectedEntries={numberSelectedProteins || 10} // TODO: this hardcoded number is temporary until proteinCount is available in the API
                totalNumberResults={proteinCount || 1000} // TODO: ☝️ Same as above
                onClose={() => setDisplayDownloadPanel(false)}
                namespace={Namespace.uniprotkb}
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
          onClick={() => {
            setDisplayDownloadPanel(!displayDownloadPanel);
          }}
        >
          <DownloadIcon />
          Download
        </Button>
        <Button
          element={Link}
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
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
