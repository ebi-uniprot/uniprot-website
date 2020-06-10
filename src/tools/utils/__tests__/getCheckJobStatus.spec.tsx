/**
 * @jest-environment node
 */
import { Store } from 'redux';

import getCheckJobStatus from '../getCheckJobStatus';

import runningJob from '../../blast/__mocks__/internal-jobs/running';

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

let mock, checkJobStatus;

const store: Store = {
  getState: jest.fn(() => ({ tools: { [runningJob.internalID]: runningJob } })),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
  [Symbol.observable]: jest.fn(),
};

beforeAll(() => {
  mock = new MockAdapter(axios);
  Date.now = jest.fn(() => 0);
  console.error = jest.fn(() => {});
});

beforeEach(() => {
  checkJobStatus = getCheckJobStatus(store);
});

afterEach(() => {
  mock.reset();
  (store.dispatch as jest.Mock).mockClear();
});

afterAll(() => {
  mock.restore();
  (Date.now as jest.Mock).mockRestore();
  (console.error as jest.Mock).mockRestore();
});

describe('checkJobStatus', () => {
  describe('failures', () => {
    it('should not dispatch on network error', async () => {
      mock.onGet().reply(500);
      await checkJobStatus(runningJob);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch on invalid status', async () => {
      mock.onGet().reply(200, 'invalid status');
      await checkJobStatus(runningJob);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch if job not in state', async () => {
      mock.onGet().reply(200, Status.FINISHED);
      await checkJobStatus({ ...runningJob, internalID: 'other id' });

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch if job not in state', async () => {
      mock.onGet().reply(200, Status.NOT_FOUND);
      await checkJobStatus(runningJob);

      expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch failed job if finished but no valid data', async () => {
      mock
        .onGet() // first time get status
        .replyOnce(200, Status.FINISHED)
        .onGet() // then get data
        .reply(200, { data: 'nonsense' });
      await checkJobStatus(runningJob);

      expect(store.dispatch).toHaveBeenCalledWith({
        payload: {
          job: {
            ...runningJob,
            status: Status.FAILURE,
            timeLastUpdate: Date.now(),
          },
        },
        type: UPDATE_JOB,
      });
    });
  });

  it('should dispatch updated job with new information', async () => {
    mock.onGet().reply(200, Status.RUNNING);
    await checkJobStatus(runningJob);

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        job: {
          ...runningJob,
          timeLastUpdate: Date.now(),
        },
      },
      type: UPDATE_JOB,
    });

    mock.onGet().reply(200, Status.FAILURE);
    await checkJobStatus(runningJob);

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        job: {
          ...runningJob,
          status: Status.FAILURE,
          timeLastUpdate: Date.now(),
        },
      },
      type: UPDATE_JOB,
    });

    mock.onGet().reply(200, Status.ERRORED);
    await checkJobStatus(runningJob);

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        job: {
          ...runningJob,
          status: Status.ERRORED,
          timeLastUpdate: Date.now(),
        },
      },
      type: UPDATE_JOB,
    });
  });

  it('should dispatch finished job and new message if finished', async () => {
    mock
      .onGet() // first time get status
      .replyOnce(200, Status.FINISHED)
      .onGet() // then get data
      .reply(200, { hits: [0] });
    await checkJobStatus(runningJob);

    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: {
        job: {
          ...runningJob,
          status: Status.FINISHED,
          timeLastUpdate: Date.now(),
          timeFinished: Date.now(),
          data: { hits: 1 },
        },
      },
      type: UPDATE_JOB,
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        payload: expect.objectContaining({
          id: runningJob.internalID,
          content: expect.any(Object),
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          tag: MessageTag.JOB,
          omitAndDeleteAtLocations: [Location.Dashboard],
        }),
      })
    );
  });
});
