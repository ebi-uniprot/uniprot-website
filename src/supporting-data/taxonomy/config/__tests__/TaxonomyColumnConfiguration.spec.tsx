import { MemoryRouter } from 'react-router-dom';

import TaxonomyColumnConfiguration from '../TaxonomyColumnConfiguration';

import taxonomyConverter, {
  TaxonomyAPIModel,
  TaxonomyUIModel,
} from '../../adapters/taxonomyConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/taxonomyModelData';

jest.mock('../../../../tools/utils/storage');

describe('TaxonomyColumnConfiguration component', () => {
  let transformedData: TaxonomyUIModel;

  beforeAll(() => {
    transformedData = taxonomyConverter(data[0] as TaxonomyAPIModel);
  });

  // TODO: find mock data to create non-null host, links, strain, synonym snapshots
  test.each(Array.from(TaxonomyColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
