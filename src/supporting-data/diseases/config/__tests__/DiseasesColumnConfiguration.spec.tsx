import DiseasesColumnConfiguration, {
  DiseasesColumn,
} from '../DiseasesColumnConfiguration';

import diseasesConverter, {
  DiseasesAPIModel,
  DiseasesUIModel,
} from '../../adapters/diseasesConverter';

import data from '../../__mocks__/diseasesModelData';
import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';

jest.mock('../../../../tools/utils/storage');

const transformedData: DiseasesUIModel = diseasesConverter(data[0]);

describe('DiseasesColumnConfiguration component', () => {
  // TODO: find mock data to create non-null unreviewed_protein_count snapshot
  testColumnConfiguration<DiseasesColumn, Partial<DiseasesAPIModel>>(
    DiseasesColumnConfiguration,
    transformedData
  );
});
