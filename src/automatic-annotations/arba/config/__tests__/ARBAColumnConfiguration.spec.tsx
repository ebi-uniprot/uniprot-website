import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/arbaModelData';
import databaseConverter, {
  type ARBAAPIModel,
  type ARBAUIModel,
} from '../../adapters/arbaConverter';
import ARBAColumnConfiguration, {
  type ARBAColumn,
} from '../ARBAColumnConfiguration';

jest.mock('../../../../shared/workers/jobs/utils/storage');

const transformedData: ARBAUIModel = databaseConverter(data[0]);

describe('ARBAColumnConfiguration component', () => {
  testColumnConfiguration<ARBAColumn, Partial<ARBAAPIModel>>(
    ARBAColumnConfiguration,
    transformedData
  );
});
