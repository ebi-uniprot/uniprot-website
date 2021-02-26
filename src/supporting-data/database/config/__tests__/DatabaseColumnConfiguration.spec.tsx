import { MemoryRouter } from 'react-router-dom';

import DatabaseColumnConfiguration from '../DatabaseColumnConfiguration';

import databaseConverter, {
  DatabaseAPIModel,
  DatabaseUIModel,
} from '../../adapters/databaseConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/databaseModelData';

jest.mock('../../../tools/utils/storage');

describe('DatabaseColumnConfiguration component', () => {
  let transformedData: DatabaseUIModel;

  beforeAll(() => {
    transformedData = databaseConverter(data as DatabaseAPIModel);
  });

  for (const [key, column] of DatabaseColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
