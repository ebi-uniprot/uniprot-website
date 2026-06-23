import cn from 'classnames';
import { Message } from 'franklin-sites';
import {
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { MIN_ROWS_TO_EXPAND } from './constants';
import styles from './styles/table.module.scss';
import Table from './Table';

const UNFILTERED_OPTION = 'All' as const;

type TableHeaderFromDataProps<T> = {
  column: TableFromDataColumn<T>;
  options?: Set<string>;
  selectedValue: string;
  onFilterChange: (columnId: string, filterValue: string) => void;
};
function TableHeaderFromData<T>({
  column,
  options,
  selectedValue,
  onFilterChange,
}: TableHeaderFromDataProps<T>) {
  const filterChoices = column.filterOptions
    ? column.filterOptions.map((option) => option.label)
    : options && options.size > 1
      ? [...options]
      : undefined;
  return (
    <th>
      {column.label}
      {filterChoices && (
        <>
          <br />
          <select
            style={{ width: 'fit-content' }}
            value={selectedValue}
            onChange={(e) => onFilterChange(column.id, e.target.value)}
          >
            {[UNFILTERED_OPTION, ...filterChoices].map((option) => (
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

function getCellString<T>(
  column: TableFromDataColumn<T>,
  datum: T
): string | undefined {
  if (!column.getValue) {
    return undefined;
  }
  const v = column.getValue(datum);
  if (v === null || v === undefined) {
    return undefined;
  }
  return String(v);
}

function filterDatum<T>(
  datum: T,
  columns: TableFromDataColumn<T>[],
  filterValues: ColumnsToSelectedFilter
): boolean {
  return columns.every((column) => {
    const filterValue = filterValues[column.id];
    if (filterValue === undefined) {
      return true;
    }
    if (column.filterOptions) {
      const option = column.filterOptions.find((o) => o.label === filterValue);
      return option?.predicate(datum) ?? true;
    }
    if (!column.getValue) {
      return true;
    }
    return getCellString(column, datum) === filterValue;
  });
}

export type TableFromDataColumn<T> = {
  id: string;
  label: ReactNode;
  render: (datum: T) => ReactNode;
  getValue?: (datum: T) => string | number | null | undefined;
  filterOptions?: { label: string; predicate: (datum: T) => boolean }[];
};

type Props<T> = HTMLAttributes<HTMLTableElement> & {
  data: T[];
  columns: TableFromDataColumn<T>[];
  rowExtraContent?: (datum: T) => React.ReactNode;
  getRowId: (datum: T) => string;
  onRowClick?: (datum: T, expanded: boolean) => void;
  markBackground?: (datum: T) => boolean;
  markBorder?: (datum: T) => boolean;
  noTranslateBody?: boolean;
  expandable?: boolean;
  id?: string;
};

type ColumnsToSelectedFilter = Record<string, string | undefined>;

const collator = new Intl.Collator('en');

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
  ...props
}: Props<T>) {
  const [columnsToSelectedOption, setColumnsToSelectedOption] =
    useState<ColumnsToSelectedFilter>({});
  const columnIdToFilterOptions = useMemo(() => {
    const columnIdToFilterOptions: Record<string, Set<string>> = {};
    for (const column of columns) {
      if (column.getValue) {
        columnIdToFilterOptions[column.id] = new Set(
          data
            .flatMap((datum) => {
              const v = getCellString(column, datum);
              return v === undefined ? [] : [v];
            })
            .sort(collator.compare)
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
    <Table
      expandable={expandable && data.length > MIN_ROWS_TO_EXPAND}
      {...props}
    >
      <Table.Head toggleAll={Boolean(rowExtraContent)}>
        {columns.map((column) => (
          <TableHeaderFromData
            column={column}
            key={column.id}
            options={columnIdToFilterOptions[column.id]}
            selectedValue={
              columnsToSelectedOption[column.id] ?? UNFILTERED_OPTION
            }
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
              onClick={(expanded: boolean) => onRowClick?.(datum, expanded)}
              className={cn({
                [styles['mark-background']]: markBackground?.(datum),
                [styles['mark-border']]: markBorder?.(datum),
              })}
              data-id={getRowId(datum)}
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
