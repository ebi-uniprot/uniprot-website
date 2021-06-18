import { FC, useState, Suspense } from 'react';
import cn from 'classnames';
import {
  DownloadIcon,
  StatisticsIcon,
  TableIcon,
  ListIcon,
  Button,
} from 'franklin-sites';

import SlidingPanel, { Position } from '../layouts/SlidingPanel';
import BlastButton from '../action-buttons/Blast';
import AlignButton from '../action-buttons/Align';
import AddToBasketButton from '../action-buttons/AddToBasket';
import CustomiseButton from '../action-buttons/CustomiseButton';

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
  total: number;
  accessions?: string[];
  namespaceFallback?: Namespace;
  base?: string;
  disableCardToggle?: boolean; // Note: remove if we have card view for id mapping
};

const ResultsButtons: FC<ResultsButtonsProps> = ({
  total,
  selectedEntries,
  accessions,
  namespaceFallback,
  base,
  disableCardToggle = false,
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const namespace = useNS() || namespaceFallback || Namespace.uniprotkb;
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    'view-mode',
    ViewMode.CARD
  );

  if (!namespace) {
    throw new Error('No namespace provided');
  }

  const isMain = mainNamespaces.has(namespace);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            position={Position.left}
            yScrollable
            onClose={() => setDisplayDownloadPanel(false)}
          >
            <DownloadComponent
              selectedEntries={selectedEntries}
              accessions={accessions}
              totalNumberResults={total}
              onClose={() => setDisplayDownloadPanel(false)}
              namespace={namespace}
              base={base}
            />
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
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </Button>
        {isMain && namespace !== Namespace.proteomes && (
          <AddToBasketButton selectedEntries={selectedEntries} />
        )}
        {isMain && (
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
        {viewMode === ViewMode.TABLE && namespace !== Namespace.idmapping && (
          <CustomiseButton />
        )}
      </div>
    </>
  );
};

export default ResultsButtons;
