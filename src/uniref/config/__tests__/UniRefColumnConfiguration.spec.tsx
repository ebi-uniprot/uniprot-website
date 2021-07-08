import UniRefColumnConfiguration, {
  UniRefColumn,
} from '../UniRefColumnConfiguration';

import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';

import mock from '../../__mocks__/UniRefResultsData';

import { UniRefLiteAPIModel } from '../../adapters/uniRefConverter';

jest.mock('../../../tools/utils/storage');

describe('UniRefColumnConfiguration component', () => {
  testColumnConfiguration<UniRefColumn, Partial<UniRefLiteAPIModel>>(
    UniRefColumnConfiguration,
    mock.results[0]
  );
});
