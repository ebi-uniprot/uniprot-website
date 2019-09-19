import React from 'react';
import { DataTable, DataList } from 'franklin-sites';
import ColumnConfiguration from '../model/ColumnConfiguration';
import '../styles/alert.scss';
import '../styles/ResultsView.scss';
import { SelectedEntries, SortDirection } from './types/resultsTypes';
import UniProtCard from '../view/uniprotkb/components/UniProtCard';
import { UniProtkbAPIModel } from '../model/uniprotkb/UniProtkbConverter';
import { ViewMode } from './state/resultsInitialState';
import ProteinSummary from '../view/uniprotkb/summary/ProteinSummary';
import ColumnId from '../model/types/columnIdTypes';

type ResultsTableProps = {
  results: UniProtkbAPIModel[];
  tableColumns: ColumnId[];
  selectedEntries: SelectedEntries;
  handleEntrySelection: (rowId: string) => void;
  handleHeaderClick: (column: ColumnId) => void;
  handleCardClick: (accession: string) => void;
  handleLoadMoreRows: () => void;
  summaryAccession: string | null;
  totalNumberResults: number;
  sortColumn: ColumnId;
  sortDirection: SortDirection;
  viewMode: ViewMode;
};

const ResultsView: React.FC<ResultsTableProps> = ({
  results = [],
  totalNumberResults,
  tableColumns,
  selectedEntries,
  handleEntrySelection,
  handleLoadMoreRows,
  handleHeaderClick,
  handleCardClick,
  sortColumn,
  sortDirection,
  viewMode,
  summaryAccession,
}) => {
  const columns = tableColumns.map(columnName => {
    const columnConfig = ColumnConfiguration.get(columnName);
    if (columnConfig) {
      return {
        label: columnConfig.label,
        name: columnName,
        render: (row: UniProtkbAPIModel) => columnConfig.render(row),
        sortable: columnConfig.sortable,
        sorted: columnName === sortColumn && sortDirection,
      };
    }
    return {
      label: columnName,
      name: columnName,
      render: () => (
        <div className="warning">{`${columnName} has no config`}</div>
      ),
      sortable: false,
      sorted: false,
    };
  });
  const hasMoreData = totalNumberResults > results.length;
  if (viewMode === ViewMode.CARD) {
    return (
      <div className="datalist">
        <div className="datalist__column">
          <DataList
            idKey="primaryAccession"
            data={results}
            selectable
            selected={selectedEntries}
            onSelect={handleEntrySelection}
            dataRenderer={(dataItem: UniProtkbAPIModel) => (
              <UniProtCard data={dataItem} />
            )}
            onLoadMoreItems={handleLoadMoreRows}
            onCardClick={handleCardClick}
            hasMoreData={hasMoreData}
          />
        </div>
        <div className="datalist__column">
          {summaryAccession && <ProteinSummary accession={summaryAccession} />}
        </div>
      </div>
    );
  } // viewMode === ViewMode.TABLE
  return (
    <DataTable
      idKey="primaryAccession"
      columns={columns}
      data={results}
      selectable
      selected={selectedEntries}
      onSelect={handleEntrySelection}
      onHeaderClick={handleHeaderClick}
      onLoadMoreItems={handleLoadMoreRows}
      hasMoreData={hasMoreData}
    />
  );
};

export default ResultsView;
