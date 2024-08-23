import cn from 'classnames';
import { useCallback, useMemo, useReducer } from 'react';
import Table from './Table';

import styles from './styles/table.module.scss';

const AllFilterOption = 'All' as const;

const TableHeaderFromData = ({ column, options, onFilterChange }) => (
  <th>
    {column.label}
    {options && (
      <>
        <br />
        <select
          style={{ width: 'fit-content' }}
          onChange={(e) => onFilterChange(column.id, e.target.value)}
        >
          {[AllFilterOption, ...options].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </>
    )}
  </th>
);

const TableRowFromData = ({ datum, columns }) =>
  columns.map((column) => (
    <td key={column.id}>{column.render({ data: datum })}</td>
  ));

const filterDatum = (datum, columns, filterValues) =>
  columns.every((column) =>
    filterValues[column.id]
      ? column.filter({ data: datum, input: filterValues[column.id] })
      : true
  );

type ActionType = 'FILTER_SELECT';

const reducer = (state, action) => {
  if (action.type === 'FILTER_SELECT') {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.columnId]:
          action.value === AllFilterOption ? undefined : action.value,
      },
    };
  }
};

const TableFromData = ({
  data,
  columns,
  rowExtraContent,
  onRowClick,
  highlightedFeature,
}) => {
  const [state, dispatch] = useReducer(reducer, { filters: {} });
  const columnIdToFilterOptions = useMemo(() => {
    const columnIdToFilterOptions = {};
    for (const column of columns) {
      if (column.filter) {
        columnIdToFilterOptions[column.id] = new Set(
          data.map(
            (datum) =>
              column.optionAccessor?.({ data: datum }) ||
              column.render({ data: datum })
          )
        );
      }
    }
    return columnIdToFilterOptions;
  }, [columns, data]);

  const handleFilterChange = useCallback((columnId, value) => {
    dispatch({ type: 'FILTER_SELECT', columnId, value });
  }, []);

  const filteredData = useMemo(
    () => data.filter((datum) => filterDatum(datum, columns, state.filters)),
    [columns, data, state.filters]
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
            isOdd={index % 2}
            extraContent={rowExtraContent({ data: datum })}
            key={index}
            onClick={() => onRowClick(datum)}
            className={cn({
              [styles.highlighted]: highlightedFeature === datum.accession,
            })}
          >
            <TableRowFromData datum={datum} columns={columns} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableFromData;
