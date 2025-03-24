import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/arbaModelData';
import databaseConverter, {
  ARBAAPIModel,
  ARBAUIModel,
} from '../../adapters/arbaConverter';
import ARBAColumnConfiguration, {
  ARBAColumn,
} from '../ARBAColumnConfiguration';

jest.mock('../../../../tools/utils/storage');

const transformedData: ARBAUIModel = databaseConverter(data[0]);

describe('ARBAColumnConfiguration component', () => {
  testColumnConfiguration<ARBAColumn, Partial<ARBAAPIModel>>(
    ARBAColumnConfiguration,
    transformedData
  );
});
