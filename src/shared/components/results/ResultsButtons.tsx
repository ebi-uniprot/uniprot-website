import { FC, lazy, useState, Suspense } from 'react';
import {
  DownloadIcon,
  StatisticsIcon,
  TableIcon,
  ListIcon,
  EditIcon,
  Button,
} from 'franklin-sites';

import SlidingPanel, { Position } from '../layouts/SlidingPanel';
import BlastButton from '../action-buttons/Blast';
import AlignButton from '../action-buttons/Align';
import AddToBasketButton from '../action-buttons/AddToBasket';

import {
  SortDirection,
  SelectedFacet,
} from '../../../uniprotkb/types/resultsTypes';
import { SortableColumn } from '../../../uniprotkb/types/columnTypes';
import { ViewMode } from './ResultsContainer';
import { Column } from '../../config/columns';

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
  const DownloadComponent = lazy(
    () => import(/* webpackChunkName: "download" */ '../download/Download')
  );
  const CustomiseComponent = lazy(
    () =>
      import(
        /* webpackChunkName: "customise" */ '../customise-table/CustomiseTable'
      )
  );

  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const [displayCustomisePanel, setDisplayCustomisePanel] = useState(false);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback>
          <SlidingPanel
            position={Position.left}
            yScrollable
            onClickOutside={() => setDisplayDownloadPanel(false)}
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
      {displayCustomisePanel && (
        <Suspense fallback>
          <SlidingPanel
            position={Position.left}
            yScrollable
            onClickOutside={() => setDisplayCustomisePanel(false)}
          >
            <CustomiseComponent
              selectedColumns={tableColumns}
              onSave={(columns: Column[]) => {
                onTableColumnsChange(columns);
                setDisplayCustomisePanel(false);
              }}
            />
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group">
        <BlastButton selectedEntries={selectedEntries} />
        <AlignButton selectedEntries={selectedEntries} />
        <Button
          type="button"
          variant="tertiary"
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </Button>
        <AddToBasketButton selectedEntries={selectedEntries} />
        <Button type="button" variant="tertiary">
          <StatisticsIcon />
          Statistics
        </Button>
        <Button
          type="button"
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
            className={
              viewMode === ViewMode.CARD ? 'tertiary-icon__active' : ''
            }
          >
            <TableIcon />
          </span>
          <span
            className={
              viewMode === ViewMode.TABLE ? 'tertiary-icon__active' : ''
            }
          >
            <ListIcon />
          </span>
        </Button>
        {viewMode === ViewMode.TABLE && (
          <Button
            type="button"
            variant="tertiary"
            onClick={() => setDisplayCustomisePanel(!displayCustomisePanel)}
          >
            <EditIcon />
            Customize data
          </Button>
        )}
      </div>
    </>
  );
};

export default ResultsButtons;
