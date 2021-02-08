import { MemoryRouter } from 'react-router-dom';

import ProteomesColumnConfiguration from '../ProteomesColumnConfiguration';

import proteomesConverter, {
  ProteomesAPIModel,
  ProteomesUIModel,
} from '../../adapters/proteomesConverter';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/entryModelData.json';

jest.mock('../../../tools/utils/storage');

describe('ProteomesColumnConfiguration component', () => {
  let transformedData: ProteomesUIModel;

  beforeAll(() => {
    transformedData = proteomesConverter(data as ProteomesAPIModel);
  });

  for (const [key, column] of ProteomesColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
