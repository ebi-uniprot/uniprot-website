import { render, fireEvent, RenderResult } from '@testing-library/react';

import ColumnSelectDragDrop, {
  ColumnSelectDragDropProps,
} from '../ColumnSelectDragDrop';

import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

// TODO: test that some other way, the testing library for react-beautiful-dnd
// TODO: seems to be outdated (or will soon be) because it's firing warnings
describe('ColumnSelectDragDrop component', () => {
  let props: ColumnSelectDragDropProps;
  let rendered: RenderResult;
  beforeEach(async () => {
    props = {
      columns: [
        { itemId: UniProtKBColumn.id, label: 'Entry Name' },
        { itemId: UniProtKBColumn.proteinName, label: 'Protein names' },
        { itemId: UniProtKBColumn.geneNames, label: 'Gene Names' },
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
