import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/proteomesEntryModelData';
import proteomesConverter, {
  type ProteomesUIModel,
} from '../../adapters/proteomesConverter';
import ProteomesColumnConfiguration, {
  type ProteomesColumn,
} from '../ProteomesColumnConfiguration';

jest.mock('../../../shared/workers/jobs/utils/storage');

const transformedData: ProteomesUIModel = proteomesConverter(data);

describe('ProteomesColumnConfiguration component', () => {
  testColumnConfiguration<ProteomesColumn, ProteomesUIModel>(
    ProteomesColumnConfiguration,
    transformedData
  );
});
