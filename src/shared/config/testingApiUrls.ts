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
  // Due to the way the API is served it's impossible to unify all of the testing servers to a single domain:port.
  // The map below encodes the various namespace/path combinations in the confluence document:
  // https://www.ebi.ac.uk/seqdb/confluence/display/UniProt/Managing+RESTful+Services#ManagingRESTfulServices-ProteomeandGenecentricServices
  // Guoying has remarked that this is temporary until we have k8s production servers live then wwwdev will be the new testing VM
  const apiTestingProtocolDomain = (port: number) =>
    `http://hx-rke-wp-webadmin-02-worker-1.caas.ebi.ac.uk:${port}/uniprot/beta/api`;
  const endpointToPort = {
    uniprotkb: 31102,
    uniref: 30644,
    uniparc: 31105,
    proteomes: 30839,
    unisave: 30243,
    // supporting data
    taxonomy: 31095,
    keywords: 31095,
    citations: 31095,
    diseases: 31095,
    database: 31095,
    locations: 31095,
    // tools
    idmapping: 31369,
    // other
    help: 31838,
    contact: 31838,
    genecentric: 8092,
    arba: 31599,
    unirule: 31599,
    configure: 31095,
  };
  let newPrefix = prefix;
  if (apiTesting && prefix === apiPrefix && paths?.[0]) {
    const endpoint = paths[0]
      .split('/')
      .filter(Boolean)[0] as keyof typeof endpointToPort;
    if (endpoint && endpoint in endpointToPort) {
      const port = endpointToPort[endpoint];
      newPrefix = apiTestingProtocolDomain(port);
    } else {
      logging.error(`${endpoint} not in endpointToPort mapping`);
    }
  }
  return urlJoin(newPrefix, ...paths);
};

export default joinUrlForApiTesting;
