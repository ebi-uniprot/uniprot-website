import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import mock from '../../__mocks__/uniRefResultsData';
import { type UniRefLiteAPIModel } from '../../adapters/uniRefConverter';
import UniRefColumnConfiguration, {
  type UniRefColumn,
} from '../UniRefColumnConfiguration';

jest.mock('../../../shared/workers/jobs/utils/storage');

describe('UniRefColumnConfiguration component', () => {
  testColumnConfiguration<UniRefColumn, Partial<UniRefLiteAPIModel>>(
    UniRefColumnConfiguration,
    mock.results[0]
  );
});
