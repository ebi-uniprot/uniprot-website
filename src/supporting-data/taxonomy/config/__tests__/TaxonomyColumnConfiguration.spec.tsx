import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/taxonomyModelData';
import taxonomyConverter, {
  type TaxonomyAPIModel,
  type TaxonomyUIModel,
} from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  type TaxonomyColumn,
} from '../TaxonomyColumnConfiguration';

jest.mock('../../../../shared/workers/jobs/utils/storage');

const transformedData: TaxonomyUIModel = taxonomyConverter(data[0]);

describe('TaxonomyColumnConfiguration component', () => {
  // TODO: find mock data to create non-null host, links, strain, synonym snapshots
  testColumnConfiguration<TaxonomyColumn, Partial<TaxonomyAPIModel>>(
    TaxonomyColumnConfiguration,
    transformedData
  );
});
