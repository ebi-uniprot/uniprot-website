import {
  fireEvent,
  waitFor,
  screen,
  render,
  RenderResult,
} from '@testing-library/react';

import CustomiseTable from '../CustomiseTable';

import '../../../../uniprotkb/components/__mocks__/mockApi';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import { Namespace } from '../../../types/namespaces';

describe('CustomiseTable component', () => {
  let rendered: RenderResult;
  const onSubmit = jest.fn();
  const onReset = jest.fn();
  const onColumnChange = jest.fn();
  const onCancel = jest.fn();
  const selectedColumns = [
    UniProtKBColumn.accession,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.proteinExistence,
  ];

  beforeEach(async () => {
    rendered = render(
      <CustomiseTable
        onSubmit={onSubmit}
        onReset={onReset}
        onColumnChange={onColumnChange}
        onCancel={onCancel}
        namespace={Namespace.uniprotkb}
        isEntryPage={false}
        columns={selectedColumns}
      />
    );
    await waitFor(() => screen.getAllByRole('button'));
    // wait for the drag and drop library to have instantiated itself
    await waitFor(() => screen.getByRole('status'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { asFragment, container } = rendered;

    // Remove DndKit dynamic accessibility nodes which inconsistently appear/disappear from the snapshot
    const dndNodes = container.querySelectorAll(
      '[id^="DndDescribedBy"], [id^="DndLiveRegion"]'
    );
    dndNodes.forEach((node) => node.parentElement?.removeChild(node));

    expect(asFragment()).toMatchSnapshot();
  });

  it('should find selected chip', () => {
    const selectionChip = screen.getByRole('button', {
      name: 'Protein names',
      hidden: false,
    });
    expect(selectionChip).toBeInTheDocument();
  });

  it('should call onCancel prop when Cancel button is pressed', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalled();
  });
});
