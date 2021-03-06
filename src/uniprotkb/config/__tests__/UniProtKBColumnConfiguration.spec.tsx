import { MemoryRouter } from 'react-router-dom';

import UniProtKBColumnConfiguration from '../UniProtKBColumnConfiguration';

import uniProtKbConverter from '../../adapters/uniProtkbConverter';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/entryModelData.json';

jest.mock('../../../tools/utils/storage');

describe('UniProtKBColumnConfiguration component', () => {
  let transformedData;

  beforeAll(() => {
    transformedData = uniProtKbConverter(data);
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
  });

  for (const [key, column] of UniProtKBColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
