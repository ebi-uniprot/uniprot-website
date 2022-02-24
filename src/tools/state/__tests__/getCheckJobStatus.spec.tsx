import { Dispatch, MutableRefObject } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import getCheckJobStatus from '../getCheckJobStatus';

import runningJob from '../../__mocks__/internal-jobs/running';

import { Status } from '../../types/toolsStatuses';
import {
  MessageLevel,
  MessageFormat,
  MessageTag,
} from '../../../messages/types/messagesTypes';

import { UPDATE_JOB } from '../toolsActions';

import { Location } from '../../../app/config/urls';

import { ToolsAction } from '../toolsReducers';
import { ToolsState } from '../toolsInitialState';
import { MessagesAction } from '../../../messages/state/messagesReducers';

let mock: MockAdapter;
let checkJobStatus: ReturnType<typeof getCheckJobStatus>;

const dispatch: jest.Mock<Dispatch<ToolsAction>> = jest.fn();
const stateRef: MutableRefObject<ToolsState> = {
  current: { [runningJob.internalID]: runningJob },
};
const messagesDispatch: jest.Mock<Dispatch<MessagesAction>> = jest.fn();

beforeAll(() => {
  window.fetch = jest.fn();
  mock = new MockAdapter(axios);
  jest.spyOn(Date, 'now').mockImplementation(() => 0);
  // eslint-disable-next-line no-console
  console.error = jest.fn();
});

beforeEach(() => {
  checkJobStatus = getCheckJobStatus(dispatch, stateRef, messagesDispatch);
});

afterEach(() => {
  dispatch.mockClear();
  messagesDispatch.mockClear();
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
      await checkJobStatus(runningJob);

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch on invalid status', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve('invalid status'),
        })
      );
      await checkJobStatus(runningJob);

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch if job not in state', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(Status.FINISHED),
        })
      );
      await checkJobStatus({ ...runningJob, internalID: 'other id' });

      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch if job disappeared from server', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(Status.NOT_FOUND),
        })
      );
      await checkJobStatus(runningJob);

      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          id: runningJob.internalID,
          partialJob: {
            status: Status.NOT_FOUND,
            timeLastUpdate: Date.now(),
          },
        },
        type: UPDATE_JOB,
      });
    });

    it('should dispatch failed job if finished but no valid data', async () => {
      (window.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          text: () => Promise.resolve(Status.FINISHED),
        })
      );
      mock.onGet().reply(200, { data: 'nonsense' });
      await checkJobStatus(runningJob);

      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          id: runningJob.internalID,
          partialJob: {
            status: Status.FAILURE,
            timeLastUpdate: Date.now(),
          },
        },
        type: UPDATE_JOB,
      });
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
    await checkJobStatus(runningJob);

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        id: runningJob.internalID,
        partialJob: {
          status: Status.RUNNING,
          timeLastUpdate: Date.now(),
        },
      },
      type: UPDATE_JOB,
    });

    (window.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(Status.FAILURE),
      })
    );
    await checkJobStatus(runningJob);

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        id: runningJob.internalID,
        partialJob: {
          status: Status.FAILURE,
          timeLastUpdate: Date.now(),
        },
      },
      type: UPDATE_JOB,
    });

    (window.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        text: () => Promise.resolve(Status.ERRORED),
      })
    );
    await checkJobStatus(runningJob);

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        id: runningJob.internalID,
        partialJob: {
          status: Status.ERRORED,
          timeLastUpdate: Date.now(),
        },
      },
      type: UPDATE_JOB,
    });
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
    await checkJobStatus(runningJob);

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        id: runningJob.internalID,
        partialJob: {
          status: Status.FINISHED,
          timeLastUpdate: Date.now(),
          timeFinished: Date.now(),
          seen: false,
          data: { hits: 1 },
        },
      },
      type: UPDATE_JOB,
    });
    expect(messagesDispatch).toHaveBeenCalledWith(
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
