import { MemoryRouter } from 'react-router-dom';

import UniRefColumnConfiguration from '../UniRefColumnConfiguration';

import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import mock from '../../__mocks__/UniRefResultsData';

jest.mock('../../../tools/utils/storage');

describe('UniRefColumnConfiguration component', () => {
  for (const [key, column] of UniRefColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(mock.results[0])}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
