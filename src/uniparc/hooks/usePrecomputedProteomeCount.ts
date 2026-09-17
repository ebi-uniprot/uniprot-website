import { type Method } from 'axios';

import useDataApi from '../../shared/hooks/useDataApi';
import uniparcApiUrls from '../config/apiUrls';

const fetchOptions: { method: Method } = { method: 'HEAD' };

/**
 * Number of precomputed UniProtKB annotation documents for a proteome,
 * 0 until known (still loading, no data for this proteome, or endpoint
 * unavailable). Probes the paginated endpoint with size=0 — HEAD returns
 * x-total-results for ~no payload; an unknown/empty proteome 404s, which
 * useDataApi surfaces as no headers, i.e. 0.
 */
const usePrecomputedProteomeCount = (upId?: string) => {
  const { headers } = useDataApi(
    upId
      ? uniparcApiUrls.precomputedProteomeAnnotations(upId, { size: 0 })
      : null,
    fetchOptions
  );
  /* The header is what we have been given a count in, whatever the response it
  came on: anything else — no header at all, or one holding something that
  isn't a number — is no count, rather than the NaN it would otherwise read as. */
  const count = +(headers?.['x-total-results'] || 0);
  return Number.isFinite(count) ? count : 0;
};

export default usePrecomputedProteomeCount;
