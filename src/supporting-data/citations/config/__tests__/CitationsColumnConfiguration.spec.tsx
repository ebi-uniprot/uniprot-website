import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/citationsModelData';
import citationsConverter, {
  type CitationsAPIModel,
  type CitationsUIModel,
} from '../../adapters/citationsConverter';
import CitationsColumnConfiguration, {
  type CitationsColumn,
} from '../CitationsColumnConfiguration';

jest.mock('../../../../shared/workers/jobs/utils/storage');

const transformedData: CitationsUIModel = citationsConverter(data[0]);

describe('CitationsColumnConfiguration component', () => {
  testColumnConfiguration<CitationsColumn, Partial<CitationsAPIModel>>(
    CitationsColumnConfiguration,
    transformedData
  );
});
