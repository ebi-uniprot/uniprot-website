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
  const { headers } = useDataApi(
    accession ? externalUrls.CommunityCuratedQuery(accession) : null,
    fetchOptions
  );
  return +(headers?.['x-total-results'] || 0);
};

export default useCommunityCuratedCount;
