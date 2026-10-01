import featureTooltip, { type TooltipFeature } from './featureTooltip';
import interproTooltip from './interproTooltip';
import { peptidePtmTooltip, peptideTooltip } from './peptideTooltip';
import rnaEditingTooltip from './rnaEditingTooltip';
import structureTooltip from './structureTooltip';
import variationTooltip from './variationTooltip';

/** What a builder may need that the clicked feature doesn't carry. */
export type TooltipContext = { sequence: string };

type Builder = (feature: object, context: TooltipContext) => string;

// The only place protvista-uniprot's untyped feature is narrowed. The site,
// not the library, owns the shape each builder reads; the try/catch in
// getTooltipContent covers a payload that doesn't match.
const builder =
  <T>(build: (feature: T, context: TooltipContext) => string): Builder =>
  (feature, context) =>
    build(feature as T, context);

// Keyed by the protvista-uniprot semantic `kind` of the track a feature came
// from. A kind absent from this map falls back to the library's own
// `feature.tooltipContent`.
const tooltipBuilders = new Map<string, Builder>([
  // featureTooltip's second parameter is a taxon id, not the context
  ['features', builder((feature: TooltipFeature) => featureTooltip(feature))],
  ['interpro-features', builder(interproTooltip)],
  ['peptides', builder(peptideTooltip)],
  ['peptides-ptm', builder(peptidePtmTooltip)],
  ['rna-editing', builder(rnaEditingTooltip)],
  ['structure-coverage', builder(structureTooltip)],
  ['variants', builder(variationTooltip)],
]);

/**
 * @param kind the semantic kind of the track the feature came from — for a
 *   collapsed group, the feature's own source track, not the group's.
 */
export const getTooltipContent = (
  kind: string | null | undefined,
  feature: unknown,
  context: TooltipContext
): string | undefined => {
  const build = kind ? tooltipBuilders.get(kind) : undefined;
  if (!build || !feature || typeof feature !== 'object') {
    return undefined;
  }
  try {
    return build(feature, context);
  } catch {
    // A payload shape we don't recognise: let the caller fall back
    return undefined;
  }
};

export { default as featureTooltip } from './featureTooltip';
