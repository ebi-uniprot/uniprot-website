import featureTooltip, { type TooltipFeature } from './featureTooltip';
import { type TooltipContext } from './index';
import ptmTooltip, { type PTM } from './ptmTooltip';

// The fields protvista-uniprot's `uniprot-proteomics-json` adapter passes
// through from the Proteins API. It overwrites `type` with
// `unique`/`non_unique` for its track filters, keeping the API's own value
// (`PROTEOMICS` or `PROTEOMICS_PTM`) as `sourceType`.
type PeptideFeature = TooltipFeature & {
  sourceType?: string;
  taxid?: number;
};

export const peptideTooltip = (feature: PeptideFeature) =>
  featureTooltip(
    // The PTM, peptidoform and PeptideAtlas sections branch on the API type
    { ...feature, type: feature.sourceType ?? feature.type },
    feature.taxid == null ? undefined : String(feature.taxid)
  );

// A marker from the `uniprot-proteomics-ptm-json` adapter: one per
// modification at a position, with the API's `ptms` entries passed through.
type PtmMarker = {
  type: string;
  start: number;
  end: number;
  ptms?: PTM[];
  // `null` when the scores are missing or disagree
  confidenceScore?: string | null;
};

export const peptidePtmTooltip = (
  feature: PtmMarker,
  { sequence }: TooltipContext
) =>
  ptmTooltip(
    `${feature.type} ${feature.start}-${feature.end}`,
    feature.ptms ?? [],
    // protvista-uniprot doesn't provide the modified residue, so read it from
    // the canonical sequence the positions refer to (1-based)
    sequence.charAt(feature.start - 1),
    feature.confidenceScore ?? ''
  );
