import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import 'core-js/stable';
import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import ColumnSelectContainer from '../ColumnSelectContainer';
import rootReducer from '../../state/rootReducer';
// import searchInitialState from '../../search/state/searchInitialState';
// import resultsInitialState, { ViewMode } from '../state/resultsInitialState';
import initialState from '../../state/initialState';
import mockResultFieldsApi from '../../__mockData__/ResultFieldsData';

const mock = new MockAdapter(axios);
mock
  .onGet(mockResultFieldsApi.request)
  .reply(200, mockResultFieldsApi.response);

const renderWithRedux = (
  ui,
  {
    route = '/uniprotkb?query=blah',
    history = createMemoryHistory({ initialEntries: [route] }),
    state,
    store = createStore(rootReducer, state, applyMiddleware(thunk)),
  } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    store,
    history,
  };
};

describe('ColumnSelectContainer component', () => {
  test('should call to get field data', () => {
    renderWithRedux(<ColumnSelectContainer />, { initialState });

    // renderWithRedux(<ColumnSelectContainer />);
    expect(axios.get).toHaveBeenCalled();
  });
});
