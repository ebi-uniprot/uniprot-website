import React from 'react';
import { fireEvent } from '@testing-library/react';
import CustomiseTable from '../CustomiseTable';
import initialState from '../../../../app/state/rootInitialState';
import renderWithRedux from '../../../__test-helpers__/RenderWithRedux';
import '../../../../uniprotkb/components/__mocks__/mockApi';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';

describe('CustomiseTable component', () => {
  let renderedWithRedux, goBack;
  beforeEach(() => {
    renderedWithRedux = renderWithRedux(<CustomiseTable />, {
      initialState,
      location: '/customise-table',
    });
    goBack = jest.spyOn(renderedWithRedux.history, 'goBack');
  });

  test('should go back and not call updateTableColumns action when cancel button is pressed', () => {
    const { getByTestId } = renderedWithRedux;
    const cancelButton = getByTestId('customise-table-cancel-button');
    fireEvent.click(cancelButton);
    expect(goBack).toHaveBeenCalled();
    expect(updateTableColumns).not.toHaveBeenCalled();
  });

  test('should go back and call updateTableColumns action when customise table form is submitted', () => {
    const { getByTestId, history } = renderedWithRedux;
    const form = getByTestId('customise-table-form');
    fireEvent.submit(form);
    expect(goBack).toHaveBeenCalled();
    expect(updateTableColumns).toHaveBeenCalled();
  });
});

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
