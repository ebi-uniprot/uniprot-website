import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/taxonomyModelData';
import taxonomyConverter, {
  TaxonomyAPIModel,
  TaxonomyUIModel,
} from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../TaxonomyColumnConfiguration';

jest.mock('../../../../tools/utils/storage');

const transformedData: TaxonomyUIModel = taxonomyConverter(data[0]);

describe('TaxonomyColumnConfiguration component', () => {
  // TODO: find mock data to create non-null host, links, strain, synonym snapshots
  testColumnConfiguration<TaxonomyColumn, Partial<TaxonomyAPIModel>>(
    TaxonomyColumnConfiguration,
    transformedData
  );
});
