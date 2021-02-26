import { MemoryRouter } from 'react-router-dom';

import TaxonomyColumnConfiguration from '../TaxonomyColumnConfiguration';

import taxonomyConverter, {
  TaxonomyAPIModel,
  TaxonomyUIModel,
} from '../../adapters/taxonomyConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/taxonomyModelData';

jest.mock('../../../tools/utils/storage');

describe('TaxonomyColumnConfiguration component', () => {
  let transformedData: TaxonomyUIModel;

  beforeAll(() => {
    transformedData = taxonomyConverter(data as TaxonomyAPIModel);
  });

  for (const [key, column] of TaxonomyColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
