import { Location } from '../../../../../app/config/urls';
import testEntryCanonical from '../../../../../shared/__test-helpers__/testEntryCanonical';
import { Namespace } from '../../../../../shared/types/namespaces';
import mockData from '../../../__mocks__/locationsModelData';
import Entry from '../Entry';

describe('LocationsEntry head tags', () => {
  testEntryCanonical({
    namespace: Namespace.locations,
    location: Location.LocationsEntry,
    accession: 'SL-0037',
    data: mockData[0],
    Entry,
  });
});
