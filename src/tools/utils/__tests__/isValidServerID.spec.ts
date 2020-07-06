/**
 * @jest-environment node
 */
import isValidServerID from '../isValidServerID';
import { JobTypes } from '../../types/toolsJobTypes';

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
