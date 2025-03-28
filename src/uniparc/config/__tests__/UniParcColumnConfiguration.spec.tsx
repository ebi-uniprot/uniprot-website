import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniParcLightEntryModelData';
import uniParcConverter, {
  UniParcLiteAPIModel,
  UniParcUIModel,
} from '../../adapters/uniParcConverter';
import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../UniParcColumnConfiguration';

jest.mock('../../../tools/utils/storage');

const transformedData: UniParcUIModel = uniParcConverter(data);

describe('UniParcColumnConfiguration component', () => {
  testColumnConfiguration<UniParcColumn, UniParcLiteAPIModel>(
    UniParcColumnConfiguration,
    transformedData
  );
});
