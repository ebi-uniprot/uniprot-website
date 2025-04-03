import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import mock from '../../__mocks__/uniRefResultsData';
import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';
import UniRefColumnConfiguration, {
  UniRefColumn,
} from '../UniRefColumnConfiguration';

jest.mock('../../../shared/workers/jobs/utils/storage');

describe('UniRefColumnConfiguration component', () => {
  testColumnConfiguration<UniRefColumn, Partial<UniRefLiteAPIModel>>(
    UniRefColumnConfiguration,
    mock.results[0]
  );
});
