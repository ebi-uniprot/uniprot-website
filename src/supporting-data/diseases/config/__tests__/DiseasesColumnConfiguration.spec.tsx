import { MemoryRouter } from 'react-router-dom';

import DiseasesColumnConfiguration from '../DiseasesColumnConfiguration';

import diseasesConverter, {
  DiseasesAPIModel,
  DiseasesUIModel,
} from '../../adapters/diseasesConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/diseasesModelData';

jest.mock('../../../tools/utils/storage');

describe('DiseasesColumnConfiguration component', () => {
  let transformedData: DiseasesUIModel;

  beforeAll(() => {
    transformedData = diseasesConverter(data as DiseasesAPIModel);
  });

  for (const [key, column] of DiseasesColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
