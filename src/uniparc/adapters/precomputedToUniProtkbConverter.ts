import { type UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { type UniParcPrecomputedModel } from '../types/precomputed';

/**
 * Lifts a precomputed-endpoint response into a `UniProtkbAPIModel` so it runs
 * through `uniProtKbConverter` — the same pipeline as the UniFire branch (see
 * `uniFireToUniProtkbConverter`). A `UniParcPrecomputedModel` already *is* a
 * `UniProtkbAPIModel` apart from `uniProtkbId` (`null`) and the omitted
 * `proteinExistence`; fill both with empty-string placeholders.
 */
const precomputedToUniProtkbConverter = (
  data: UniParcPrecomputedModel
): UniProtkbAPIModel => ({
  ...data,
  uniProtkbId: '',
  proteinExistence: '',
});

export default precomputedToUniProtkbConverter;
