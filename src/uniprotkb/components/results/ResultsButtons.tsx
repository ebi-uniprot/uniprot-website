import React, { FC, lazy, useState, Suspense } from 'react';
import {
  DownloadIcon,
  BasketIcon,
  StatisticsIcon,
  TableIcon,
  ListIcon,
  EditIcon,
} from 'franklin-sites';
import { Link } from 'react-router-dom';
import { ViewMode } from '../../state/resultsInitialState';
import { SortDirection, SelectedFacet } from '../../types/resultsTypes';
import { SortableColumn } from '../../types/columnTypes';
import SidePanel from '../../../shared/components/layouts/SidePanel';

const ResultsButtons: FC<{
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  query: string;
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  selectedEntries: string[];
  total: number;
}> = ({
  viewMode,
  setViewMode,
  query,
  selectedFacets,
  sortColumn,
  sortDirection,
  selectedEntries,
  total,
}) => {
  const DownloadComponent = lazy(() =>
    import(/* webpackChunkName: "download" */ '../download/DownloadContainer')
  );

  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback>
          <SidePanel>
            <DownloadComponent
              query={query}
              selectedFacets={selectedFacets}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              selectedEntries={selectedEntries}
              totalNumberResults={total}
              onClose={() => setDisplayDownloadPanel(false)}
            />
          </SidePanel>
        </Suspense>
      )}
      <div className="button-group">
        <button
          type="button"
          className="button tertiary"
          disabled={selectedEntries.length !== 1}
        >
          Blast
        </button>
        <button
          type="button"
          className="button tertiary"
          disabled={selectedEntries.length <= 1}
        >
          Align
        </button>
        <button
          type="button"
          className="button tertiary"
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </button>
        <button
          type="button"
          className="button tertiary"
          disabled={selectedEntries.length <= 0}
        >
          <BasketIcon />
          Add
        </button>
        <button type="button" className="button tertiary">
          <StatisticsIcon />
          Statistics
        </button>
        <button
          type="button"
          className="button tertiary large-icon"
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
        </button>
        {viewMode === ViewMode.TABLE && (
          <Link to="/customise-table">
            <button type="button" className="button tertiary">
              <EditIcon />
              Customize data
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default ResultsButtons;
