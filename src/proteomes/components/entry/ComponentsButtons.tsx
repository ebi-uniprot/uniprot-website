import { FC, useState, Suspense, useCallback } from 'react';
import { Button, DownloadIcon } from 'franklin-sites';
import { Link } from 'react-router-dom';

import SlidingPanel, {
  Position,
} from '../../../shared/components/layouts/SlidingPanel';

import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import lazy from '../../../shared/utils/lazy';

import localStorageKeys from '../../../app/config/localStorageKeys';
import { Column, nsToDefaultColumns } from '../../../shared/config/columns';
import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

const DownloadComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "download" */ '../../../shared/components/download/Download'
    )
);

const ComponentsButtons: FC<
  Pick<ProteomesAPIModel, 'id'> & {
    nComponents: number;
    selectedEntries: string[];
  }
> = ({ id, nComponents, selectedEntries }) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const query = '';
  const defaultColumns = nsToDefaultColumns[Namespace.uniprotkb];
  const [tableColumns] = useLocalStorage<Column[]>(
    localStorageKeys.tableColumns(Namespace.uniprotkb),
    defaultColumns || []
  );

  const getViewButtonQuery = useCallback(
    () =>
      `query=(proteome:${id})${
        selectedEntries.length !== 0 && selectedEntries.length !== nComponents
          ? ` AND (${selectedEntries
              .map((component) => `proteomecomponent:"${component}"`)
              .join(' OR ')})`
          : ''
      }`,
    [nComponents, id, selectedEntries]
  );

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            position={Position.left}
            onClose={() => setDisplayDownloadPanel(false)}
            yScrollable
          >
            <DownloadComponent
              query={query}
              selectedEntries={selectedEntries}
              selectedColumns={tableColumns || defaultColumns}
              totalNumberResults={nComponents}
              onClose={() => setDisplayDownloadPanel(false)}
              namespace={Namespace.uniprotkb}
            />
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group">
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </Button>
        <Button
          element={Link}
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: getViewButtonQuery(),
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
