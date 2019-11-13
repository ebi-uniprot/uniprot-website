import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColumnSelectView from '../ColumnSelectView';
import { Column } from '../../model/types/ColumnTypes';
import structuredResultFieldsData from '../../__mockData__/StructuredResultFieldsData.json';

/*
  selectedColumns: Column[];
  fieldData: FieldData;
  onSelect: (columnId: Column) => void;
  onDragDrop: (srcIndex: number, destIndex: number) => void;
  onReset: () => void;
*/
describe('ColumnSelectView component', () => {
  let props;
  let rendered;
  beforeEach(() => {
    props = {
      selectedColumns: [Column.ccAllergen, Column.proteinExistence],
      fieldData: structuredResultFieldsData,
      onSelect: jest.fn(),
      onDragDrop: jest.fn(),
      onReset: jest.fn(),
    };
    rendered = render(<ColumnSelectView {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onSelect when an item is selected in the accordion', () => {
    const { queryAllByTestId } = rendered;
    const content = queryAllByTestId('accordion-content');
    const listItemCheckbox = content[0].querySelector('li>label>input');
    fireEvent.click(listItemCheckbox);
    expect(props.onSelect).toHaveBeenCalledWith(Column.accession);
  });

  test('should call onReset but reset to default button is clicked', () => {
    const { getByTestId } = rendered;
    const button = getByTestId('column-select-reset-button');
    fireEvent.click(button);
    expect(props.onReset).toHaveBeenCalled();
  });
});
