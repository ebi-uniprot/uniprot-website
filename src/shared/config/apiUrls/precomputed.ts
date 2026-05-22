import joinUrl from 'url-join';

import { Namespace } from '../../types/namespaces';
import { apiPrefix } from './apiPrefix';

// Precomputed UniParc annotations. Path params (unlike UniFire's query params).
// Returns HTTP 404 when there is no precomputed data for the entry.
export const precomputedUniParcAnnotation = (
  uniparcId: string,
  taxId: string
) => joinUrl(apiPrefix, Namespace.uniprotkb, 'precomputed', uniparcId, taxId);

export default { precomputedUniParcAnnotation };
