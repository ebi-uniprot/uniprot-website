/**
 * @jest-environment node
 */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiUrls from '../../config/apiUrls';
import { clause, searchTerms, evidences } from '../searchReducers';
import {
  updateInputValue,
  updateEvidence,
  updateRangeValue,
  updateLogicOperator,
  requestSearchTerms,
  receiveSearchTerms,
  requestEvidences,
  receiveEvidences,
  selectSearchTerm,
} from '../searchActions';

const mock = new MockAdapter(axios);

const dateNow = 1542736574043;
jest.spyOn(Date, 'now').mockImplementation(() => dateNow);

describe('Clause reducer', () => {
  test('should select field', () => {
    const state = {
      id: '1',
      searchTerm: 'foo',
      queryInput: { stringValue: 'bar' },
    };
    const action = selectSearchTerm('1', 'baz');
    expect(clause(state, action)).toEqual({
      id: '1',
      searchTerm: 'baz',
      queryInput: {},
    });
  });

  test('should update input value', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
    };
    const action = updateInputValue('1', 'qux');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'qux' },
    });
  });

  test('should update range input value', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { rangeFrom: 1, rangeTo: 100 },
    };
    const action = updateRangeValue('1', 2, true);
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { rangeFrom: 2, rangeTo: 100 },
    });
  });

  test('should update evidence', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar', evidenceValue: 'garply' },
    };
    const action = updateEvidence('1', 'waldo');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar', evidenceValue: 'waldo' },
    });
  });

  test('should update logic operator', () => {
    const state = {
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
      logicOperator: 'AND',
    };
    const action = updateLogicOperator('1', 'OR');
    expect(clause(state, action)).toEqual({
      id: '1',
      field: 'foo',
      queryInput: { stringValue: 'bar' },
      logicOperator: 'OR',
    });
  });
});

describe('searchTerms reducer', () => {
  test('should request search terms', () => {
    const state = {
      isFetching: false,
      data: [],
    };
    const action = requestSearchTerms();
    expect(searchTerms(state, action)).toEqual({
      isFetching: true,
      data: [],
    });
  });

  test('should receive search terms', () => {
    const data = [
      { id: '1', label: 'foo' },
      { id: '2', label: 'bar' },
    ];
    mock.onGet(apiUrls.advancedSearchTerms).reply(200, data);

    const state = {
      isFetching: true,
      data: [],
    };
    const action = receiveSearchTerms(data);
    expect(searchTerms(state, action)).toEqual({
      isFetching: false,
      lastUpdated: dateNow,
      data,
    });
  });
});

describe('evidences reducer', () => {
  test('should request evidences', () => {
    const state = {
      go: {
        data: [],
        isFetching: false,
      },
    };
    const action = requestEvidences('go');
    expect(evidences(state, action)).toEqual({
      go: {
        data: [],
        isFetching: true,
      },
    });
  });

  test('should receive search terms', () => {
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
    const state = {
      go: {
        data: [],
        isFetching: false,
      },
    };
    const action = receiveEvidences(data, 'go');
    expect(evidences(state, action)).toEqual({
      go: {
        isFetching: false,
        lastUpdated: dateNow,
        data,
      },
    });
  });
});
