import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniRuleModelData';
import databaseConverter, {
  type UniRuleAPIModel,
  type UniRuleUIModel,
} from '../../adapters/uniRuleConverter';
import UniRuleColumnConfiguration, {
  type UniRuleColumn,
} from '../UniRuleColumnConfiguration';

jest.mock('../../../../shared/workers/jobs/utils/storage');

const transformedData: UniRuleUIModel = databaseConverter(data[1]);

describe('UniRuleColumnConfiguration component', () => {
  testColumnConfiguration<UniRuleColumn, Partial<UniRuleAPIModel>>(
    UniRuleColumnConfiguration,
    transformedData
  );
});
