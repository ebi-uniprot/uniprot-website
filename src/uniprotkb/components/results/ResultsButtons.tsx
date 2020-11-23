import React, { FC, lazy, useState, Suspense } from 'react';
import {
  DownloadIcon,
  StatisticsIcon,
  TableIcon,
  ListIcon,
  EditIcon,
} from 'franklin-sites';

import SlidingPanel, {
  Position,
} from '../../../shared/components/layouts/SlidingPanel';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';

import { SortDirection, SelectedFacet } from '../../types/resultsTypes';
import { SortableColumn } from '../../types/columnTypes';
import { ViewMode } from '../../../shared/components/results/ResultsContainer';
import { Namespace } from '../../../shared/types/namespaces';
import { AllColumns } from '../../../shared/config/defaultColumns';

const ResultsButtons: FC<{
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
  query: string;
  selectedFacets: SelectedFacet[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  selectedEntries: string[];
  total: number;
  tableColumns?: AllColumns | null;
  onTableColumnsChange: (columns: AllColumns) => void;
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
    () =>
      import(/* webpackChunkName: "download" */ '../download/DownloadContainer')
  );
  const CustomiseComponent = lazy(
    () =>
      import(
        /* webpackChunkName: "customise" */ '../../../shared/components/customise-table/CustomiseTable'
      )
  );

  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const [displayCustomisePanel, setDisplayCustomisePanel] = useState(false);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback>
          <SlidingPanel position={Position.left} yScrollable>
            <DownloadComponent
              query={query}
              selectedFacets={selectedFacets}
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
          <SlidingPanel position={Position.left} yScrollable>
            <CustomiseComponent
              namespace={Namespace.uniprotkb}
              selectedColumns={tableColumns}
              onSave={(columns: AllColumns) => {
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
        <button
          type="button"
          className="button tertiary"
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </button>
        <AddToBasketButton selectedEntries={selectedEntries} />
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
          <button
            type="button"
            className="button tertiary"
            onClick={() => setDisplayCustomisePanel(!displayCustomisePanel)}
          >
            <EditIcon />
            Customize data
          </button>
        )}
      </div>
    </>
  );
};

export default ResultsButtons;
