import ProteomesColumnConfiguration, {
  ProteomesColumn,
} from '../ProteomesColumnConfiguration';

import proteomesConverter, {
  ProteomesAPIModel,
  ProteomesUIModel,
} from '../../adapters/proteomesConverter';
import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';

import data from '../../__mocks__/proteomesEntryModelData';

jest.mock('../../../tools/utils/storage');

const transformedData: ProteomesUIModel = proteomesConverter(data);

describe('ProteomesColumnConfiguration component', () => {
  testColumnConfiguration<ProteomesColumn, ProteomesAPIModel>(
    ProteomesColumnConfiguration,
    transformedData
  );
});
