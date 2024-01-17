import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { ContentType } from '../../../shared/types/resultsDownload';

import resultFields from '../../__mocks__/resultFields';
import results from './results';
import entry from './swissprotEntry';

import noResults from './noResults.json';
import mockFasta from './fasta.json';

const mock = new MockAdapter(axios);
mock
  .onGet(/.+noresult/)
  .reply(200, noResults, { 'x-total-results': 0 })
  .onGet(/\/uniprotkb\/search.*&format=fasta.*/)
  .reply(200, mockFasta, { 'content-type': ContentType.fasta })
  .onGet(/\/uniprotkb\/search/)
  .reply(200, results, { 'x-total-results': 25 })
  .onGet(/\/uniprotkb\/result-fields/)
  .reply(200, resultFields)
  .onGet(/\/uniprotkb\/stream/)
  .reply(200, mockFasta, { 'content-type': ContentType.fasta })
  .onGet(/\/uniprotkb\//)
  .reply(200, entry);
