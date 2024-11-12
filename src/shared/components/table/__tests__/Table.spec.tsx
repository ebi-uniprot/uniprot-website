import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../__test-helpers__/customRender';

import Table from '../Table';

describe('Table component', () => {
  const getTable = (expandable: boolean) => (
    <Table expandable={expandable}>
      <Table.Head>
        <th>Name</th>
        <th>Age</th>
      </Table.Head>
      <Table.Body>
        <Table.Row key="alice" isOdd>
          <td>Alice</td>
          <td>25</td>
        </Table.Row>
        <Table.Row key="mark" isOdd={false}>
          <td>Mark</td>
          <td>30</td>
        </Table.Row>
        <Table.Row key="paul" isOdd>
          <td>Paul</td>
          <td>35</td>
        </Table.Row>
      </Table.Body>
    </Table>
  );
  it('should render with a working toggle button', async () => {
    Element.prototype.scrollIntoView = jest.fn();
    const { asFragment } = customRender(getTable(true));
    expect(asFragment()).toMatchSnapshot();
    const button = screen.getByRole('button', { name: /Expand/ });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(
      await screen.findByRole('button', { name: /Collapse/ })
    ).toBeInTheDocument();
  });

  it('should not render a toggle button if overriden', async () => {
    const { asFragment } = customRender(getTable(false));
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
