import ProteomesColumnConfiguration from '../ProteomesColumnConfiguration';

import proteomesConverter, {
  ProteomesAPIModel,
  ProteomesUIModel,
} from '../../adapters/proteomesConverter';
import customRender from '../../../shared/__test-helpers__/customRender';

import data from '../../__mocks__/proteomesEntryModelData';

jest.mock('../../../tools/utils/storage');

describe('ProteomesColumnConfiguration component', () => {
  let transformedData: ProteomesUIModel;

  beforeAll(() => {
    transformedData = proteomesConverter(data as ProteomesAPIModel);
  });

  test.each(Array.from(ProteomesColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(
        <>{column.render(transformedData)}</>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
