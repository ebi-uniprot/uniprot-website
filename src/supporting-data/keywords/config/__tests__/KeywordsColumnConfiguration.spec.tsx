import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/keywordsModelData';
import citationsConverter, {
  type KeywordsAPIModel,
  type KeywordsUIModel,
} from '../../adapters/keywordsConverter';
import KeywordsColumnConfiguration, {
  type KeywordsColumn,
} from '../KeywordsColumnConfiguration';

jest.mock('../../../../shared/workers/jobs/utils/storage');

const transformedData: KeywordsUIModel = citationsConverter(data[0]);
describe('KeywordsColumnConfiguration component', () => {
  // TODO: find mock data to create non-null parent, sites, synonym snapshots
  testColumnConfiguration<KeywordsColumn, Partial<KeywordsAPIModel>>(
    KeywordsColumnConfiguration,
    transformedData
  );
});
