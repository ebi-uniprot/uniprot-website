import { JobTypes } from '../../../../../tools/types/toolsJobTypes';
import { Job } from '../../types/toolsJob';
import { Status } from '../../types/toolsStatuses';
import {
  getServerErrorDescription,
  isJobAlreadyFinished,
  isJobIncomplete,
  isValidServerID,
  ServerError,
} from '..';

describe('isValidServerID', () => {
  it('should recognise a valid server ID', () => {
    expect(
      isValidServerID(
        JobTypes.ALIGN,
        'clustalo-R20200629-131126-0485-42275007-np2'
      )
    ).toBe(true);
    expect(
      isValidServerID(
        JobTypes.BLAST,
        'ncbiblast-R20200609-091029-0835-71577248-np2'
      )
    ).toBe(true);
  });

  it('should recognise an invalid server ID', () => {
    expect(
      isValidServerID(JobTypes.BLAST, 'some response from the server')
    ).toBe(false);
  });
});

describe('getServerErrorDescription', () => {
  it('should get formatted error string from server error', () => {
    const data = `<?xml version='1.0' encoding='UTF-8'?>
    <error>
      <description>Invalid parameters: 
        Sequence -> Error in reading input sequence. Please check your input.</description>
    </error>`;
    const error = { response: { data } } as ServerError;
    expect(getServerErrorDescription(error)).toEqual(`Invalid parameters: 
        Sequence → Error in reading input sequence. Please check your input.`);
  });
});

describe('isJobIncomplete', () => {
  it('should return true for running status', () => {
    expect(isJobIncomplete(Status.RUNNING)).toEqual(true);
  });
  it('should return false for finished status', () => {
    expect(isJobIncomplete(Status.FINISHED)).toEqual(false);
  });
});

describe('isJobAlreadyFinished', () => {
  it('should return false for job not finished on the server', () => {
    expect(
      isJobAlreadyFinished(Status.RUNNING, { status: Status.FINISHED } as Job)
    ).toEqual(false);
  });
  it('should return true for job already finished on the server', () => {
    expect(
      isJobAlreadyFinished(Status.FINISHED, { status: Status.FINISHED } as Job)
    ).toEqual(true);
  });
});
