import { Dispatch, MutableRefObject } from 'react';

import { JobSharedWorkerMessage } from '../../jobSharedWorker';
import { Status } from '../../types/jobStatuses';
import JobStore from '../../utils/storage';
import { JobAction } from '../actionHandler';
import { updateJob } from '../jobActions';
import { JobsState } from '../jobsInitialState';
import submitJob from '../submitJob';
import createdJob from './__mocks__/created';

const dispatch: jest.Mock<Dispatch<JobAction>> = jest.fn();
const messagesDispatch: jest.Mock = jest.fn();
const stateRef: MutableRefObject<JobsState> = {
  current: { [createdJob.internalID]: createdJob },
};
const jobStore = {
  get: jest.fn((id: string) => stateRef.current?.[id]),
} as unknown as JobStore;
const actionHandler = jest.fn((action: JobSharedWorkerMessage) => {
  if (action.jobAction) {
    dispatch(action.jobAction);
  }
  if (action.messageAction) {
    messagesDispatch(action.messageAction);
  }
});

const serverUUID = 'ncbiblast-R20200522-953245-6299-98843150-p1m';

beforeAll(() => {
  window.fetch = jest.fn();
  jest.spyOn(Date, 'now').mockImplementation(() => 0);
});

afterEach(() => {
  dispatch.mockClear();
  messagesDispatch.mockClear();
  actionHandler.mockClear();
});

describe('submitJob', () => {
  describe('failures', () => {
    it('server/network error', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 500,
          text: () => Promise.resolve(''),
        })
      );
      await submitJob(createdJob, actionHandler, jobStore);

      const expectedJobAction = updateJob(createdJob.internalID, {
        status: Status.FAILURE,
        errorDescription:
          'Could not run job: Request failed with status code 500',
      });
      const expectedMessageAction = {
        job: createdJob,
        errorDescription:
          'Could not run job: Request failed with status code 500',
      };

      expect(dispatch).toHaveBeenCalledWith(expectedJobAction);
      expect(messagesDispatch).toHaveBeenCalledWith(expectedMessageAction);
    });

    it('server responds without a valid ID', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve('random response from server'),
        })
      );
      await submitJob(createdJob, actionHandler, jobStore);

      const expectedJobAction = updateJob(createdJob.internalID, {
        status: Status.FAILURE,
        errorDescription:
          "Could not run job: The server didn't return a valid ID",
      });
      const expectedMessageAction = {
        job: createdJob,
        errorDescription:
          "Could not run job: The server didn't return a valid ID",
      };

      expect(dispatch).toHaveBeenCalledWith(expectedJobAction);
      expect(messagesDispatch).toHaveBeenCalledWith(expectedMessageAction);
    });

    it("shouldn't do anything if the job is not in the store", async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(serverUUID),
        })
      );
      const nonExistentJob = { ...createdJob, internalID: 'other id' };
      await submitJob(nonExistentJob, actionHandler, jobStore);

      expect(actionHandler).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
      expect(messagesDispatch).not.toHaveBeenCalled();
    });
  });

  it('should dispatch a job', async () => {
    (window.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(serverUUID),
      })
    );
    await submitJob(createdJob, actionHandler, jobStore);

    const expectedJobAction = updateJob(createdJob.internalID, {
      status: Status.QUEUED,
      remoteID: serverUUID,
      timeSubmitted: Date.now(),
    });

    expect(dispatch).toHaveBeenCalledWith(expectedJobAction);
    expect(messagesDispatch).not.toHaveBeenCalled();
  });
});
