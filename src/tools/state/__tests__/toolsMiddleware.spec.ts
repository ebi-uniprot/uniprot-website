import { schedule, sleep } from 'timing-functions';
import { action } from 'typesafe-actions';
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
import postData from '../../../uniprotkb/config/postData';

import toolsMiddleware from '../toolsMiddleware';
import createdJob from '../../blast/__mocks__/internal-jobs/created';
import JobStore from '../../utils/storage';
import { REHYDRATE_JOBS } from '../toolsActions';

jest.mock('timing-functions');
jest.mock('../../utils/storage', () => jest.fn());

var axiosMock = new MockAdapter(axios);
axiosMock.onPost().reply(200, { data: 'some-id' });

const next = jest.fn();
const store = {
  dispatch: jest.fn(),
  getState: () => ({
    tools: {
      [createdJob.internalID]: createdJob,
    },
  }),
};

describe.skip('toolsMiddleware', () => {
  it('should run with new jobs', () => {
    // TODO this currently runs into infite loops,
    // possibly because the dispatch doesn't interupt the loop

    const action = {
      type: REHYDRATE_JOBS,
    };
    toolsMiddleware(store)(next)(action);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
