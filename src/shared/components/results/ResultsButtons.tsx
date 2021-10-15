import { FC, useState, Suspense, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import {
  DownloadIcon,
  StatisticsIcon,
  TableIcon,
  ListIcon,
  Button,
  SlidingPanel,
} from 'franklin-sites';

import BlastButton from '../action-buttons/Blast';
import AlignButton from '../action-buttons/Align';
import MapIDButton from '../action-buttons/MapID';
import AddToBasketButton from '../action-buttons/AddToBasket';
import CustomiseButton from '../action-buttons/CustomiseButton';
import ItemCount from '../ItemCount';
import ErrorBoundary from '../error-component/ErrorBoundary';

import useLocalStorage from '../../hooks/useLocalStorage';
import useNS from '../../hooks/useNS';

import lazy from '../../utils/lazy';

import { Namespace, mainNamespaces } from '../../types/namespaces';
import { ViewMode } from './ResultsData';

import './styles/results-buttons.scss';

const DownloadComponent = lazy(
  /* istanbul ignore next */
  () => import(/* webpackChunkName: "download" */ '../download/Download')
);

type ResultsButtonsProps = {
  selectedEntries: string[];
  setSelectedEntries?: Dispatch<SetStateAction<string[]>>;
  total: number;
  loadedTotal: number;
  accessions?: string[];
  namespaceOverride?: Namespace;
  base?: string;
  disableCardToggle?: boolean; // Note: remove if we have card view for id mapping
  inBasket?: boolean;
  notCustomisable?: boolean;
};

const ResultsButtons: FC<ResultsButtonsProps> = ({
  selectedEntries,
  setSelectedEntries,
  total,
  loadedTotal,
  accessions,
  namespaceOverride,
  base,
  disableCardToggle = false,
  inBasket = false,
  notCustomisable = false,
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    'view-mode',
    ViewMode.CARD
  );

  const isMain = mainNamespaces.has(namespace);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            title="Download"
            // Meaning, in basket mini view, slide from the right
            position={notCustomisable && inBasket ? 'right' : 'left'}
            onClose={() => setDisplayDownloadPanel(false)}
          >
            <ErrorBoundary>
              <DownloadComponent
                selectedEntries={selectedEntries}
                accessions={accessions}
                totalNumberResults={total}
                onClose={() => setDisplayDownloadPanel(false)}
                namespace={namespace}
                base={base}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group results-buttons">
        {isMain && namespace !== Namespace.proteomes && (
          <BlastButton selectedEntries={selectedEntries} />
        )}
        {isMain && namespace !== Namespace.proteomes && (
          <AlignButton selectedEntries={selectedEntries} />
        )}
        {isMain && namespace !== Namespace.proteomes && (
          <MapIDButton
            selectedEntries={selectedEntries}
            namespace={namespace}
          />
        )}
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => setDisplayDownloadPanel((value) => !value)}
        >
          <DownloadIcon />
          Download
        </Button>
        {isMain && namespace !== Namespace.proteomes && (
          <AddToBasketButton
            selectedEntries={selectedEntries}
            setSelectedEntries={setSelectedEntries}
            remove={inBasket}
          />
        )}
        {!inBasket && isMain && (
          <Button variant="tertiary" disabled>
            <StatisticsIcon />
            Statistics
          </Button>
        )}
        <Button
          variant="tertiary"
          className="large-icon"
          onClick={() =>
            setViewMode(
              viewMode === ViewMode.CARD ? ViewMode.TABLE : ViewMode.CARD
            )
          }
          data-testid="table-card-toggle"
          title={`Switch to "${
            viewMode === ViewMode.CARD ? 'table' : 'card'
          }" view`}
          disabled={namespace === Namespace.idmapping || disableCardToggle}
        >
          <TableIcon
            className={cn('results-buttons__toggle', {
              'results-buttons__toggle--active': viewMode === ViewMode.TABLE,
            })}
          />
          <ListIcon
            className={cn('results-buttons__toggle', {
              'results-buttons__toggle--active': viewMode === ViewMode.CARD,
            })}
          />
        </Button>
        {!notCustomisable && viewMode === ViewMode.TABLE && <CustomiseButton />}
        <ItemCount selected={selectedEntries.length} loaded={loadedTotal} />
      </div>
    </>
  );
};

export default ResultsButtons;
