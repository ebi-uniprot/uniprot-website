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

import lazy from '../../utils/lazy';

import {
  SortDirection,
  SelectedFacet,
} from '../../../uniprotkb/types/resultsTypes';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';
import { ViewMode } from './ResultsContainer';
import { Column } from '../../config/columns';

const DownloadComponent = lazy(
  () => import(/* webpackChunkName: "download" */ '../download/Download')
);

const ResultsButtons: FC<{
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  query: string;
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  selectedEntries: string[];
  total: number;
  tableColumns: Column[];
  onTableColumnsChange: (columns: Column[]) => void;
}> = ({
  viewMode,
  setViewMode,
  query,
  selectedFacets,
  sortColumn,
  sortDirection,
  selectedEntries,
  total,
  tableColumns,
  onTableColumnsChange,
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

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
              selectedColumns={tableColumns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              selectedEntries={selectedEntries}
              totalNumberResults={total}
              onClose={() => setDisplayDownloadPanel(false)}
            />
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group">
        <BlastButton selectedEntries={selectedEntries} />
        <AlignButton selectedEntries={selectedEntries} />
        <Button
          variant="tertiary"
          onPointerOver={DownloadComponent.preload}
          onFocus={DownloadComponent.preload}
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </Button>
        <AddToBasketButton selectedEntries={selectedEntries} />
        <Button variant="tertiary">
          <StatisticsIcon />
          Statistics
        </Button>
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
          <span
            className={cn({
              'tertiary-icon__active': viewMode === ViewMode.CARD,
            })}
          >
            <TableIcon />
          </span>
          <span
            className={cn({
              'tertiary-icon__active': viewMode === ViewMode.TABLE,
            })}
          >
            <ListIcon />
          </span>
        </Button>
        {viewMode === ViewMode.TABLE && (
          <CustomiseButton
            tableColumns={tableColumns}
            onTableColumnsChange={onTableColumnsChange}
          />
        )}
      </div>
    </>
  );
};

export default ResultsButtons;
