import { MemoryRouter } from 'react-router-dom';

import LocationsColumnConfiguration from '../LocationsColumnConfiguration';

import locationsConverter, {
  LocationsAPIModel,
  LocationsUIModel,
} from '../../adapters/locationsConverter';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import data from '../../__mocks__/locationsModelData';

jest.mock('../../../../tools/utils/storage');

describe('LocationsColumnConfiguration component', () => {
  let transformedData: LocationsUIModel;

  beforeAll(() => {
    transformedData = locationsConverter(data[0] as LocationsAPIModel);
  });

  for (const [key, column] of LocationsColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
