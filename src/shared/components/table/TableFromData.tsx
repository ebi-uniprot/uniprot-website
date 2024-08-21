import Table from './Table';

const TableHeaderFromData = ({ data, column }) => {
  // if (optionAccessor) { }
  return <th>{column.label}</th>;
};

const TableRowFromData = ({ datum, columns }) =>
  columns.map((column) => <td>{column.render({ datum })}</td>);

const filterDatum = (datum, columns) =>
  columns.every((column) => column.filter(datum));

const TableFromData = ({ data, columns, rowExtraContent }) => {
  return (
    <Table>
      <Table.Head toggleAll>
        {columns.map((column) => (
          <TableHeaderFromData data={data} column={column} />
        ))}
      </Table.Head>
      <Table.Body>
        {data
          // .filter((datum) => filterDatum(datum, columns))
          .map((datum, index) => (
            <Table.Row
              isOdd={index % 2}
              extraContent={rowExtraContent({ datum })}
            >
              <TableRowFromData datum={datum} columns={columns} />
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default TableFromData;
