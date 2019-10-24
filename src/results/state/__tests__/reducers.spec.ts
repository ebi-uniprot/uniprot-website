import resultsReducers from '../resultsReducers';
import { requestBatchOfResults } from '../resultsActions';

describe('Results reducer', () => {
  test('should set flag for getting results', () => {
    const state = {
      results: { isFetching: false },
    };
    const action = requestBatchOfResults('http://some-url');
    expect(resultsReducers(state, action)).toEqual({
      results: { isFetching: true },
    });
  });
});
