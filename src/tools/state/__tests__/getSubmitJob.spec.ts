import { Dispatch, MutableRefObject } from 'react';

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

import { ToolsAction } from '../toolsReducers';
import { ToolsState } from '../toolsInitialState';
import { MessagesAction } from '../../../messages/state/messagesReducers';

let submitJob: ReturnType<typeof getSubmitJob>;

const dispatch: jest.Mock<Dispatch<ToolsAction>> = jest.fn();
const stateRef: MutableRefObject<ToolsState> = {
  current: { [createdJob.internalID]: createdJob },
};
const messagesDispatch: jest.Mock<Dispatch<MessagesAction>> = jest.fn();

const serverUUID = 'ncbiblast-R20200522-953245-6299-98843150-p1m';

beforeAll(() => {
  window.fetch = jest.fn();
  jest.spyOn(Date, 'now').mockImplementation(() => 0);
});

beforeEach(() => {
  submitJob = getSubmitJob(dispatch, stateRef, messagesDispatch);
});

afterEach(() => {
  dispatch.mockClear();
  messagesDispatch.mockClear();
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

      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          id: createdJob.internalID,
          partialJob: {
            status: Status.FAILURE,
            errorDescription:
              'Could not run job: Request failed with status code 500',
          },
        },
        type: UPDATE_JOB,
      });
      expect(messagesDispatch).toHaveBeenCalledWith({
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

      expect(dispatch).toHaveBeenCalledWith({
        payload: {
          id: createdJob.internalID,
          partialJob: {
            status: Status.FAILURE,
            errorDescription:
              "Could not run job: The server didn't return a valid ID",
          },
        },
        type: UPDATE_JOB,
      });
      expect(messagesDispatch).toHaveBeenCalledWith({
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
    await submitJob(createdJob);

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        id: createdJob.internalID,
        partialJob: {
          status: Status.QUEUED,
          remoteID: serverUUID,
          timeSubmitted: Date.now(),
        },
      },
      type: UPDATE_JOB,
    });
    expect(messagesDispatch).not.toHaveBeenCalled();
  });
});
