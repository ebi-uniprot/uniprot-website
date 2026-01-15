import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniParcLightEntryModelData';
import uniParcConverter, {
  type UniParcLiteAPIModel,
  type UniParcUIModel,
} from '../../adapters/uniParcConverter';
import UniParcColumnConfiguration, {
  type UniParcColumn,
} from '../UniParcColumnConfiguration';

jest.mock('../../../shared/workers/jobs/utils/storage');

const transformedData: UniParcUIModel = uniParcConverter(data);

describe('UniParcColumnConfiguration component', () => {
  testColumnConfiguration<UniParcColumn, UniParcLiteAPIModel>(
    UniParcColumnConfiguration,
    transformedData
  );
});
