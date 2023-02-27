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
  const onChange = jest.fn();
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
        onChange={onChange}
        onCancel={onCancel}
        namespace={Namespace.uniprotkb}
        isEntryPage={false}
        columns={selectedColumns}
      />
    );
    await waitFor(() => screen.getAllByRole('button'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { asFragment } = rendered;
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
