import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/databaseModelData';
import databaseConverter, {
  type DatabaseAPIModel,
  type DatabaseUIModel,
} from '../../adapters/databaseConverter';
import DatabaseColumnConfiguration, {
  type DatabaseColumn,
} from '../DatabaseColumnConfiguration';

jest.mock('../../../../shared/workers/jobs/utils/storage');

const transformedData: DatabaseUIModel = databaseConverter(data[0]);

describe('DatabaseColumnConfiguration component', () => {
  testColumnConfiguration<DatabaseColumn, Partial<DatabaseAPIModel>>(
    DatabaseColumnConfiguration,
    transformedData
  );
});
