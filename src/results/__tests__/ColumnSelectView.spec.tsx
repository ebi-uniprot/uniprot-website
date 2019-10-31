import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColumnSelectView from '../ColumnSelectView';
import { Column } from '../../model/types/ColumnTypes';
import structuredResultFieldsData from '../../__mockData__/StructuredResultFieldsData.json';

describe('ColumnSelectView component', () => {
  let props, rendered;
  beforeEach(() => {
    props = {
      selectedColumns: [Column.accession, Column.ccAllergen],
      fieldData: structuredResultFieldsData,
      onChange: jest.fn(),
      onReset: jest.fn(),
    };
    rendered = render(<ColumnSelectView {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onChange when an item is selected in the accordion', () => {
    const { queryAllByTestId } = rendered;
    const content = queryAllByTestId('accordion-content');
    const listItemCheckbox = content[0].querySelector('li>label>input');
    fireEvent.click(listItemCheckbox);
    // Unselect Column.accession to leave only Column.ccAllergen
    expect(props.onChange).toHaveBeenCalledWith([Column.ccAllergen]);
  });

  test('should call onReset but reset to default button is clicked', () => {
    const { getByTestId } = rendered;
    const button = getByTestId('column-select-reset-button');
    fireEvent.click(button);
    expect(props.onReset).toHaveBeenCalled();
  });
});
