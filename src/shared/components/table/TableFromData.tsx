import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import { Message } from 'franklin-sites';
import {
  type HTMLAttributes,
  memo,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MIN_ROWS_TO_EXPAND } from './constants';
import styles from './styles/table.module.scss';
import Table from './Table';

const UNFILTERED_OPTION = 'All' as const;

export const VIRTUALIZE_ROW_THRESHOLD = 1000;
const VIRTUALIZE_ROW_OVERSCAN = 10;
const VIRTUALIZE_ESTIMATED_ROW_HEIGHT = 36;

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
  return (
    <th>
      {column.label}
      {options && options.size > 1 && (
        <>
          <br />
          <select
            style={{ width: 'fit-content' }}
            value={selectedValue}
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
    if (filterValue === undefined || !column.getValue) {
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
  virtualize?: boolean;
  virtualizerRef?: React.RefObject<Virtualizer<HTMLDivElement, Element> | null>;
  id?: string;
};

type ColumnsToSelectedFilter = Record<string, string | undefined>;

const collator = new Intl.Collator('en');

type TableFromDataRowProps<T> = {
  datum: T;
  isOdd: boolean;
  columns: TableFromDataColumn<T>[];
  rowExtraContent?: (datum: T) => React.ReactNode;
  rowId: string;
  isMarkedBackground: boolean;
  isMarkedBorder: boolean;
  onClick?: (datum: T, expanded: boolean) => void;
};

function TableFromDataRowComponent<T>({
  datum,
  isOdd,
  columns,
  rowExtraContent,
  rowId,
  isMarkedBackground,
  isMarkedBorder,
  onClick,
}: TableFromDataRowProps<T>) {
  const handleClick = useCallback(
    (expanded: boolean) => onClick?.(datum, expanded),
    [datum, onClick]
  );

  return (
    <Table.Row
      isOdd={isOdd}
      extraContent={
        rowExtraContent && (
          <td colSpan={columns.length}>{rowExtraContent(datum)}</td>
        )
      }
      onClick={handleClick}
      className={cn({
        [styles['mark-background']]: isMarkedBackground,
        [styles['mark-border']]: isMarkedBorder,
      })}
      data-id={rowId}
    >
      {columns.map((column) => (
        <td key={column.id}>{column.render(datum)}</td>
      ))}
    </Table.Row>
  );
}

// React.memo with a generic component requires the cast to preserve the type
// signature. Memoising the row is the main win for large non-virtualized
// tables: only rows whose props actually changed (e.g. the previously- and
// newly-highlighted row) re-render, instead of the whole list.
const TableFromDataRow = memo(
  TableFromDataRowComponent
) as typeof TableFromDataRowComponent;

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
  virtualize = false,
  virtualizerRef,
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

  const containerRef = useRef<HTMLDivElement>(null);

  // Virtualization is opt-in and only kicks in once the data exceeds the
  // threshold; below that the cost of virtualization (extra DOM, measurement)
  // outweighs the benefit and the original rendering path is used.
  const shouldVirtualize =
    virtualize && filteredData.length > VIRTUALIZE_ROW_THRESHOLD;

  const virtualizer = useVirtualizer({
    count: shouldVirtualize ? filteredData.length : 0,
    getScrollElement: () => containerRef.current,
    estimateSize: () => VIRTUALIZE_ESTIMATED_ROW_HEIGHT,
    overscan: VIRTUALIZE_ROW_OVERSCAN,
    // Match the per-row `data-index` attribute used by `measureElement`.
    indexAttribute: 'data-index',
  });

  // Forward the virtualizer instance to the parent via ref. Used by the
  // scroll-to-row hook to jump to rows that aren't currently mounted.
  useEffect(() => {
    if (virtualizerRef) {
      virtualizerRef.current = shouldVirtualize ? virtualizer : null;
    }
  }, [shouldVirtualize, virtualizer, virtualizerRef]);

  if (shouldVirtualize) {
    const virtualItems = virtualizer.getVirtualItems();
    const totalSize = virtualizer.getTotalSize();
    const topPadding = virtualItems[0]?.start ?? 0;
    const bottomPadding =
      totalSize - (virtualItems[virtualItems.length - 1]?.end ?? 0);
    const spacerColSpan = columns.length + (rowExtraContent ? 1 : 0);

    // One <tbody> per logical row (multiple tbodies in a single <table> is
    // valid HTML). Required because Table.Row outputs both a main <tr> and an
    // optional expanded extra-content <tr>; wrapping each pair in its own
    // tbody lets the virtualizer measure the combined height with a single
    // ResizeObserver and reflow following rows when the user expands one.
    return (
      <Table virtualize containerRef={containerRef} {...props}>
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
        {topPadding > 0 && (
          <tbody aria-hidden="true" className={styles['virtual-spacer']}>
            <tr style={{ height: topPadding }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td colSpan={spacerColSpan} />
            </tr>
          </tbody>
        )}
        {virtualItems.map((virtualItem) => {
          const datum = filteredData[virtualItem.index];
          const rowId = getRowId(datum);
          return (
            <tbody
              key={rowId}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              translate={noTranslateBody ? 'no' : undefined}
            >
              <TableFromDataRow
                datum={datum}
                isOdd={virtualItem.index % 2 === 1}
                columns={columns}
                rowExtraContent={rowExtraContent}
                rowId={rowId}
                isMarkedBackground={Boolean(markBackground?.(datum))}
                isMarkedBorder={Boolean(markBorder?.(datum))}
                onClick={onRowClick}
              />
            </tbody>
          );
        })}
        {bottomPadding > 0 && (
          <tbody aria-hidden="true" className={styles['virtual-spacer']}>
            <tr style={{ height: bottomPadding }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td colSpan={spacerColSpan} />
            </tr>
          </tbody>
        )}
      </Table>
    );
  }

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
          filteredData.map((datum, index) => {
            const rowId = getRowId(datum);
            return (
              <TableFromDataRow
                key={rowId}
                datum={datum}
                isOdd={index % 2 === 1}
                columns={columns}
                rowExtraContent={rowExtraContent}
                rowId={rowId}
                isMarkedBackground={Boolean(markBackground?.(datum))}
                isMarkedBorder={Boolean(markBorder?.(datum))}
                onClick={onRowClick}
              />
            );
          })
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
