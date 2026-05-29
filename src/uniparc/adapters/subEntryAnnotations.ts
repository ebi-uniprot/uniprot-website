import * as logging from '../../shared/utils/logging';
import { type TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  type GeneNamesData,
  type ProteinNamesData,
} from '../../uniprotkb/adapters/namesAndTaxonomyConverter';
import uniProtKbConverter, {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
} from '../../uniprotkb/adapters/uniProtkbConverter';
import UniProtKBEntrySection from '../../uniprotkb/types/entrySection';
import { type DatabaseInfoMaps } from '../../uniprotkb/utils/database';
import { type KeywordUIModel } from '../../uniprotkb/utils/KeywordsUtil';
import uniparcApiUrls from '../config/apiUrls';
import { type UniParcPrecomputedModel } from '../types/precomputed';
import precomputedToUniProtkbConverter from './precomputedToUniProtkbConverter';
import uniFireToUniProtkbConverter from './uniFireToUniProtkbConverter';
import { type UniFireModel } from './uniParcSubEntryConverter';

/**
 * Precomputed keywords whose category `uniProtKbConverter` sections into a page
 * the UniParc sub-entry does not render on its own — `Disease` (there is no
 * Diseases & Variants section) and `Coding sequence diversity` / `Technical
 * term` (the Sequence section is bespoke and entry-driven, so it ignores
 * annotation keywords). Collected here so they fall back into the Keywords & GO
 * section rather than being dropped.
 */
export const getFallbackKeywords = (
  annotations?: UniProtkbUIModel
): KeywordUIModel[] =>
  annotations
    ? [
        ...(annotations[UniProtKBEntrySection.DiseaseVariants]?.keywordData ??
          []),
        ...(annotations[UniProtKBEntrySection.Sequence]?.keywordData ?? []),
      ]
    : [];

/**
 * Names & Taxonomy fields the precomputed converter can populate but the
 * sub-entry's Names & Taxonomy section does not render today (it renders only
 * `recommendedName`/`alternativeNames` and each entry's `geneName`/`synonyms`).
 *
 * Empirically the precomputed corpus does not populate any of these — but
 * `UniParcPrecomputedModel` is typed as `UniProtkbAPIModel`, so the type
 * permits them. Flag them when they appear so a future payload that does
 * populate them surfaces immediately rather than being silently dropped.
 *
 * Keep in sync with `SubEntryNamesAndTaxonomySection` — if a field is added
 * to the renderer, remove it from these lists.
 */
const UNRENDERED_PROTEIN_NAME_FIELDS = [
  'submissionNames',
  'allergenName',
  'biotechName',
  'cdAntigenNames',
  'innNames',
  'includes',
  'contains',
] as const satisfies ReadonlyArray<keyof ProteinNamesData>;

const UNRENDERED_GENE_NAME_FIELDS = [
  'orfNames',
  'orderedLocusNames',
] as const satisfies ReadonlyArray<keyof GeneNamesData[number]>;

export const getUnrenderedNameFields = (
  annotations?: UniProtkbUIModel
): string[] => {
  const namesAndTaxonomy =
    annotations?.[UniProtKBEntrySection.NamesAndTaxonomy];
  if (!namesAndTaxonomy) {
    return [];
  }
  const dropped: string[] = [];
  const proteinNames = namesAndTaxonomy.proteinNamesData;
  if (proteinNames) {
    for (const field of UNRENDERED_PROTEIN_NAME_FIELDS) {
      const value = proteinNames[field];
      const present = Array.isArray(value) ? value.length > 0 : Boolean(value);
      if (present) {
        dropped.push(`proteinNamesData.${field}`);
      }
    }
  }
  const geneNames = namesAndTaxonomy.geneNamesData;
  if (geneNames) {
    for (const field of UNRENDERED_GENE_NAME_FIELDS) {
      if (geneNames.some((gene) => (gene[field]?.length ?? 0) > 0)) {
        dropped.push(`geneNamesData[].${field}`);
      }
    }
  }
  return dropped;
};

