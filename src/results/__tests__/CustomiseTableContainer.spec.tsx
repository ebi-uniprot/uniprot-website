import React from 'react';
import axios from 'axios';
import { fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import CustomiseTableContainer from '../CustomiseTableContainer';
import initialState from '../../state/initialState';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import mockResultFieldsApi from '../../__mockData__/ResultFieldsData';
import * as resultsActions from '../state/resultsActions';

const mock = new MockAdapter(axios);
mock
  .onGet(mockResultFieldsApi.request)
  .reply(200, mockResultFieldsApi.response);
const updateTableColumns = jest.spyOn(resultsActions, 'updateTableColumns');

describe('CustomiseTableContainer component', () => {
  let renderedWithRedux, goBack;
  beforeEach(() => {
    renderedWithRedux = renderWithRedux(
      <CustomiseTableContainer />,
      {
        initialState,
        location: '/customise-table',
      }
    );
    goBack = jest.spyOn(renderedWithRedux.history, 'goBack');
  })

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
