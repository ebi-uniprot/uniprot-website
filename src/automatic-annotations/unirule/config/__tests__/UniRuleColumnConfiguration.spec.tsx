import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniRuleModelData';
import databaseConverter, {
  UniRuleAPIModel,
  UniRuleUIModel,
} from '../../adapters/uniRuleConverter';
import UniRuleColumnConfiguration, {
  UniRuleColumn,
} from '../UniRuleColumnConfiguration';

jest.mock('../../../../tools/utils/storage');

const transformedData: UniRuleUIModel = databaseConverter(data[1]);

describe('UniRuleColumnConfiguration component', () => {
  testColumnConfiguration<UniRuleColumn, Partial<UniRuleAPIModel>>(
    UniRuleColumnConfiguration,
    transformedData
  );
});
