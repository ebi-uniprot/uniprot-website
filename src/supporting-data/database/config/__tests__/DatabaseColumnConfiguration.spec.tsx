import { MemoryRouter } from 'react-router-dom';

import DatabaseColumnConfiguration from '../DatabaseColumnConfiguration';

import databaseConverter, {
  DatabaseAPIModel,
  DatabaseUIModel,
} from '../../adapters/databaseConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/databaseModelData';

jest.mock('../../../../tools/utils/storage');

describe('DatabaseColumnConfiguration component', () => {
  let transformedData: DatabaseUIModel;

  beforeAll(() => {
    transformedData = databaseConverter(data[0] as DatabaseAPIModel);
  });

  test.each(Array.from(DatabaseColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
