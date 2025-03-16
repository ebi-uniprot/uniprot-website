import getJobMessage from '..';
import customRender from '../../../shared/__test-helpers__/customRender';

import createdJob from '../../../tools/__mocks__/internal-jobs/created';
import runningJob from '../../../tools/__mocks__/internal-jobs/running';

describe('getJobMessage', () => {
  it('should create an error message object', () => {
    expect(
      getJobMessage({
        job: createdJob,
        errorDescription: 'Some error',
      })
    ).toEqual({
      id: 'local-97e5ab00-9ff0-11ea-baf5-bf14c0760612',
      format: 'POP_UP',
      tag: 'JOB',
      omitAndDeleteAtLocations: ['Dashboard'],
      content: 'Some error',
      level: 'failure',
    });
  });

  it('should create a success message object', () => {
    const jobMessage = getJobMessage({
      job: runningJob,
      nHits: 100,
    });
    expect(jobMessage).toMatchObject({
      id: 'local-97e5ab00-9ff0-11ea-baf5-bf14c9060612',
      format: 'POP_UP',
      tag: 'JOB',
      omitAndDeleteAtLocations: ['Dashboard'],
      level: 'success',
    });
    const { asFragment } = customRender(<>{jobMessage.content}</>);
    expect(asFragment()).toMatchSnapshot();
  });
});
