import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import results from './results';
import noResults from './noResults.json';
import entry from './swissprotEntry';
import resultFields from '../../__mocks__/resultFields';
import mockFasta from './fasta.json';

const mock = new MockAdapter(axios);
mock
  .onGet(/.+noresult/)
  .reply(200, noResults, { 'x-total-records': 0 })
  .onGet(/\/uniprotkb\/search.*&format=fasta.*/)
  .reply(200, mockFasta, { 'content-type': 'text/fasta' })
  .onGet(/\/uniprotkb\/search/)
  .reply(200, results, { 'x-total-records': 25 })
  .onGet(/\/uniprotkb\/result-fields/)
  .reply(200, resultFields)
  .onGet(/\/uniprotkb\/stream/)
  .reply(200, mockFasta, { 'content-type': 'text/fasta' })
  .onGet(/\/uniprotkb\//)
  .reply(200, entry);

export default mock;
