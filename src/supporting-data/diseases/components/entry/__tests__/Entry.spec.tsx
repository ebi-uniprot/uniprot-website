import { Location } from '../../../../../app/config/urls';
import testEntryCanonical from '../../../../../shared/__test-helpers__/testEntryCanonical';
import { Namespace } from '../../../../../shared/types/namespaces';
import mockData from '../../../__mocks__/diseasesModelData';
import Entry from '../Entry';

describe('DiseasesEntry head tags', () => {
  testEntryCanonical({
    namespace: Namespace.diseases,
    location: Location.DiseasesEntry,
    accession: 'DI-01559',
    data: mockData[0],
    Entry,
  });
});
