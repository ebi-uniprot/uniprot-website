import { fireEvent, render, RenderResult } from '@testing-library/react';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import ColumnSelectDragDrop, {
  ColumnSelectDragDropProps,
} from '../ColumnSelectDragDrop';

describe('ColumnSelectDragDrop component', () => {
  let props: ColumnSelectDragDropProps;
  let rendered: RenderResult;
  beforeEach(async () => {
    props = {
      columns: [
        { id: UniProtKBColumn.id, label: 'Entry Name' },
        { id: UniProtKBColumn.proteinName, label: 'Protein names' },
        { id: UniProtKBColumn.geneNames, label: 'Gene Names' },
      ],
      onDragDrop: jest.fn(),
      onRemove: jest.fn(),
    };
    rendered = render(<ColumnSelectDragDrop {...props} />);
  });

  it('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onRemove', () => {
    const { getAllByTestId } = rendered;
    const removeButtons = getAllByTestId('remove-icon');
    const removeButton = removeButtons[0];
    fireEvent.click(removeButton);
    expect(props.onRemove).toHaveBeenCalledTimes(1);
  });
});
