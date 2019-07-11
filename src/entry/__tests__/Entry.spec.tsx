import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { render } from '@testing-library/react';
import Entry from '../Entry';
import useDataApi from '../../utils/useDataApi';
import mock_data from '../../model/__mocks__/modelData.json';

jest.mock('../../utils/useDataApi', () =>
  jest.fn().mockImplementation(() => mock_data)
);

describe('Entry', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Router initialEntries={['/uniprotkb/P05067']}>
        <Route
          component={props => <Entry {...props} />}
          path="/uniprotkb/:accession"
        />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(useDataApi).toBeCalled();
  });
});
