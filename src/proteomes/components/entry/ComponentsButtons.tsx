import { FC, useState, Suspense, useCallback } from 'react';
import { Button, DownloadIcon } from 'franklin-sites';

import { Link } from 'react-router-dom';
import SlidingPanel, {
  Position,
} from '../../../shared/components/layouts/SlidingPanel';

import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import localStorageKeys from '../../../app/config/localStorageKeys';

import lazy from '../../../shared/utils/lazy';
import { Namespace } from '../../../shared/types/namespaces';
import { Column, nsToDefaultColumns } from '../../../shared/config/columns';
import { LocationToPath, Location } from '../../../app/config/urls';
import { ProteomesAPIModel } from '../../adapters/proteomesConverter';

const DownloadComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "download" */ '../../../shared/components/download/Download'
    )
);

const ComponentsButtons: FC<
  Pick<ProteomesAPIModel, 'components' | 'id'> & { selectedEntries: string[] }
> = ({ id, components, selectedEntries }) => {
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
        selectedEntries.length !== 0 ||
        selectedEntries.length !== components?.length
          ? ` AND (${selectedEntries
              .map((component) => `proteomecomponent:"${component}"`)
              .join(' OR ')})`
          : ''
      }`,
    [components?.length, id, selectedEntries]
  );

  const getViewButtonText = useCallback(() => {
    const nComponents = components?.length;
    const nSelected = selectedEntries.length;
    if (nComponents === 1) {
      return 'View UniProtKB entry for component';
    }
    return `View UniProtKB ${nSelected !== 1 ? 'entries' : 'entry'} for ${
      nSelected === 0 || nSelected === nComponents
        ? `all ${nComponents}`
        : nSelected || ''
    } ${nSelected ? ' selected' : ' '} ${
      nSelected === 0 || nSelected > 1 ? 'components' : 'component'
    }`;
  }, [components?.length, selectedEntries.length]);

  if (!components?.length) {
    return null;
  }

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
              totalNumberResults={components.length}
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
          {getViewButtonText()}
        </Button>
      </div>
    </>
  );
};

export default ComponentsButtons;
