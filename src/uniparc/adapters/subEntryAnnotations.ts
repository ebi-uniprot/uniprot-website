import * as logging from '../../shared/utils/logging';
import { type TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import uniProtKbConverter, {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
} from '../../uniprotkb/adapters/uniProtkbConverter';
import { type DatabaseInfoMaps } from '../../uniprotkb/utils/database';
import { getFallbackKeywords } from '../components/sub-entry/SubEntryKeywordsSection';
import { type UniParcPrecomputedModel } from '../types/precomputed';
import precomputedToUniProtkbConverter from './precomputedToUniProtkbConverter';
import uniFireToUniProtkbConverter from './uniFireToUniProtkbConverter';
import { type UniFireModel } from './uniParcSubEntryConverter';

/**
 * Whether to fire the on-demand UniFire request.
 *
 * UniFire *runs* the annotation pipeline, so it is requested only as a fallback:
 * after the (cheap, preferred) precomputed request has resolved
 * (`precomputedResolved`) and produced nothing (`!hasPrecomputed`). Keeping
 * `precomputedResolved` in the predicate is what stops a UniFire request from
 * firing before precomputed has had a chance to answer.
 *
 * The caller still gates this behind `canLoadUniFire` (taxId + accession known).
 */
export const shouldRequestUniFire = ({
  runUniFire,
  precomputedResolved,
  hasPrecomputed,
}: {
  runUniFire: boolean;
  precomputedResolved: boolean;
  hasPrecomputed: boolean;
}): boolean => runUniFire && precomputedResolved && !hasPrecomputed;

/**
 * Supplement the converted API model with the organism from the UniParc
 * cross-reference.
 *
 * The SubcellularLocation viz renders nothing without `organism.lineage`; the
 * xref carries a `TaxonomyDatum` with rich `Lineage` objects, so flatten it to
 * the `string[]` lineage `UniProtkbAPIModel.organism` expects. Returns
 * `apiModel` untouched when the xref has no organism.
 */
export const withOrganism = (
  apiModel: UniProtkbAPIModel,
  xrefOrganism?: TaxonomyDatum
): UniProtkbAPIModel =>
  xrefOrganism
    ? {
        ...apiModel,
        organism: {
          ...xrefOrganism,
          lineage: (xrefOrganism.lineage ?? [])
            .map((node) => node.scientificName)
            .filter((name): name is string => Boolean(name)),
        },
      }
    : apiModel;

type BuildSubEntryAnnotationsParams = {
  databaseInfoMaps: DatabaseInfoMaps | null | undefined;
  precomputed?: UniParcPrecomputedModel;
  uniFire?: UniFireModel;
  xrefOrganism?: TaxonomyDatum;
  accession?: string;
};

/**
 * Build the annotations `UniProtkbUIModel` the UniParc sub-entry sections
 * render, from whichever source populated the page.
 *
 * Precomputed is preferred (it already exists); UniFire is the fallback. The
 * chosen source is converted to a `UniProtkbAPIModel`, supplemented with the
 * organism (`withOrganism`), then run through `uniProtKbConverter` — the same
 * pipeline the UniProtKB entry page uses.
 *
 * Returns `undefined` — degrading to "no annotations" rather than crashing the
 * page — when `databaseInfoMaps` has not loaded, when neither source has data,
 * or when conversion throws. The throw is logged via `logging.error` because
 * `uniProtKbConverter`, unlike the `*ToUniProtkbConverter` functions, does not
 * log on throw.
 */
const buildSubEntryAnnotations = ({
  databaseInfoMaps,
  precomputed,
  uniFire,
  xrefOrganism,
  accession,
}: BuildSubEntryAnnotationsParams): UniProtkbUIModel | undefined => {
  if (!databaseInfoMaps) {
    return undefined;
  }
  try {
    if (precomputed) {
      const converted = uniProtKbConverter(
        withOrganism(
          precomputedToUniProtkbConverter(precomputed),
          xrefOrganism
        ),
        databaseInfoMaps
      );
      // Keywords whose category has no dedicated sub-entry section fall back to
      // the generic Keywords & GO section — they are still shown, but warn so a
      // dedicated section can be considered if a category ever turns up here.
      const fallbackKeywords = getFallbackKeywords(converted);
      if (fallbackKeywords.length) {
        logging.warn(
          `Precomputed keywords shown in the generic Keywords section — no dedicated sub-entry section for: ${fallbackKeywords
            .map((keyword) => keyword.category)
            .join(', ')}`,
          { extra: { accession } }
        );
      }
      return converted;
    }
    if (uniFire) {
      return uniProtKbConverter(
        withOrganism(uniFireToUniProtkbConverter(uniFire), xrefOrganism),
        databaseInfoMaps
      );
    }
    return undefined;
  } catch (error) {
    logging.error(
      `Failed to build UniParc sub-entry annotations: ${
        error instanceof Error ? error.message : String(error)
      }`,
      {
        extra: {
          accession,
          source: precomputed ? 'precomputed' : 'unifire',
        },
      }
    );
    return undefined;
  }
};

export default buildSubEntryAnnotations;
