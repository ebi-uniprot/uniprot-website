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

import useUserPreferences from '../../hooks/useUserPreferences';
import useNS from '../../hooks/useNS';

import lazy from '../../utils/lazy';

import { Namespace, mainNamespaces } from '../../types/namespaces';
import {
  SortDirection,
  SelectedFacet,
} from '../../../uniprotkb/types/resultsTypes';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';
import { ViewMode } from './ResultsData';

import './styles/results-buttons.scss';

const DownloadComponent = lazy(
  () => import(/* webpackChunkName: "download" */ '../download/Download')
);

type ResultsButtonsProps = {
  query: string;
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  selectedEntries: string[];
  total: number;
};

const ResultsButtons: FC<ResultsButtonsProps> = ({
  query,
  selectedFacets,
  sortColumn,
  sortDirection,
  selectedEntries,
  total,
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const namespace = useNS();
  if (!namespace) {
    throw new Error('No namespace provided');
  }

  const [viewMode, setViewMode] = useUserPreferences<ViewMode>(
    'view-mode',
    ViewMode.CARD
  );

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
              query={query}
              selectedFacets={selectedFacets}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              selectedEntries={selectedEntries}
              totalNumberResults={total}
              onClose={() => setDisplayDownloadPanel(false)}
              namespace={namespace}
            />
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group">
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
          <Button variant="tertiary">
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
        {viewMode === ViewMode.TABLE && <CustomiseButton />}
      </div>
    </>
  );
};

export default ResultsButtons;
