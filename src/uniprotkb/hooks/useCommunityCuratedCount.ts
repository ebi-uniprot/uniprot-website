import { type Method } from 'axios';

import externalUrls from '../../shared/config/externalUrls';
import useDataApi from '../../shared/hooks/useDataApi';
import apiUrls from '../config/apiUrls/apiUrls';
import { communityCuratedFacet } from '../utils/CommunitySubmission';

const fetchOptions: { method: Method } = {
  method: 'HEAD',
};

/**
 * Number of community submissions held for an accession on the PIR community
 * curation site.
 */
const useCommunityCuratedCount = (accession: string) => {
  const { headers, loading, error } = useDataApi(
    externalUrls.CommunityCuratedQuery(accession),
    fetchOptions
  );
  return {
    count: +(headers?.['x-total-results'] || 0),
    loading,
    error,
  };
};

/**
 * Number of community references UniProt holds for an accession. Submissions
 * take some time to make their way from PIR into UniProt, so this can lag
 * behind the count held by PIR.
 */
export const useUniProtCommunityCuratedCount = (accession: string) => {
  const { headers, loading, error } = useDataApi(
    apiUrls.publications.entryPublications({
      accession,
      selectedFacets: [communityCuratedFacet],
      size: 0,
    })
  );
  return {
    count: +(headers?.['x-total-results'] || 0),
    loading,
    error,
  };
};

export default useCommunityCuratedCount;
