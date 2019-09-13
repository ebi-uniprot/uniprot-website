import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter as Router } from 'react-router-dom';
import ProteinSummary from '../ProteinSummary';
import modelData from '../../../../model/__mocks__/modelData.json';

afterEach(cleanup);

jest.mock('axios');

axios.get.mockResolvedValue({
  data: modelData,
});

describe('ProteinSummary component', () => {
  test('it renders without crashing', async () => {
    const { asFragment, getByText } = render(
      <Router>
        <ProteinSummary accession="P05067" />
      </Router>
    );
    const resolved = await waitForElement(() =>
      getByText(modelData.primaryAccession)
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
