import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import results from './results.json';
import noResults from './noResults.json';
import entry from './swissprotEntry.json';
import resultFields from './resultFields.json';

const mock = new MockAdapter(axios);
mock.onGet(/.+noresult/).reply(200, noResults, { 'x-total-records': 25 });
mock
  .onGet(/\/uniprotkb\/search/)
  .reply(200, results, { 'x-total-records': 25 });
mock.onGet(/\/uniprotkb\/result\-fields/).reply(200, resultFields);
mock.onGet(/\/uniprotkb\//).reply(200, entry);

export default mock;
