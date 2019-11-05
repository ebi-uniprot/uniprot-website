import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import initialState from '../../state/initialState';
import CustomiseTableView from '../CustomiseTableView';
import { Column } from '../../model/types/ColumnTypes';

describe('CustomiseTableView component', () => {
  let props, renderedWithRedux;
  beforeEach(() => {
    props = {
      selectedColumns: [Column.accession, Column.ccAllergen],
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onCancel: jest.fn(),
    };
    renderedWithRedux = renderWithRedux(<CustomiseTableView {...props} />, {
      initialState,
      location: '/customise-table',
    });
  });

  test('should render', () => {
    const { asFragment } = renderedWithRedux;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call onSubmit when submit button is clicked', () => {
    const { getByTestId } = renderedWithRedux;
    const form = getByTestId('customise-table-form');
    fireEvent.submit(form);
    expect(props.onSubmit).toHaveBeenCalled();
  });

  test('should call onCancel when cancel button is clicked', () => {
    const { getByTestId } = renderedWithRedux;
    const button = getByTestId('customise-table-cancel-button');
    fireEvent.click(button);
    expect(props.onCancel).toHaveBeenCalled();
  });
});
