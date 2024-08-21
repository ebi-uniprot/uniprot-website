import Table from './Table';

const TableHeaderFromData = ({ data, column }) => (
  <th>{typeof column.label === 'function' ? column.label() : column.label}</th>
);

const TableRowFromData = ({ datum, columns }) =>
  columns.map((column) => (
    <td key={column.id}>{column.render({ data: datum })}</td>
  ));

const filterDatum = (datum, columns) =>
  columns.every((column) => column.filter(datum));

const TableFromData = ({ data, columns, rowExtraContent }) => {
  return (
    <Table>
      <Table.Head toggleAll>
        {columns.map((column) => (
          <TableHeaderFromData data={data} column={column} key={column.id} />
        ))}
      </Table.Head>
      <Table.Body>
        {data
          // .filter((datum) => filterDatum(datum, columns))
          .map((datum, index) => (
            <Table.Row
              isOdd={index % 2}
              extraContent={rowExtraContent({ data: datum })}
              key={index}
            >
              <TableRowFromData datum={datum} columns={columns} />
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default TableFromData;
