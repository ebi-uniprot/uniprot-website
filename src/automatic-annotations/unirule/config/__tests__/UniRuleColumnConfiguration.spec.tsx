import UniRuleColumnConfiguration, {
  UniRuleColumn,
} from '../UniRuleColumnConfiguration';

import databaseConverter, {
  UniRuleAPIModel,
  UniRuleUIModel,
} from '../../adapters/uniRuleConverter';
import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';

import data from '../../__mocks__/uniRuleModelData';

jest.mock('../../../../tools/utils/storage');

const transformedData: UniRuleUIModel = databaseConverter(data[1]);

describe('UniRuleColumnConfiguration component', () => {
  testColumnConfiguration<UniRuleColumn, Partial<UniRuleAPIModel>>(
    UniRuleColumnConfiguration,
    transformedData
  );
});
