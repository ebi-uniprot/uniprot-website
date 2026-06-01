import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import { Message } from 'franklin-sites';
import {
  type HTMLAttributes,
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

export const VIRTUALIZE_ROW_THRESHOLD = 200;
const VIRTUALIZE_ROW_OVERSCAN = 10;
const VIRTUALIZE_ESTIMATED_ROW_HEIGHT = 36;

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
      if (column.filter) {
        columnIdToFilterOptions[column.id] = new Set(
          data
            .map((datum) => {
              const r = (column.getOption || column.render)(datum);
              return OPTION_TYPES.has(typeof r) ? r : null;
            })
            .filter((datum): datum is string => datum !== null)
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
          return (
            <tbody
              key={getRowId(datum)}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              translate={noTranslateBody ? 'no' : undefined}
            >
              <Table.Row
                isOdd={virtualItem.index % 2 === 1}
                extraContent={
                  rowExtraContent && (
                    <td colSpan={columns.length}>{rowExtraContent(datum)}</td>
                  )
                }
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
