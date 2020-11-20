import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import initialState from '../../../../app/state/rootInitialState';
import CustomiseTableView from '../CustomiseTableView';
import { UniProtKBColumn } from '../../../types/columnTypes';

describe('CustomiseTableView component', () => {
  let props, renderedWithRedux;
  beforeEach(() => {
    props = {
      selectedColumns: [UniProtKBColumn.accession, UniProtKBColumn.ccAllergen],
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
