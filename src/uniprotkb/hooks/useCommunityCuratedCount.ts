import { type Method } from 'axios';

import externalUrls from '../../shared/config/externalUrls';
import useDataApi from '../../shared/hooks/useDataApi';

const fetchOptions: { method: Method } = {
  method: 'HEAD',
};

/**
 * Number of community submissions held for an accession on the PIR community
 * curation site, 0 until known. Submissions take some time to make their way
 * into UniProt, so this can run ahead of what the current release holds —
 * which the entry counts and shares through the CommunityCuratedCountsContext.
 */
const useCommunityCuratedCount = (accession?: string) => {
  const { headers, status } = useDataApi(
    accession ? externalUrls.CommunityCuratedQuery(accession) : null,
    fetchOptions
  );
  /* A failed request carries the headers of its error response, so only a
  successful one has been given a count to read — and a non-numerical one would
  otherwise read as NaN, which is neither a count nor falsy in the same way. */
  const count = +(headers?.['x-total-results'] || 0);
  return status === 200 && Number.isFinite(count) ? count : 0;
};

export default useCommunityCuratedCount;
