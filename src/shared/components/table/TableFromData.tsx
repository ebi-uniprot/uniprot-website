import { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';

import Table from './Table';

import styles from './styles/table.module.scss';

const UNFILTERED_OPTION = 'All' as const;

type TableHeaderFromDataProps<T> = {
  column: Column<T>;
  options?: Set<string>;
  onFilterChange: (columnId: string, filterValue: string) => void;
};
function TableHeaderFromData<T>({
  column,
  options,
  onFilterChange,
}: TableHeaderFromDataProps<T>) {
  return (
    <th>
      {column.label}
      {options && (
        <>
          <br />
          <select
            style={{ width: 'fit-content' }}
            onChange={(e) => onFilterChange(column.id, e.target.value)}
          >
            {[UNFILTERED_OPTION, ...options].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      )}
    </th>
  );
}

function filterDatum<T>(
  datum: T,
  columns: Column<T>[],
  filterValues: ColumnsToSelectedFilter
) {
  return columns.every((column) => {
    const filterValue = filterValues[column.id];
    return typeof filterValue !== 'undefined' && column.filter
      ? column.filter(datum, filterValue)
      : true;
  });
}

type WindowRange = { 'display-start': number; 'display-end': number };

const withinWindow = (
  featureStart: number,
  featureEnd: number,
  windowRange?: WindowRange
) =>
  windowRange
    ? (windowRange['display-start'] <= featureStart &&
        featureStart <= windowRange['display-end']) ||
      (windowRange['display-start'] <= featureEnd &&
        featureEnd <= windowRange['display-end'])
    : true;

type Column<T> = {
  id: string;
  label: string;
  render: (datum: T) => React.ReactNode;
  filter?: (datum: T, filterValue: string) => boolean;
  optionAccessor?: (datum: T) => string;
};

type Datum = {
  start: number;
  end: number;
  accession: string;
};

type Props<T extends Datum> = {
  data: T[];
  columns: Column<T>[];
  rowExtraContent?: (datum: T) => React.ReactNode;
  onRowClick?: (datum: T) => void;
  highlightedRow?: T;
  windowRange?: WindowRange;
};

type ColumnsToSelectedFilter = Record<string, string | undefined>;

function TableFromData<T extends Datum>({
  data,
  columns,
  rowExtraContent,
  onRowClick,
  highlightedRow,
  windowRange,
}: Props<T>) {
  const [columnsToSelectedOption, setColumnsToSelectedOption] =
    useState<ColumnsToSelectedFilter>({});
  const columnIdToFilterOptions = useMemo(() => {
    const columnIdToFilterOptions: Record<string, Set<string>> = {};
    for (const column of columns) {
      if (column.filter) {
        columnIdToFilterOptions[column.id] = new Set(
          data
            .map((datum) => {
              const r = (column.optionAccessor || column.render)(datum);
              return typeof r === 'string' ? r : null;
            })
            .filter((datum): datum is string => datum !== null)
        );
      }
    }
    return columnIdToFilterOptions;
  }, [columns, data]);

  const handleFilterChange = useCallback(
    (columnId: string, value: string) => {
      setColumnsToSelectedOption((f) => ({
        ...f,
        [columnId]: value === UNFILTERED_OPTION ? undefined : value,
      }));
    },
    [setColumnsToSelectedOption]
  );

  const filteredData = useMemo(
    () =>
      data.filter((datum) =>
        filterDatum(datum, columns, columnsToSelectedOption)
      ),
    [columns, data, columnsToSelectedOption]
  );

  return (
    <Table>
      <Table.Head toggleAll>
        {columns.map((column) => (
          <TableHeaderFromData
            column={column}
            key={column.id}
            options={columnIdToFilterOptions[column.id]}
            onFilterChange={handleFilterChange}
          />
        ))}
      </Table.Head>
      <Table.Body>
        {filteredData.map((datum, index) => (
          <Table.Row
            isOdd={Boolean(index % 2)}
            extraContent={rowExtraContent?.(datum)}
            key={datum.accession}
            onClick={() => onRowClick?.(datum)}
            className={cn({
              [styles.highlighted]:
                highlightedRow?.accession === datum.accession,
              [styles.window]: withinWindow(
                datum.start,
                datum.end,
                windowRange
              ),
            })}
          >
            {columns.map((column) => (
              <td key={column.id}>{column.render(datum)}</td>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

export default TableFromData;
