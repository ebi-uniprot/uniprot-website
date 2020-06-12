import { Store } from 'redux';

import getSubmitJob from '../getSubmitJob';

import createdJob from '../../blast/__mocks__/internal-jobs/created';

import { Status } from '../../blast/types/blastStatuses';
import {
  MessageLevel,
  MessageFormat,
  MessageTag,
} from '../../../messages/types/messagesTypes';

import { UPDATE_JOB } from '../../state/toolsActions';
import { ADD_MESSAGE } from '../../../messages/state/messagesActions';

import { Location } from '../../../app/config/urls';

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

let mock, submitJob;

const store: Store = {
  getState: jest.fn(() => ({ tools: { [createdJob.internalID]: createdJob } })),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
  [Symbol.observable]: jest.fn(),
};

const serverUUID = 'ncbiblast-R20200522-953245-6299-98843150-p1m';

beforeAll(() => {
  mock = new MockAdapter(axios);
  Date.now = jest.fn(() => 0);
});

beforeEach(() => {
  submitJob = getSubmitJob(store);
});

afterEach(() => {
  mock.reset();
  (store.dispatch as jest.Mock).mockClear();
});

afterAll(() => {
  mock.restore();
  (Date.now as jest.Mock).mockRestore();
});

describe('submitJob', () => {
  describe('failures', () => {
    it('server/network error', async () => {
      mock.onPost().reply(500);
      await submitJob(createdJob);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          job: {
            ...createdJob,
            status: Status.FAILURE,
            timeLastUpdate: Date.now(),
            errorDescription:
              'Could not run job: Request failed with status code 500',
          },
        },
        type: UPDATE_JOB,
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(2, {
        payload: {
          id: createdJob.internalID,
          content: 'Could not run job: Request failed with status code 500',
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
          tag: MessageTag.JOB,
          omitAndDeleteAtLocations: [Location.Dashboard],
        },
        type: ADD_MESSAGE,
      });
    });

    it('server responds without a valid ID', async () => {
      mock.onPost().reply(200, 'random response from server');
      await submitJob(createdJob);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          job: {
            ...createdJob,
            status: Status.FAILURE,
            timeLastUpdate: Date.now(),
            errorDescription:
              "Could not run job: The server didn't return a valid ID",
          },
        },
        type: UPDATE_JOB,
      });
      expect(store.dispatch).toHaveBeenNthCalledWith(2, {
        payload: {
          id: createdJob.internalID,
          content: "Could not run job: The server didn't return a valid ID",
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
          tag: MessageTag.JOB,
          omitAndDeleteAtLocations: [Location.Dashboard],
        },
        type: ADD_MESSAGE,
      });
    });

    it("shouldn't do anything if the job is not in the store", async () => {
      mock.onPost().reply(200, serverUUID);
      await submitJob({ ...createdJob, internalID: 'other id' });

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  it('should dispatch a running job', async () => {
    mock.onPost().reply(200, serverUUID);
    await submitJob(createdJob);

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        job: {
          ...createdJob,
          status: Status.RUNNING,
          remoteID: serverUUID,
          timeSubmitted: Date.now(),
          timeLastUpdate: Date.now(),
        },
      },
      type: UPDATE_JOB,
    });
  });
});
