import * as logging from '../../../shared/utils/logging';
import featureTooltip from './featureTooltip';
import interproTooltip from './interproTooltip';
import proteomicsAdapter from './proteomicsAdapter';
import proteomicsPtmAdapter from './proteomicsPtmAdapter';
import rnaEditingTooltip from './rnaEditingTooltip';
import structureTooltip from './structureTooltip';
import variationTooltip from './variationTooltip';

type Payload = Record<string, unknown>;

// Keyed by protvista-uniprot v5 semantic `kind`. A kind absent from this map
// falls back to the library's own `feature.tooltipContent`.
// `peptides` and `peptides-ptm` are absent on purpose. Their rich tooltips
// depend on data the built-in adapters discard (the raw `PROTEOMICS_PTM` type,
// the response `taxid`, the `ptms` payload), so they are pre-computed by our
// replacement adapters and reach us through that fallback instead of being
// rebuilt here from an already-flattened feature. See `registerRichAdapters`.
//
// `claims` disambiguates a collapsed group, whose single aggregate track mixes
// features from every track in the group (DOMAINS pairs `features` with
// `features-interpro`, PTM pairs `features` with `peptides-ptm`, …). Order is
// most specific first: the first kind offered by the row that claims the
// feature wins. The `never` parameter lets builders with unrelated payload
// types share one map; the payload is only known at runtime.
const tooltipBuilders: Array<{
  kind: string;
  build: (feature: never) => string;
  claims: (feature: Payload) => boolean;
}> = [
  {
    kind: 'features-interpro',
    build: interproTooltip,
    claims: (f) =>
      f.type === 'InterPro Representative Domain' ||
      (typeof f.source_database === 'string' &&
        typeof f.accession === 'string'),
  },
  {
    kind: 'rna-editing',
    build: rnaEditingTooltip,
    claims: (f) => Boolean(f.variantType),
  },
  {
    kind: 'structure-coverage',
    build: structureTooltip,
    claims: (f) => Array.isArray(f.structures),
  },
  {
    kind: 'variants',
    build: variationTooltip,
    claims: (f) => 'wildType' in f,
  },
  {
    kind: 'features',
    build: featureTooltip,
    // MOD_RES_LS carries richer content pre-computed by our PTM adapter, so
    // leave it to that rather than flattening it to a plain feature.
    claims: (f) => f.type !== 'MOD_RES_LS',
  },
];

/**
 * @param kinds the semantic kind of the clicked track, or — for a collapsed
 *   group — every kind that group can contain.
 */
export const getTooltipContent = (
  kinds: string | readonly string[] | undefined,
  feature: unknown
): string | undefined => {
  if (!kinds || !feature || typeof feature !== 'object') {
    return undefined;
  }
  const offered = new Set(typeof kinds === 'string' ? [kinds] : kinds);
  const match = tooltipBuilders.find(
    ({ kind, claims }) => offered.has(kind) && claims(feature as Payload)
  );
  if (!match) {
    return undefined;
  }
  try {
    return match.build(feature as never);
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

// Each viewer holds its own registry, which grants exactly one override per
// built-in. StrictMode re-runs ref callbacks against the same element, so
// without this the second pass would throw RegistryCollisionError.
const alreadyRegistered = new WeakSet<AdapterHost>();

/**
 * Swap in the adapters whose output the site needs richer than the library's.
 * Must run before the viewer loads data — i.e. while it is still `suspend`ed.
 * Idempotent per element.
 */
export const registerRichAdapters = (host: AdapterHost) => {
  if (alreadyRegistered.has(host)) {
    return;
  }
  alreadyRegistered.add(host);
  for (const [name, adapter] of Object.entries(richAdapters)) {
    try {
      host.registerAdapter(name, adapter);
    } catch (error) {
      // The viewer still works with the built-in adapter, so a failed
      // registration must never block the mount.
      logging.warn(`Could not register a custom '${name}' adapter: ${error}`);
    }
  }
};
