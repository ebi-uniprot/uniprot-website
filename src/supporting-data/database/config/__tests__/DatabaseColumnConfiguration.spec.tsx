import { MemoryRouter } from 'react-router-dom';

import CitationsColumnConfiguration from '../DatabaseColumnConfiguration';

import citationsConverter, {
  CitationsAPIModel,
  CitationsUIModel,
} from '../../adapters/databaseConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/databaseModelData';

jest.mock('../../../tools/utils/storage');

describe('CitationsColumnConfiguration component', () => {
  let transformedData: CitationsUIModel;

  beforeAll(() => {
    transformedData = citationsConverter(data as CitationsAPIModel);
  });

  for (const [key, column] of CitationsColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
