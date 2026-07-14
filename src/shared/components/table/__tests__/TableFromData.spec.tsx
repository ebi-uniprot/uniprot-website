import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';
import TableFromData, {
  type TableFromDataColumn,
  VIRTUALIZE_ROW_THRESHOLD,
} from '../TableFromData';

type Row = { id: string; name: string; age: number };

const columns: TableFromDataColumn<Row>[] = [
  { id: 'name', label: 'Name', render: (d) => d.name },
  { id: 'age', label: 'Age', render: (d) => d.age },
];

const makeRows = (n: number): Row[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `r${i}`,
    name: `name-${i}`,
    age: i,
  }));

describe('TableFromData', () => {
  it('renders the non-virtualized branch when virtualize is not set', () => {
    customRender(
      <TableFromData
        columns={columns}
        data={makeRows(5)}
        getRowId={(d) => d.id}
      />
    );
    // All five rows in the DOM since we're not virtualizing.
    expect(screen.getByText('name-0')).toBeInTheDocument();
    expect(screen.getByText('name-4')).toBeInTheDocument();
  });

  it('renders the non-virtualized branch when row count is below threshold even with virtualize=true', () => {
    customRender(
      <TableFromData
        virtualize
        columns={columns}
        data={makeRows(VIRTUALIZE_ROW_THRESHOLD)}
        getRowId={(d) => d.id}
      />
    );
    // At or below the threshold, virtualization is not engaged.
    // The bounded scroll container (.virtualize-container) should NOT be present.
    expect(
      document.querySelector('[class*="virtualize-container"]')
    ).toBeNull();
    expect(screen.getByText('name-0')).toBeInTheDocument();
  });

  it('engages virtualized rendering above the threshold', () => {
    const data = makeRows(VIRTUALIZE_ROW_THRESHOLD + 1);
    customRender(
      <TableFromData
        virtualize
        columns={columns}
        data={data}
        getRowId={(d) => d.id}
        rowExtraContent={(d) => <span>extra-{d.id}</span>}
      />
    );
    // Virtualize container is present.
    const container = document.querySelector('[class*="virtualize-container"]');
    expect(container).not.toBeNull();
  });

  it('filters rows in the non-virtualized branch', () => {
    const filterColumns: TableFromDataColumn<Row>[] = [
      { id: 'age', label: 'Age', render: (d) => d.age },
      {
        id: 'name-filter',
        label: 'Name',
        render: (d) => d.name,
        getValue: (d) => d.name,
      },
    ];
    customRender(
      <TableFromData
        columns={filterColumns}
        data={makeRows(3)}
        getRowId={(d) => d.id}
      />
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'name-1' } });
    // After filtering, only one body row should remain.
    const bodyRows = document.querySelectorAll('tbody tr');
    expect(bodyRows).toHaveLength(1);
    expect(bodyRows[0]).toHaveTextContent('name-1');
  });

  it('filters rows while virtualization is engaged', () => {
    // Above the threshold so virtualization engages, but the filter column has
    // only two distinct values. Selecting the rare one drops the result below
    // the threshold, so it falls back to the non-virtualized branch and the
    // single matching row is rendered.
    const filterColumns: TableFromDataColumn<Row>[] = [
      { id: 'name', label: 'Name', render: (d) => d.name },
      {
        id: 'parity',
        label: 'Parity',
        render: (d) => d.name,
        getValue: (d) => (d.age === 0 ? 'first' : 'rest'),
      },
    ];
    customRender(
      <TableFromData
        virtualize
        columns={filterColumns}
        data={makeRows(VIRTUALIZE_ROW_THRESHOLD + 1)}
        getRowId={(d) => d.id}
      />
    );
    // Initially virtualized: the bounded scroll container is present.
    expect(
      document.querySelector('[class*="virtualize-container"]')
    ).not.toBeNull();

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'first' } });

    // Only the single 'first' row matches → below threshold → non-virtualized.
    expect(
      document.querySelector('[class*="virtualize-container"]')
    ).toBeNull();
    const bodyRows = document.querySelectorAll('tbody tr');
    expect(bodyRows).toHaveLength(1);
    expect(bodyRows[0]).toHaveTextContent('name-0');
  });

  it('shows a no-data message when filters exclude all rows', () => {
    const filterColumns: TableFromDataColumn<Row>[] = [
      ...columns,
      {
        id: 'name-filter',
        label: 'Name',
        render: (d) => d.name,
        getValue: (d) => d.name,
      },
    ];
    customRender(
      <TableFromData
        columns={filterColumns}
        data={makeRows(3)}
        getRowId={(d) => d.id}
      />
    );
    const select = screen.getByRole('combobox');
    // Select a value that no row matches so every row is filtered out.
    fireEvent.change(select, { target: { value: 'no-such-name' } });
    expect(
      screen.getByText(/No data matches selected filters/i)
    ).toBeInTheDocument();
  });
});
