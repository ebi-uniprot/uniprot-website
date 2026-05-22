import type { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';

/**
 * The precomputed-endpoint response for a UniParc sub-entry.
 *
 * It *is* a `UniProtkbAPIModel` — the precomputed pipeline emits the standard
 * UniProtKB API shape — with three fields pinned to entry-independent values
 * and `proteinExistence` absent. It is deliberately modelled as
 * `Omit<UniProtkbAPIModel, …>` rather than a hand-picked subset of keys:
 * `precomputedToUniProtkbConverter` spreads the whole object through to
 * `uniProtKbConverter`, so every API field must stay typed — otherwise a field
 * the endpoint starts returning later would pass through silently untyped.
 *
 * (Empirically today's corpus only populates `comments`, `extraAttributes`,
 * `features`, `keywords`, `primaryAccession` and `proteinDescription` — but
 * that is an observation about the current data, not a contract, so it is not
 * encoded in the type.)
 */
export type UniParcPrecomputedModel = Omit<
  UniProtkbAPIModel,
  'annotationScore' | 'entryType' | 'proteinExistence' | 'uniProtkbId'
> & {
  entryType: 'AA';
  uniProtkbId: null;
  // Always 0.0 for precomputed entries (verified across the corpus) — the
  // annotation score is meaningful only for curated UniProtKB entries.
  // Do NOT render it on UniParc sub-entry pages.
  annotationScore: 0;
};
