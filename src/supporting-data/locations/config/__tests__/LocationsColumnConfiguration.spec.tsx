import { MemoryRouter } from 'react-router-dom';

import LocationsColumnConfiguration from '../LocationsColumnConfiguration';

import locationsConverter, {
  LocationsAPIModel,
  LocationsUIModel,
} from '../../adapters/locationsConverter';
import customRender from '../../../../shared/__test-helpers__/customRender';

import data from '../../__mocks__/locationsModelData';

jest.mock('../../../../tools/utils/storage');

describe('LocationsColumnConfiguration component', () => {
  let transformedData: LocationsUIModel;

  beforeAll(() => {
    transformedData = locationsConverter(data[0] as LocationsAPIModel);
  });

  // TODO: find mock data to create non-null links, note, references snapshots
  test.each(Array.from(LocationsColumnConfiguration.entries()))(
    `should render column "%s"`,
    (key, column) => {
      const { asFragment } = customRender(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    }
  );
});
