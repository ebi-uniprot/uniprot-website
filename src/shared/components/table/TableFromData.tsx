import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Message } from 'franklin-sites';
import cn from 'classnames';

import Table from './Table';

import styles from './styles/table.module.scss';

const UNFILTERED_OPTION = 'All' as const;
const MIN_ROWS_TO_EXPAND = 10 as const;

type TableHeaderFromDataProps<T> = {
  column: TableFromDataColumn<T>;
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
      {options && options.size > 1 && (
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
  columns: TableFromDataColumn<T>[],
  filterValues: ColumnsToSelectedFilter
) {
  return columns.every((column) => {
    const filterValue = filterValues[column.id];
    return typeof filterValue !== 'undefined' && column.filter
      ? column.filter(datum, filterValue)
      : true;
  });
}

export type TableFromDataColumn<T> = {
  id: string;
  label: ReactNode;
  render: (datum: T) => ReactNode;
  filter?: (datum: T, filterValue: string) => boolean;
  getOption?: (datum: T) => string | number;
};

const OPTION_TYPES = new Set(['string', 'number']);

type Props<T> = {
  data: T[];
  columns: TableFromDataColumn<T>[];
  rowExtraContent?: (datum: T) => React.ReactNode;
  getRowId: (datum: T) => string;
  onRowClick?: (datum: T) => void;
  markBackground?: (datum: T) => boolean;
  markBorder?: (datum: T) => boolean;
  noTranslateBody?: boolean;
  expandable?: boolean;
};

type ColumnsToSelectedFilter = Record<string, string | undefined>;

function TableFromData<T>({
  data,
  columns,
  rowExtraContent,
  onRowClick,
  getRowId,
  markBackground,
  markBorder,
  noTranslateBody,
  expandable = true,
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
              const r = (column.getOption || column.render)(datum);
              return OPTION_TYPES.has(typeof r) ? r : null;
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
    <Table expandable={expandable && data.length > MIN_ROWS_TO_EXPAND}>
      <Table.Head toggleAll={Boolean(rowExtraContent)}>
        {columns.map((column) => (
          <TableHeaderFromData
            column={column}
            key={column.id}
            options={columnIdToFilterOptions[column.id]}
            onFilterChange={handleFilterChange}
          />
        ))}
      </Table.Head>
      <Table.Body translate={noTranslateBody ? 'no' : undefined}>
        {filteredData.length ? (
          filteredData.map((datum, index) => (
            <Table.Row
              isOdd={index % 2 === 1}
              extraContent={
                rowExtraContent && (
                  <td colSpan={columns.length}>{rowExtraContent(datum)}</td>
                )
              }
              key={getRowId(datum)}
              onClick={() => onRowClick?.(datum)}
              className={cn({
                [styles['mark-background']]: markBackground?.(datum),
                [styles['mark-border']]: markBorder?.(datum),
              })}
            >
              {columns.map((column) => (
                <td key={column.id}>{column.render(datum)}</td>
              ))}
            </Table.Row>
          ))
        ) : (
          <tr>
            <td
              colSpan={
                columns.length + +(typeof rowExtraContent !== 'undefined')
              }
            >
              <Message level="warning" className={styles['message--no-data']}>
                No data matches selected filters
              </Message>
            </td>
          </tr>
        )}
      </Table.Body>
    </Table>
  );
}

export default TableFromData;
