import * as logging from '../../../shared/utils/logging';
import featureTooltip from './featureTooltip';
import interproTooltip from './interproTooltip';
import proteomicsAdapter from './proteomicsAdapter';
import proteomicsPtmAdapter from './proteomicsPtmAdapter';
import rnaEditingTooltip from './rnaEditingTooltip';
import structureTooltip from './structureTooltip';
import variationTooltip from './variationTooltip';

// Keyed by protvista-uniprot v5 semantic `kind`. A kind absent from this map
// falls back to the library's own `feature.tooltipContent`.
// `peptides` and `peptides-ptm` are absent on purpose. Their rich tooltips
// depend on data the built-in adapters discard (the raw `PROTEOMICS_PTM` type,
// the response `taxid`, the `ptms` payload), so they are pre-computed by our
// replacement adapters and reach us through that fallback instead of being
// rebuilt here from an already-flattened feature. See `registerRichAdapters`.
// The `never` parameter lets builders with unrelated payload types share one map;
// the payload is only known at runtime, hence the try/catch below.
const tooltipBuilders: Record<string, (feature: never) => string> = {
  features: featureTooltip,
  'features-interpro': interproTooltip,
  variants: variationTooltip,
  'rna-editing': rnaEditingTooltip,
  'structure-coverage': structureTooltip,
};

export const getTooltipContent = (
  kind: string | undefined,
  feature: unknown
): string | undefined => {
  const builder = kind && tooltipBuilders[kind];
  if (!builder) {
    return undefined;
  }
  try {
    return builder(feature as never);
  } catch {
    // A payload shape we don't recognise: let the caller fall back.
    return undefined;
  }
};

export { default as featureTooltip } from './featureTooltip';

/** Built-in adapters we replace. Each built-in may be overridden exactly once. */
const richAdapters = {
  'uniprot-proteomics-json': proteomicsAdapter,
  'uniprot-proteomics-ptm-json': proteomicsPtmAdapter,
};

type AdapterHost = {
  registerAdapter: (name: string, fn: (...raw: unknown[]) => unknown) => void;
};

/**
 * Swap in the adapters whose output the site needs richer than the library's.
 * Must run before the viewer loads data — i.e. while it is still `suspend`ed.
 */
export const registerRichAdapters = (host: AdapterHost) => {
  for (const [name, adapter] of Object.entries(richAdapters)) {
    try {
      host.registerAdapter(name, adapter);
    } catch (error) {
      // Registering the same name twice throws; the viewer still works with the
      // built-in adapter, so this must never block the mount.
      logging.warn(`Could not register a custom '${name}' adapter: ${error}`);
    }
  }
};
