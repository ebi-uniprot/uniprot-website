import { FC, useState, Suspense } from 'react';
import { Button, DownloadIcon } from 'franklin-sites';

import SlidingPanel, {
  Position,
} from '../../../shared/components/layouts/SlidingPanel';

import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import localStorageKeys from '../../../app/config/localStorageKeys';

import lazy from '../../../shared/utils/lazy';
import { Namespace } from '../../../shared/types/namespaces';
import { Column, nsToDefaultColumns } from '../../../shared/config/columns';

const DownloadComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "download" */ '../../../shared/components/download/Download'
    )
);

const getViewButtonText = (nSelected: number, nComponents: number) => {
  if (nComponents === 1) {
    return 'View entry for component';
  }
  return `View ${nSelected !== 1 ? 'entries' : 'entry'} for ${
    nSelected === 0 || nSelected === nComponents ? 'all' : nSelected || ''
  } ${nSelected ? ' selected' : ' '} ${
    nSelected === 0 || nSelected > 1 ? 'components' : 'component'
  }`;
};

const ComponentsButtons: FC<any> = ({ components, selectedEntries }) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const query = '';
  const defaultColumns = nsToDefaultColumns[Namespace.uniprotkb];
  const [tableColumns] = useLocalStorage<Column[]>(
    localStorageKeys.tableColumns(Namespace.uniprotkb),
    defaultColumns || []
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
          variant="tertiary"
          // onClick={handleClick}
        >
          {getViewButtonText(selectedEntries.length, components.length)}
        </Button>
      </div>
    </>
  );
};

export default ComponentsButtons;
