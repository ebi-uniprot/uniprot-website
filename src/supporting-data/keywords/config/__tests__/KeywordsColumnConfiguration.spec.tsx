import KeywordsColumnConfiguration from '../KeywordsColumnConfiguration';

import citationsConverter, {
  KeywordsAPIModel,
  KeywordsUIModel,
} from '../../adapters/keywordsConverter';
import customRender from '../../../../shared/__test-helpers__/customRender';

import data from '../../__mocks__/keywordsModelData';

jest.mock('../../../../tools/utils/storage');

describe('KeywordsColumnConfiguration component', () => {
  let transformedData: KeywordsUIModel;

  beforeAll(() => {
    transformedData = citationsConverter(data[0] as KeywordsAPIModel);
  });

  // TODO: find mock data to create non-null parent, sites, synonym snapshots
  test.each(Array.from(KeywordsColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(
        <>{column.render(transformedData)}</>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
