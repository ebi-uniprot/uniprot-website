import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/databaseModelData';
import databaseConverter, {
  DatabaseAPIModel,
  DatabaseUIModel,
} from '../../adapters/databaseConverter';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
} from '../DatabaseColumnConfiguration';

jest.mock('../../../../shared/workers/jobs/utils/storage');

const transformedData: DatabaseUIModel = databaseConverter(data[0]);

describe('DatabaseColumnConfiguration component', () => {
  testColumnConfiguration<DatabaseColumn, Partial<DatabaseAPIModel>>(
    DatabaseColumnConfiguration,
    transformedData
  );
});
