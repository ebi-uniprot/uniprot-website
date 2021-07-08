import CitationsColumnConfiguration, {
  CitationsColumn,
} from '../CitationsColumnConfiguration';

import citationsConverter, {
  CitationsAPIModel,
  CitationsUIModel,
} from '../../adapters/citationsConverter';

import data from '../../__mocks__/citationsModelData';
import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';

jest.mock('../../../../tools/utils/storage');

const transformedData: CitationsUIModel = citationsConverter(data[0]);

describe('CitationsColumnConfiguration component', () => {
  testColumnConfiguration<CitationsColumn, Partial<CitationsAPIModel>>(
    CitationsColumnConfiguration,
    transformedData
  );
});
