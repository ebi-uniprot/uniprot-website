import { FC, useState, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, DownloadIcon, SlidingPanel } from 'franklin-sites';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import lazy from '../../../shared/utils/lazy';

import { createSelectedQueryString } from '../../../shared/config/apiUrls';

import { LocationToPath, Location } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import {
  Component,
  ProteomesAPIModel,
} from '../../adapters/proteomesConverter';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { fileFormatsResultsDownloadForRedundant } from '../../config/download';

const DownloadComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "download" */ '../../../shared/components/download/Download'
    )
);

const ComponentsButtons: FC<
  Pick<
    ProteomesAPIModel,
    'id' | 'components' | 'proteinCount' | 'proteomeType'
  > & {
    selectedEntries: string[];
  }
> = ({ id, components, selectedEntries, proteinCount, proteomeType }) => {
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
                numberSelectedEntries={numberSelectedProteins}
                totalNumberResults={proteinCount}
                onClose={() => setDisplayDownloadPanel(false)}
                namespace={Namespace.uniprotkb}
                supportedFormats={
                  proteomeType === 'Redundant proteome'
                    ? fileFormatsResultsDownloadForRedundant
                    : undefined
                }
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
          onClick={() => setDisplayDownloadPanel((value) => !value)}
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
