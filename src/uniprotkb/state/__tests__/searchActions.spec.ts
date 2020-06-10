/**
 * @jest-environment node
 */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiUrls from '../../config/apiUrls';
import * as actions from '../searchActions';
import initialState from '../searchInitialState';
import { itemType, dataType } from '../../types/searchTypes';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const dateNow = 1542736574043;
jest.spyOn(Date, 'now').mockImplementation(() => dateNow);
const store = mockStore({ query: initialState });

describe('sync actions', () => {
  it('should create a SELECT_SEARCH_TERM action', () => {
    const clauseId = '1';
    const searchTerm = {
      id: 'id_accession',
      label: 'UniProtKB AC',
      itemType: itemType.single,
      term: 'accession',
      dataType: dataType.string,
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
    };
    const expectedAction = {
      type: actions.SELECT_SEARCH_TERM,
      meta: undefined,
      payload: {
        clauseId,
        searchTerm,
        queryInput: {},
      },
    };
    expect(actions.selectSearchTerm(clauseId, searchTerm)).toEqual(
      expectedAction
    );
  });

  it('should create a SELECT_SEARCH_TERM action with the first enum value when enum search term selected', () => {
    const clauseId = '1';
    const searchTerm = {
      id: 'id_reviewed',
      label: 'Reviewed',
      itemType: itemType.single,
      term: 'reviewed',
      dataType: dataType.enum,
      values: [
        {
          name: 'Yes',
          value: 'true',
        },
        {
          name: 'No',
          value: 'false',
        },
      ],
      description: 'Search by reviewed',
      example: 'true',
    };
    const expectedAction = {
      type: actions.SELECT_SEARCH_TERM,
      meta: undefined,
      payload: {
        clauseId,
        searchTerm,
        queryInput: { stringValue: searchTerm.values[0].value },
      },
    };
    expect(actions.selectSearchTerm(clauseId, searchTerm)).toEqual(
      expectedAction
    );
  });

  it('should create a UPDATE_INPUT_VALUE action', () => {
    const clauseId = '1';
    const value = 'foo';
    const expectedAction = {
      type: actions.UPDATE_INPUT_VALUE,
      meta: undefined,
      payload: {
        clauseId,
        value,
      },
    };
    expect(actions.updateInputValue(clauseId, value)).toEqual(expectedAction);
  });

  it('should create a UPDATE_EVIDENCE action', () => {
    const clauseId = '1';
    const value = 'foo';
    const expectedAction = {
      type: actions.UPDATE_EVIDENCE,
      meta: undefined,
      payload: {
        clauseId,
        value,
      },
    };
    expect(actions.updateEvidence(clauseId, value)).toEqual(expectedAction);
  });

  it('should create a UPDATE_RANGE_VALUE action', () => {
    const clauseId = '1';
    const value = 'foo';
    const from = true;
    const expectedAction = {
      type: actions.UPDATE_RANGE_VALUE,
      meta: undefined,
      payload: {
        clauseId,
        value,
        from,
      },
    };
    expect(actions.updateRangeValue(clauseId, value, from)).toEqual(
      expectedAction
    );
  });

  it('should create a UPDATE_LOGIC_OPERATOR action', () => {
    const clauseId = '1';
    const value = 'foo';
    const expectedAction = {
      type: actions.UPDATE_LOGIC_OPERATOR,
      meta: undefined,
      payload: {
        clauseId,
        value,
      },
    };
    expect(actions.updateLogicOperator(clauseId, value)).toEqual(
      expectedAction
    );
  });

  it('should create an UPDATE_QUERY_STRING action', () => {
    const queryString = 'blah';
    const expectedAction = {
      type: actions.UPDATE_QUERY_STRING,
      meta: undefined,
      payload: {
        queryString,
      },
    };
    expect(actions.updateQueryString(queryString)).toEqual(expectedAction);
  });

  it('should create a ADD_CLAUSE action', () => {
    const expectedAction = {
      type: actions.ADD_CLAUSE,
    };
    expect(actions.addClause()).toEqual(expectedAction);
  });

  it('should create a REMOVE_CLAUSE action', () => {
    const clauseId = '1';
    const expectedAction = {
      type: actions.REMOVE_CLAUSE,
      meta: undefined,
      payload: {
        clauseId,
      },
    };
    expect(actions.removeClause(clauseId)).toEqual(expectedAction);
  });

  it('should create a REQUEST_SEARCH_TERMS action', () => {
    const expectedAction = {
      type: actions.REQUEST_SEARCH_TERMS,
    };
    expect(actions.requestSearchTerms()).toEqual(expectedAction);
  });

  it('should return true if evidences is not fetching ', () => {
    const state = store.getState();
    state.query.evidences.go.isFetching = false;
    expect(actions.shouldFetchEvidences(state, 'go')).toEqual(true);
    state.query.evidences.go.isFetching = true;
    expect(actions.shouldFetchEvidences(state, 'go')).toEqual(false);
  });

  it('should create a REQUEST_EVIDENCES action', () => {
    const expectedAction = {
      type: actions.REQUEST_EVIDENCES,
      meta: undefined,
      payload: {
        evidencesType: undefined,
      },
    };
    expect(actions.requestEvidences()).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  const search_terms_data = [
    { id: '1', label: 'foo' },
    { id: '2', label: 'bar' },
  ];

  it('creates RECEIVE_SEARCH_TERMS when fetching has been done', () => {
    const data = [
      { id: '1', label: 'foo' },
      { id: '2', label: 'bar' },
    ];
    mock.onGet(apiUrls.advancedSearchTerms).reply(200, data);
    const expectedActions = [
      {
        type: actions.REQUEST_SEARCH_TERMS,
        meta: undefined,
        payload: undefined,
      },
      {
        type: actions.RECEIVE_SEARCH_TERMS,
        payload: { receivedAt: dateNow, data: search_terms_data },
        meta: undefined,
      },
    ];
    return store.dispatch(actions.fetchSearchTerms()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_EVIDENCES when fetching has been done', () => {
    const data = [
      {
        groupName: 'Any',
        items: [
          {
            name: 'Any assertion method',
            code: 'any',
          },
          {
            name: 'Any manual assertion',
            code: 'manual',
          },
          {
            name: 'Any automatic assertion',
            code: 'automatic',
          },
        ],
      },
    ];
    mock.onGet(apiUrls.evidences.go).reply(200, data);
    const expectedActions = [
      {
        type: actions.REQUEST_SEARCH_TERMS,
        meta: undefined,
        payload: undefined,
      },
      {
        type: actions.RECEIVE_SEARCH_TERMS,
        payload: { receivedAt: dateNow, data: search_terms_data },
        meta: undefined,
      },
      {
        type: actions.REQUEST_EVIDENCES,
        payload: { evidencesType: 'go' },
        meta: undefined,
      },
      {
        type: actions.RECEIVE_EVIDENCES,
        payload: {
          receivedAt: dateNow,
          evidencesType: 'go',
          data,
        },
        meta: undefined,
      },
    ];
    return store.dispatch(actions.fetchEvidences('go')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