/**
 * Whether to fire the UniFire fallback request.
 *
 * UniFire is the fallback source, so it is requested only after the (cheap,
 * preferred) precomputed request has resolved (`precomputedResolved`) and
 * produced nothing (`!hasPrecomputed`). Keeping `precomputedResolved` in the
 * predicate is what stops a UniFire request from firing before precomputed has
 * had a chance to answer.
 *
 * The caller still gates this behind `canLoadAnnotations` (taxId + accession
 * known) and bot detection (UniFire is the expensive source — only let
 * likely-human visitors trigger it).
 */
export const shouldRequestUniFire = ({
  precomputedResolved,
  hasPrecomputed,
}: {
  precomputedResolved: boolean;
  hasPrecomputed: boolean;
}): boolean => precomputedResolved && !hasPrecomputed;

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
 * Precomputed is preferred (if it exists); UniFire is the fallback. The
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
        const categories = [
          ...new Set(fallbackKeywords.map((keyword) => keyword.category)),
        ].join(', ');
        logging.warn(
          `Precomputed keywords shown in the generic Keywords section — no dedicated sub-entry section for: ${categories}`,
          { extra: { accession } }
        );
      }
      // Name-data fields the precomputed converter can populate but the
      // sub-entry's Names section does not render — warn so they are not
      // silently dropped if the upstream payload ever starts populating them.
      const unrenderedNameFields = getUnrenderedNameFields(converted);
      if (unrenderedNameFields.length) {
        logging.warn(
          `Precomputed Names & Taxonomy fields not rendered by the sub-entry: ${unrenderedNameFields.join(', ')}`,
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

/**
 * The UniFire annotations as a download payload.
 *
 * `uniFireToUniProtkbConverter` fills `uniProtkbId` / `proteinExistence` with
 * empty-string placeholders so the model satisfies `UniProtkbAPIModel` for the
 * render pipeline. Those are meaningless internal scaffolding in a downloaded
 * file, so strip them — yielding a clean `UniParcPrecomputedModel`, the same
 * shape the precomputed endpoint returns, so both sources download
 * consistently.
 */
export const uniFireToDownloadModel = (
  uniFire: UniFireModel
): UniParcPrecomputedModel => {
  const { proteinExistence, ...rest } = uniFireToUniProtkbConverter(uniFire);
  return { ...rest, uniProtkbId: null } as UniParcPrecomputedModel;
};

/**
 * A UniParc sub-entry's downloadable annotations. Precomputed has a real API
 * endpoint, so it downloads via URL. UniFire annotations are transformed in the
 * browser and have no URL, so they are serialised to JSON on the fly. The two
 * are mutually exclusive — a sub-entry has one source or the other.
 */
export type SubEntryAnnotationDownload =
  | { source: 'precomputed'; apiURL: string }
  | { source: 'unifire'; model: UniParcPrecomputedModel; filename: string };

type SubEntryAnnotationDownloadParams = {
  hasPrecomputed: boolean;
  uniFire?: UniFireModel;
  accession?: string;
  taxId?: string | number;
};

/**
 * Build the download descriptor for a sub-entry's annotations — precomputed (a
 * real API URL) or UniFire (a model serialised in the browser). Only one
 * source is ever present (see `shouldRequestUniFire`); precomputed wins if so.
 *
 * Returns `undefined` when neither source is available, when the accession /
 * taxId needed to address the entry are missing, or when the UniFire transform
 * fails — in every case the caller simply offers no annotation download.
 */
export const buildSubEntryAnnotationDownload = ({
  hasPrecomputed,
  uniFire,
  accession,
  taxId,
}: SubEntryAnnotationDownloadParams):
  | SubEntryAnnotationDownload
  | undefined => {
  if (!accession || !taxId) {
    return undefined;
  }
  if (hasPrecomputed) {
    return {
      source: 'precomputed',
      apiURL: uniparcApiUrls.precomputedAnnotation(accession, `${taxId}`),
    };
  }
  if (uniFire) {
    try {
      return {
        source: 'unifire',
        model: uniFireToDownloadModel(uniFire),
        filename: `${accession}-${taxId}-annotations.json`,
      };
    } catch {
      // uniFireToUniProtkbConverter logs its own error; offer no download.
      return undefined;
    }
  }
  return undefined;
};

export default buildSubEntryAnnotations;
