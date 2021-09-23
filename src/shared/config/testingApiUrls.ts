/* eslint-disable no-console */
// TODO: eventually delete this file
import urlJoin from 'url-join';
import { apiPrefix } from './apiUrls';

// set to true if testing new API changes
const apiTesting = false;

if (apiTesting) {
  console.warn('❗❗❗ USING API TESTING ENDPOINT - DO NOT USE IN PRODUCTION');
}

const joinUrlForApiTesting = (prefix: string, ...paths: string[]) => {
  // Due to the way the API is served it's impossible to unify all of the testing servers to a single domain:port.
  // The map below encodes the various namespace/path combinations in the confluence document:
  // https://www.ebi.ac.uk/seqdb/confluence/display/UniProt/Managing+RESTful+Services#ManagingRESTfulServices-ProteomeandGenecentricServices
  // Guoying has remarked that this is temporary until we have k8s production servers live then wwwdev will be the new testing VM
  const apiTestingProtocolDomain = (port: number) =>
    `http://hx-rke-wp-webadmin-02-worker-1.caas.ebi.ac.uk:${port}/uniprot/beta/api`;
  const endpointToPort = {
    uniprotkb: 32545,
    uniref: 30157,
    uniparc: 30092,
    proteomes: 31114,
    unisave: 30157,
    // supporting data
    taxonomy: 9606,
    keywords: 9606,
    citations: 9606,
    diseases: 9606,
    database: 9606,
    locations: 9606,
    // tools
    idmapping: 30361,
    // other
    help: 31684,
    genecentric: 8092,
    arba: 32137,
    unirule: 32137,
    configure: 30510,
  };
  const defaultEndpointToPort = 9606; // default for all support data
  let newPrefix = prefix;
  if (apiTesting && prefix === apiPrefix && paths?.[0]) {
    // joinUrl(apiPrefix, `/${namespace}/search`),
    const endpoint = paths[0]
      .split('/')
      .filter(Boolean)[0] as keyof typeof endpointToPort;
    if (endpoint && endpoint in endpointToPort) {
      const port = endpointToPort[endpoint] || defaultEndpointToPort;
      newPrefix = apiTestingProtocolDomain(port);
    } else {
      console.error(`${endpoint} not in endpointToPort mapping`);
    }
  }
  return urlJoin(newPrefix, ...paths);
};

export default joinUrlForApiTesting;
