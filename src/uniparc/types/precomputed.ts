import type { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';

// The precomputed endpoint returns only this subset of UniProtkbAPIModel
// fields — empirically, the union of top-level keys across the downloaded
// corpus (`transformer-gap/downloads/precomputed/`). `entryType` and
// `uniProtkbId` are returned too but with precomputed-specific values.
export type UniParcPrecomputedModel = Pick<
  UniProtkbAPIModel,
  | 'annotationScore'
  | 'comments'
  | 'extraAttributes'
  | 'features'
  | 'keywords'
  | 'primaryAccession'
  | 'proteinDescription'
> & {
  entryType: 'AA';
  uniProtkbId: null;
};
