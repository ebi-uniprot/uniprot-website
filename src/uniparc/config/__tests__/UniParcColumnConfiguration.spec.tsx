import { MemoryRouter } from 'react-router-dom';

import UniParcColumnConfiguration from '../UniParcColumnConfiguration';

import uniParcConverter from '../../adapters/uniParcConverter';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/entryModelData.json';

jest.mock('../../../tools/utils/storage');

describe('UniParcColumnConfiguration component', () => {
  let transformedData;

  beforeAll(() => {
    transformedData = uniParcConverter(data);
  });

  for (const [key, column] of UniParcColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
