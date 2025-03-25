import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { GetJobMessageArgs } from '../../../../../messages/utils';
import { Status } from '../../types/toolsStatuses';
import JobStore from '../../utils/storage';
import { ToolsAction } from '../actionHandler';
import checkJobStatus from '../checkJobStatus';
import { updateJob } from '../toolsActions';
import runningJob from './__mocks__/running';

let mock: MockAdapter;

// Create mocks for dispatch and messagesDispatch
const dispatch: jest.Mock = jest.fn();
const messagesDispatch: jest.Mock = jest.fn();

// Create a dummy JobStore that satisfies the type but isn’t actually used
const jobStore = {
  get: jest.fn((id: string) =>
    Promise.resolve(id === runningJob.internalID ? runningJob : undefined)
  ),
} as unknown as JobStore;

// Our action handler calls the dispatch functions so we can assert on the calls
const actionHandler = jest.fn(
  (action: { jobAction?: ToolsAction; messageAction?: GetJobMessageArgs }) => {
    if (action.jobAction) {
      dispatch(action.jobAction);
    }
    if (action.messageAction) {
      messagesDispatch(action.messageAction);
    }
  }
);

beforeAll(() => {
  // Replace window.fetch with a jest.fn() mock
  window.fetch = jest.fn();
  mock = new MockAdapter(axios);
  jest.spyOn(Date, 'now').mockImplementation(() => 0);
});

afterEach(() => {
  dispatch.mockClear();
  messagesDispatch.mockClear();
  actionHandler.mockClear();
  mock.reset();
});

describe('checkJobStatus', () => {
  describe('failures', () => {
    it('should not dispatch on network error', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      );
      await checkJobStatus(runningJob, actionHandler, jobStore);
      expect(actionHandler).not.toHaveBeenCalled();
    });

    it('should not dispatch on invalid status', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve('invalid status'),
        })
      );
      await checkJobStatus(runningJob, actionHandler, jobStore);
      expect(actionHandler).not.toHaveBeenCalled();
    });

    it('should not dispatch if job is not in state', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(Status.FINISHED),
        })
      );
      await checkJobStatus(
        { ...runningJob, internalID: 'other id' },
        actionHandler,
        jobStore
      );
      expect(actionHandler).not.toHaveBeenCalled();
    });

    it('should dispatch if job disappeared from server', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(Status.NOT_FOUND),
        })
      );
      await checkJobStatus(runningJob, actionHandler, jobStore);
      expect(dispatch).toHaveBeenCalledWith(
        updateJob(runningJob.internalID, { status: Status.NOT_FOUND })
      );
    });

    it('should dispatch a failed job if finished but no valid data', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(Status.FINISHED),
        })
      );
      mock.onGet().reply(200, { data: 'nonsense' });
      await checkJobStatus(runningJob, actionHandler, jobStore);
      expect(dispatch).toHaveBeenCalledWith(
        updateJob(runningJob.internalID, { status: Status.FAILURE })
      );
    });
  });

  it('should dispatch updated job with new information', async () => {
    (window.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(Status.RUNNING),
      })
    );
    await checkJobStatus(runningJob, actionHandler, jobStore);
    expect(dispatch).toHaveBeenCalledWith(
      updateJob(runningJob.internalID, { status: Status.RUNNING })
    );

    (window.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(Status.FAILURE),
      })
    );
    await checkJobStatus(runningJob, actionHandler, jobStore);
    expect(dispatch).toHaveBeenCalledWith(
      updateJob(runningJob.internalID, { status: Status.FAILURE })
    );

    (window.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(Status.ERRORED),
      })
    );
    await checkJobStatus(runningJob, actionHandler, jobStore);
    expect(dispatch).toHaveBeenCalledWith(
      updateJob(runningJob.internalID, { status: Status.ERRORED })
    );
  });

  it('should dispatch finished job and new message if finished', async () => {
    (window.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(Status.FINISHED),
      })
    );
    mock.onGet().reply(200, { hits: [0] });
    await checkJobStatus(runningJob, actionHandler, jobStore);
    expect(dispatch).toHaveBeenCalledWith(
      updateJob(runningJob.internalID, {
        status: Status.FINISHED,
        timeFinished: Date.now(),
        seen: false,
        data: { hits: 1 },
      })
    );
    expect(messagesDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        job: runningJob,
        nHits: 1,
      })
    );
  });
});
