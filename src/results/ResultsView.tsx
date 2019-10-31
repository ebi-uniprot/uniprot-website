import React from 'react';
import { DataTable, DataList } from 'franklin-sites';
import ColumnConfiguration from '../model/ColumnConfiguration';
import '../styles/alert.scss';
import '../styles/ResultsView.scss';
import { SelectedEntries, SortDirection } from './types/resultsTypes';
import UniProtCard from '../view/uniprotkb/components/UniProtCard';
import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import { ViewMode } from './state/resultsInitialState';
import ProteinSummary from '../view/uniprotkb/summary/ProteinSummary';
import { SortableColumn, Column } from '../model/types/ColumnTypes';

type ResultsTableProps = {
  results: UniProtkbAPIModel[];
  tableColumns: (Column | SortableColumn)[];
  selectedEntries: SelectedEntries;
  handleEntrySelection: (rowId: string) => void;
  handleHeaderClick: (column: SortableColumn) => void;
  handleCardClick: (accession: string) => void;
  handleLoadMoreRows: () => void;
  summaryAccession: string | null;
  totalNumberResults: number;
  sortColumn: SortableColumn;
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
  const columns = tableColumns.map(columnName => {
    const columnConfig = ColumnConfiguration.get(columnName);
    if (columnConfig) {
      return {
        label: columnConfig.label,
        name: columnName,
        render: (row: UniProtkbAPIModel) =>
          columnConfig.render(uniProtKbConverter(row)),
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
