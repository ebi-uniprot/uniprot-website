import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../KeywordsColumnConfiguration';

import citationsConverter, {
  KeywordsAPIModel,
  KeywordsUIModel,
} from '../../adapters/keywordsConverter';

import data from '../../__mocks__/keywordsModelData';
import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';

jest.mock('../../../../tools/utils/storage');

const transformedData: KeywordsUIModel = citationsConverter(data[0]);
describe('KeywordsColumnConfiguration component', () => {
  // TODO: find mock data to create non-null parent, sites, synonym snapshots
  testColumnConfiguration<KeywordsColumn, Partial<KeywordsAPIModel>>(
    KeywordsColumnConfiguration,
    transformedData
  );
});
