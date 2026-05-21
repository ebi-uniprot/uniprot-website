import joinUrl from 'url-join';

import { Namespace } from '../../types/namespaces';
import { stringifyUrl } from '../../utils/url';

// TEMPORARY: during the dev rollout, precomputed annotations are served from
// wwwdev while UniFire's `run` service is only on rest.uniprot.org. So under
// `yarn start:dev` (`apiPrefix` → wwwdev) UniFire must be pinned to its host
// rather than follow `apiPrefix`. Once everything is served from
// rest.uniprot.org, delete UNIFIRE_HOST and build this from `apiPrefix` like
// every other API URL.
const UNIFIRE_HOST = 'https://rest.uniprot.org';

export const unifire = (uniparcId: string, taxId: string) =>
  stringifyUrl(joinUrl(UNIFIRE_HOST, Namespace.uniprotkb, 'unifire', 'run'), {
    id: uniparcId,
    taxId,
  });

export default { unifire };
