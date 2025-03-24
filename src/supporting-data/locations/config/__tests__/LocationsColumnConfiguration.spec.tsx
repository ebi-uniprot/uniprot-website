import testColumnConfiguration from '../../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/locationsModelData';
import locationsConverter, {
  LocationsAPIModel,
  LocationsUIModel,
} from '../../adapters/locationsConverter';
import LocationsColumnConfiguration, {
  LocationsColumn,
} from '../LocationsColumnConfiguration';

jest.mock('../../../../tools/utils/storage');

const transformedData: LocationsUIModel = locationsConverter(data[0]);
describe('LocationsColumnConfiguration component', () => {
  // TODO: find mock data to create non-null links, note, references snapshots
  testColumnConfiguration<LocationsColumn, Partial<LocationsAPIModel>>(
    LocationsColumnConfiguration,
    transformedData
  );
});
