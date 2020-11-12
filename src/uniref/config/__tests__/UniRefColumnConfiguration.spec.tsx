import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import UniProtKBColumnConfiguration from '../UniRefColumnConfiguration';
import data from '../../__mocks__/UniRefResultsData.json';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';
jest.mock('../../../tools/utils/storage');

describe('UniRefColumnConfiguration component', () => {
  test('should render all columns', () => {
    UniProtKBColumnConfiguration.forEach((column) => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(data)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(column.label);
    });
  });
});
