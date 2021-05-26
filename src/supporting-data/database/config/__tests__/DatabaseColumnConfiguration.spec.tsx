import DatabaseColumnConfiguration from '../DatabaseColumnConfiguration';

import databaseConverter, {
  DatabaseAPIModel,
  DatabaseUIModel,
} from '../../adapters/databaseConverter';
import customRender from '../../../../shared/__test-helpers__/customRender';

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
      const { asFragment } = customRender(
        <>{column.render(transformedData)}</>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
