import { Location } from '../../../../../app/config/urls';
import testEntryCanonical from '../../../../../shared/__test-helpers__/testEntryCanonical';
import { Namespace } from '../../../../../shared/types/namespaces';
import mockData from '../../../__mocks__/keywordsModelData';
import Entry from '../Entry';

describe('KeywordsEntry head tags', () => {
  testEntryCanonical({
    namespace: Namespace.keywords,
    location: Location.KeywordsEntry,
    accession: 'KW-0021',
    data: mockData[0],
    Entry,
  });
});
