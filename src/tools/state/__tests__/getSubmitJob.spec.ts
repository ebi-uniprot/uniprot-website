import { Store } from 'redux';

import getSubmitJob from '../getSubmitJob';

import createdJob from '../../__mocks__/internal-jobs/created';

import { Status } from '../../types/toolsStatuses';
import {
  MessageLevel,
  MessageFormat,
  MessageTag,
} from '../../../messages/types/messagesTypes';

import { UPDATE_JOB } from '../toolsActions';
import { ADD_MESSAGE } from '../../../messages/state/messagesActions';

import { Location } from '../../../app/config/urls';

let submitJob: ReturnType<typeof getSubmitJob>;

const store: Store = {
  getState: jest.fn(() => ({ tools: { [createdJob.internalID]: createdJob } })),
  dispatch: jest.fn(),
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
  [Symbol.observable]: jest.fn(),
};

const serverUUID = 'ncbiblast-R20200522-953245-6299-98843150-p1m';

beforeAll(() => {
  window.fetch = jest.fn();
  jest.spyOn(Date, 'now').mockImplementation(() => 0);
});

beforeEach(() => {
  submitJob = getSubmitJob(store);
});

afterEach(() => {
  (store.dispatch as jest.Mock).mockClear();
});

describe('submitJob', () => {
  describe('failures', () => {
    it('server/network error', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      );
      await submitJob(createdJob);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          id: createdJob.internalID,
          partialJob: {
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
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve('random response from server'),
        })
      );
      await submitJob(createdJob);

      expect(store.dispatch).toHaveBeenNthCalledWith(1, {
        payload: {
          id: createdJob.internalID,
          partialJob: {
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
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(serverUUID),
        })
      );
      await submitJob({ ...createdJob, internalID: 'other id' });

      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });

  it('should dispatch a running job', async () => {
    (window.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(serverUUID),
      })
    );
    await submitJob(createdJob);

    expect(store.dispatch).toHaveBeenCalledWith({
      payload: {
        id: createdJob.internalID,
        partialJob: {
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
