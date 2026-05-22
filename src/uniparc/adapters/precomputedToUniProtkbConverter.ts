import * as logging from '../../shared/utils/logging';
import { type UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { type UniParcPrecomputedModel } from '../types/precomputed';

/**
 * Runtime guard for a precomputed-endpoint response. Light by design — a
 * precomputed payload already *is* a `UniProtkbAPIModel` shape — so it checks
 * only what would break `uniProtKbConverter` downstream: a string
 * `primaryAccession`, and array-typed annotation collections when present.
 * Mirrors the validation the UniFire branch does via `isValidUniFireModel`,
 * keeping both inputs to the shared pipeline guarded at the boundary.
 */
function isValidPrecomputedModel(
  data: unknown
): data is UniParcPrecomputedModel {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const obj = data as Record<string, unknown>;
  if (typeof obj.primaryAccession !== 'string') {
    return false;
  }
  return (['comments', 'features', 'keywords'] as const).every(
    (key) => obj[key] === undefined || Array.isArray(obj[key])
  );
}

/**
 * Lifts a precomputed-endpoint response into a `UniProtkbAPIModel` so it runs
 * through `uniProtKbConverter` — the same pipeline as the UniFire branch (see
 * `uniFireToUniProtkbConverter`). A `UniParcPrecomputedModel` already *is* a
 * `UniProtkbAPIModel` apart from `uniProtkbId` (`null`) and the omitted
 * `proteinExistence`; fill both with empty-string placeholders.
 *
 * Throws (after logging) on malformed input — same contract as
 * `uniFireToUniProtkbConverter`; the caller's try/catch degrades to no
 * annotations.
 */
const precomputedToUniProtkbConverter = (data: unknown): UniProtkbAPIModel => {
  if (!isValidPrecomputedModel(data)) {
    const accession =
      (data as Record<string, unknown>)?.primaryAccession ?? 'unknown';
    const message = `Invalid UniParcPrecomputedModel input for accession: ${accession}`;
    logging.error(message);
    throw new Error(message);
  }
  return {
    ...data,
    uniProtkbId: '',
    proteinExistence: '',
  };
};

export { isValidPrecomputedModel };
export default precomputedToUniProtkbConverter;
