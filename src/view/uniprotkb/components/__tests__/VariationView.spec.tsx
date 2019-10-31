import React from 'react';
import axios from 'axios';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import VariationView from '../VariationView';

jest.mock('axios');
const resp = { data: { sequence: 'ABCDEFG', features: [{}, {}] } };
afterEach(cleanup);

describe('VariationView component', () => {
  test('it renders without crashing', async () => {
    axios.get.mockResolvedValue(resp);
    await act(async () => {
      const { asFragment } = render(
        <VariationView primaryAccession="P05067" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
