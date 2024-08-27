import { useCallback, useMemo, useReducer } from 'react';
import cn from 'classnames';

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
  columns.map((column) => <td key={column.id}>{column.render(datum)}</td>);

const filterDatum = (datum, columns, filterValues) =>
  columns.every((column) =>
    filterValues[column.id]
      ? column.filter(datum, filterValues[column.id])
      : true
  );

const withinWindow = (trackWindow, featureStart, featureEnd) =>
  trackWindow
    ? (trackWindow['display-start'] <= featureStart &&
        featureStart <= trackWindow['display-end']) ||
      (trackWindow['display-start'] <= featureEnd &&
        featureEnd <= trackWindow['display-end'])
    : true;

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
  coordinates,
}) => {
  // TODO: just useState instead
  const [state, dispatch] = useReducer(reducer, { filters: {} });
  const columnIdToFilterOptions = useMemo(() => {
    const columnIdToFilterOptions = {};
    for (const column of columns) {
      if (column.filter) {
        columnIdToFilterOptions[column.id] = new Set(
          data.map((datum) => (column.optionAccessor || column.render)(datum))
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
            extraContent={rowExtraContent(datum)}
            key={index}
            onClick={() => onRowClick(datum)}
            className={cn({
              [styles.highlighted]: highlightedFeature === datum.accession,
              [styles.window]: withinWindow(
                coordinates,
                datum.start,
                datum.end
              ),
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
