import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ProteomesEntryView } from '../ProteomesView';
import ProteomesUIData from '../__mocks__/ProteomesUIData.json';

describe('ProteomesEntryView component', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Router>
        <ProteomesEntryView data={ProteomesUIData} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
