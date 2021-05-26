import DiseasesColumnConfiguration from '../DiseasesColumnConfiguration';

import diseasesConverter, {
  DiseasesAPIModel,
  DiseasesUIModel,
} from '../../adapters/diseasesConverter';
import customRender from '../../../../shared/__test-helpers__/customRender';

import data from '../../__mocks__/diseasesModelData';

jest.mock('../../../../tools/utils/storage');

describe('DiseasesColumnConfiguration component', () => {
  let transformedData: DiseasesUIModel;

  beforeAll(() => {
    transformedData = diseasesConverter(data[0] as DiseasesAPIModel);
  });

  // TODO: find mock data to create non-null unreviewed_protein_count snapshot
  test.each(Array.from(DiseasesColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(
        <>{column.render(transformedData)}</>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
