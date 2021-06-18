// TODO: eventually delete this file
import urlJoin from 'url-join';
import { apiPrefix } from './apiUrls';

// set to true if testing new API changes
const apiTesting = false;

const joinUrlForApiTesting = (prefix: string, ...paths: string[]) => {
  // Due to the way the API is served it's impossible to unify all of the testing servers to a single domain:port.
  // The map below encodes the various namespace/path combinations in the confluence document:
  // https://www.ebi.ac.uk/seqdb/confluence/display/UniProt/Managing+RESTful+Services#ManagingRESTfulServices-ProteomeandGenecentricServices
  // Guoying has remarked that this is temporary until we have k8s production servers live then wwwdev will be the new testing VM
  const apiTestingProtocolDomain = 'http://wp-np2-be';
  const endpointToPort = {
    uniprotkb: 8090,
    uniref: 8091,
    uniparc: 8093,
    proteomes: 8092,
    // supporting data
    taxonomy: 8095,
    keywords: 8095,
    citations: 8095,
    diseases: 8095,
    database: 8095,
    locations: 8095,
    // other
    genecentric: 8092,
  };
  const defaultEndpointToPort = 8095; // default to 8095 for all support data and configure
  let newPrefix = prefix;
  if (apiTesting && prefix === apiPrefix && paths?.[0]) {
    // joinUrl(apiPrefix, `/${namespace}/search`),
    const endpoint = paths[0].split('/').filter(Boolean)[0];
    if (endpoint) {
      const port =
        endpointToPort[endpoint as keyof typeof endpointToPort] ||
        defaultEndpointToPort;
      newPrefix = `${apiTestingProtocolDomain}:${port}`;
    }
  }
  return urlJoin(newPrefix, ...paths);
};

export default joinUrlForApiTesting;
