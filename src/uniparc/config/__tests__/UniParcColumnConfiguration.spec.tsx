import UniParcColumnConfiguration, {
  UniParcColumn,
} from '../UniParcColumnConfiguration';

import uniParcConverter, {
  UniParcLiteAPIModel,
  UniParcUIModel,
} from '../../adapters/uniParcConverter';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';

import data from '../../__mocks__/uniParcLightEntryModelData';

jest.mock('../../../tools/utils/storage');

const transformedData: UniParcUIModel = uniParcConverter(data);

describe('UniParcColumnConfiguration component', () => {
  testColumnConfiguration<UniParcColumn, UniParcLiteAPIModel>(
    UniParcColumnConfiguration,
    transformedData
  );
});
