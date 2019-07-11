import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UniProtCard from '../UniProtCard';
import data from '../../../../model/__mocks__/modelData.json';

describe('UniProtCard component', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Router>
        <UniProtCard data={data} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
