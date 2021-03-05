import { MemoryRouter } from 'react-router-dom';

import CitationsColumnConfiguration from '../CitationsColumnConfiguration';

import citationsConverter, {
  CitationsAPIModel,
  CitationsUIModel,
} from '../../adapters/citationsConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/citationsModelData';

jest.mock('../../../../tools/utils/storage');

describe('CitationsColumnConfiguration component', () => {
  let transformedData: CitationsUIModel;

  beforeAll(() => {
    transformedData = citationsConverter(data[0] as CitationsAPIModel);
  });

  for (const [key, column] of CitationsColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
