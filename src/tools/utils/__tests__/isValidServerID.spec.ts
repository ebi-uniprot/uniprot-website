/**
 * @jest-environment node
 */
import isValidServerID from '../isValidServerID';

describe('isValidServerID', () => {
  it('should recognise a valid server ID', () => {
    expect(
      isValidServerID('ncbiblast-R20200609-091029-0835-71577248-np2')
    ).toBe(true);
  });

  it('should recognise an invalid server ID', () => {
    expect(isValidServerID('some response from the server')).toBe(false);
  });
});
