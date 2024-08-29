import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Message } from 'franklin-sites';
import { Feature } from '@nightingale-elements/nightingale-track';
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

export type NightingaleViewRange = {
  'display-start': number;
  'display-end': number;
};

const withinWindow = (
  featureStart: number,
  featureEnd: number,
  nightingaleViewRange?: NightingaleViewRange
) =>
  nightingaleViewRange
    ? (nightingaleViewRange['display-start'] <= featureStart &&
        featureStart <= nightingaleViewRange['display-end']) ||
      (nightingaleViewRange['display-start'] <= featureEnd &&
        featureEnd <= nightingaleViewRange['display-end'])
    : true;

export type Column<T> = {
  id: string;
  label: ReactNode;
  render: (datum: T) => ReactNode;
  filter?: (datum: T, filterValue: string) => boolean;
  optionAccessor?: (datum: T) => string | number;
};

const OPTION_TYPES = new Set(['string', 'number']);

type Props<T extends Feature> = {
  data: T[];
  columns: Column<T>[];
  rowExtraContent?: (datum: T) => React.ReactNode;
  onRowClick?: (datum: T) => void;
  highlightedRow?: T;
  nightingaleViewRange?: NightingaleViewRange;
};

type ColumnsToSelectedFilter = Record<string, string | undefined>;

function TableFromData<T extends Feature>({
  data,
  columns,
  rowExtraContent,
  onRowClick,
  highlightedRow,
  nightingaleViewRange,
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
    <Table expandable>
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
        {filteredData.length ? (
          filteredData.map((datum, index) => (
            <Table.Row
              isOdd={Boolean(index % 2)}
              extraContent={rowExtraContent?.(datum)}
              key={datum.accession}
              onClick={() => onRowClick?.(datum)}
              className={cn({
                [styles.highlighted]:
                  highlightedRow?.accession === datum.accession,
                [styles.window]:
                  datum.start &&
                  datum.end &&
                  withinWindow(datum.start, datum.end, nightingaleViewRange),
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
              colSpan={columns.length + +(typeof rowExtraContent !== undefined)}
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
