// TODO: eventually delete this file
import urlJoin from 'url-join';

import * as logging from '../utils/logging';

import { apiPrefix } from './apiUrls';

// set to true if testing new API changes
const apiTesting = false;

if (apiTesting) {
  logging.warn('❗❗❗ USING API TESTING ENDPOINT - DO NOT USE IN PRODUCTION');
}

const joinUrlForApiTesting = (prefix: string, ...paths: string[]) => {
  let newPrefix = prefix;
  if (apiTesting && prefix === apiPrefix && paths?.[0]) {
    newPrefix = 'https://wwwdev.ebi.ac.uk/uniprot/beta/api';
  }
  return urlJoin(newPrefix, ...paths);
};

export default joinUrlForApiTesting;
