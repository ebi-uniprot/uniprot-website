import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import { getServerErrorDescription, getJobMessage } from '..';

import createdJob from '../../__mocks__/internal-jobs/created';
import runningJob from '../../__mocks__/internal-jobs/running';

describe('getServerErrorDescription', () => {
  it('should get formatted error string from server error', () => {
    const data = `<?xml version='1.0' encoding='UTF-8'?>
    <error>
      <description>Invalid parameters: 
        Sequence -> Error in reading input sequence. Please check your input.</description>
    </error>`;
    const error = { response: { data } };
    expect(getServerErrorDescription(error)).toEqual(`Invalid parameters: 
        Sequence → Error in reading input sequence. Please check your input.`);
  });
});

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
    const { asFragment } = render(
      <Router>{jobMessage.content as JSX.Element}</Router>
    );
    expect(asFragment()).toMatchSnapshot();
    delete jobMessage.content;
    expect(jobMessage).toEqual({
      id: 'local-97e5ab00-9ff0-11ea-baf5-bf14c9060612',
      format: 'POP_UP',
      tag: 'JOB',
      omitAndDeleteAtLocations: ['Dashboard'],
      level: 'success',
    });
  });
});
