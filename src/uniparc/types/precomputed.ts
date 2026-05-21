import type { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';

// The precomputed endpoint returns only this subset of UniProtkbAPIModel
// fields — empirically, the union of top-level keys across the downloaded
// corpus (`transformer-gap/downloads/precomputed/`). `entryType`,
// `uniProtkbId` and `annotationScore` are returned too but with
// precomputed-specific values.
export type UniParcPrecomputedModel = Pick<
  UniProtkbAPIModel,
  | 'comments'
  | 'extraAttributes'
  | 'features'
  | 'keywords'
  | 'primaryAccession'
  | 'proteinDescription'
> & {
  entryType: 'AA';
  uniProtkbId: null;
  // Always 0.0 for precomputed entries (verified across all 250 corpus files) —
  // the annotation score is meaningful only for curated UniProtKB entries.
  // Do NOT render it on UniParc sub-entry pages.
  annotationScore: 0;
};
