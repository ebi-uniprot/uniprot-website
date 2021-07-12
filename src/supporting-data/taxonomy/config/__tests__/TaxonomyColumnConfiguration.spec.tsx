import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../TaxonomyColumnConfiguration';

import taxonomyConverter, {
  TaxonomyAPIModel,
  TaxonomyUIModel,
} from '../../adapters/taxonomyConverter';

import data from '../../__mocks__/taxonomyModelData';
import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';

jest.mock('../../../../tools/utils/storage');

const transformedData: TaxonomyUIModel = taxonomyConverter(data[0]);

describe('TaxonomyColumnConfiguration component', () => {
  // TODO: find mock data to create non-null host, links, strain, synonym snapshots
  testColumnConfiguration<TaxonomyColumn, Partial<TaxonomyAPIModel>>(
    TaxonomyColumnConfiguration,
    transformedData
  );
});
