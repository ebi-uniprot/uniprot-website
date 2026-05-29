import * as logging from '../../shared/utils/logging';
import {
  type GeneNamesData,
  type ProteinNames,
  type ProteinNamesData,
} from '../../uniprotkb/adapters/namesAndTaxonomyConverter';
import {
  type AnnotationScoreValue,
  type UniProtkbAPIModel,
  type UniProtKBXref,
} from '../../uniprotkb/adapters/uniProtkbConverter';
import { type FeatureDatum } from '../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import type Comment from '../../uniprotkb/types/commentTypes';
import {
  type CommentType,
  type FreeTextComment,
  type FreeTextType,
} from '../../uniprotkb/types/commentTypes';
import type FeatureType from '../../uniprotkb/types/featureType';
import {
  type Evidence,
  type ValueWithEvidence,
} from '../../uniprotkb/types/modelTypes';
import { type Keyword } from '../../uniprotkb/utils/KeywordsUtil';
import annotationTypeToSection from '../config/UniFireAnnotationTypeToSection';
import { toSubEntryAccession } from '../utils/subEntry';
import {
  constructPredictionEvidences,
  type Prediction,
} from './uniParcSubEntryConverter';

/**
 * The shape this converter accepts: the `Prediction[]` arm of
 * `UniFireModel.predictions`. It handles flat string evidence only (not the
 * `ModifiedPrediction`/`Evidence[]` arm), so `isValidUniFireModel` narrows to
 * exactly what it verifies rather than to the broader `UniFireModel` union.
 */
export type ValidUniFireModel = {
  accession: string;
  predictions: Prediction[];
};

function isValidUniFireModel(data: unknown): data is ValidUniFireModel {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const obj = data as Record<string, unknown>;
  if (typeof obj.accession !== 'string' || !Array.isArray(obj.predictions)) {
    return false;
  }
  return obj.predictions.every((p: unknown) => {
    if (!p || typeof p !== 'object') {
      return false;
    }
    const pred = p as Record<string, unknown>;
    return (
      typeof pred.annotationType === 'string' &&
      (pred.annotationValue === undefined ||
        typeof pred.annotationValue === 'string') &&
      (pred.start === undefined || typeof pred.start === 'number') &&
      (pred.end === undefined || typeof pred.end === 'number') &&
      Array.isArray(pred.evidence) &&
      pred.evidence.every((e: unknown) => typeof e === 'string')
    );
  });
}

/**
 * Builds the comment shape appropriate for a UniFire `comment.*` prediction.
 * The three structured comment types must emit their structured shape: a
 * FreeTextComment for any of them is silently dropped by the UniProtKB
 * section renderers, which read the structured fields. UniFire supplies only
 * a flat text value, which maps to the single required text field of each
 * structured shape (`location.value` / `cofactors[].name` / `reaction.name`).
 */
function buildComment(
  commentType: FreeTextType | CommentType,
  value: string,
  evidences: Evidence[]
): Comment {
  switch (commentType) {
    case 'SUBCELLULAR LOCATION':
      // UniFire supplies only a flat text value; topology (e.g. "Single-pass
      // type I membrane protein") is not predicted, so the converted model
      // never carries a `topology` field. This is a known quality difference
      // from the precomputed branch, where the API may include topology.
      return {
        commentType,
        subcellularLocations: [{ location: { value, evidences } }],
      };
    case 'COFACTOR':
      return { commentType, cofactors: [{ name: value, evidences }] };
    case 'CATALYTIC ACTIVITY':
      return { commentType, reaction: { name: value, evidences } };
    default:
      return {
        commentType: commentType as FreeTextType,
        texts: [{ value, evidences }],
      };
  }
}

/**
 * Transforms UniFire prediction data into a UniProtkbAPIModel.
 *
 * Converts the flat UniFire prediction format into the UniProtKB API model
 * shape so the UniParc sub-entry page can run UniFire data through the
 * standard `uniProtKbConverter` pipeline and reuse the UniProtKB section
 * components.
 *
 * UniFire-derived instances are thinner than real UniProtKB entries:
 * `uniProtkbId` and `proteinExistence` are empty-string placeholders, and
 * organism/sequence are not set here — they are supplemented from the
 * UniParc entry at page-assembly time.
 */
const uniFireToUniProtkbConverter = (data: unknown): UniProtkbAPIModel => {
  if (!isValidUniFireModel(data)) {
    const accession = (data as Record<string, unknown>)?.accession ?? 'unknown';
    const message = `Invalid UniFireModel input for accession: ${accession}`;
    logging.error(message);
    throw new Error(message);
  }

  const comments: Comment[] = [];
  const features: FeatureDatum[] = [];
  const keywords: Keyword[] = [];
  const xrefs: UniProtKBXref[] = [];
  let recommendedName: ProteinNames | undefined;
  const alternativeNames: ProteinNames[] = [];
  const ecNumbers: ValueWithEvidence[] = [];
  const recommendedShortNames: ValueWithEvidence[] = [];
  const alternativeShortNames: ValueWithEvidence[] = [];
  const alternativeEcNumbers: ValueWithEvidence[] = [];
  const geneNames: ValueWithEvidence[] = [];
  const geneSynonyms: ValueWithEvidence[] = [];

  for (const prediction of data.predictions) {
    try {
      const { annotationType, annotationValue, evidence } = prediction;
      const evidences = constructPredictionEvidences(evidence);

      // keyword predictions → keywords[]
      if (annotationType === 'keyword') {
        if (typeof annotationValue === 'string') {
          keywords.push({
            name: annotationValue,
            evidences,
          });
        }
        continue;
      }

      // protein.recommendedName.fullName → proteinDescription.recommendedName
      // Use first encountered only (known UniFire duplicate issue)
      if (annotationType === 'protein.recommendedName.fullName') {
        if (!recommendedName && typeof annotationValue === 'string') {
          recommendedName = {
            fullName: { value: annotationValue, evidences },
          };
        }
        continue;
      }

      // protein.alternativeName.fullName → proteinDescription.alternativeNames[]
      if (annotationType === 'protein.alternativeName.fullName') {
        if (typeof annotationValue === 'string') {
          alternativeNames.push({
            fullName: { value: annotationValue, evidences },
          });
        }
        continue;
      }

      // protein.recommendedName.ecNumber → recommendedName.ecNumbers[]
      // Merged into recommendedName during proteinDescription assembly below.
      if (annotationType === 'protein.recommendedName.ecNumber') {
        if (typeof annotationValue === 'string') {
          ecNumbers.push({ value: annotationValue, evidences });
        }
        continue;
      }

      // protein.recommendedName.shortName → recommendedName.shortNames[]
      if (annotationType === 'protein.recommendedName.shortName') {
        if (typeof annotationValue === 'string') {
          recommendedShortNames.push({ value: annotationValue, evidences });
        }
        continue;
      }

      // protein.alternativeName.shortName → an alternativeName's shortNames[]
      if (annotationType === 'protein.alternativeName.shortName') {
        if (typeof annotationValue === 'string') {
          alternativeShortNames.push({ value: annotationValue, evidences });
        }
        continue;
      }

      // protein.alternativeName.ecNumber → an alternativeName's ecNumbers[]
      if (annotationType === 'protein.alternativeName.ecNumber') {
        if (typeof annotationValue === 'string') {
          alternativeEcNumbers.push({ value: annotationValue, evidences });
        }
        continue;
      }

      // gene.name.primary → genes[].geneName
      if (annotationType === 'gene.name.primary') {
        if (typeof annotationValue === 'string') {
          geneNames.push({ value: annotationValue, evidences });
        }
        continue;
      }

      // gene.name.synonym → genes[].synonyms[]
      if (annotationType === 'gene.name.synonym') {
        if (typeof annotationValue === 'string') {
          geneSynonyms.push({ value: annotationValue, evidences });
        }
        continue;
      }

      // xref.GO → uniProtKBCrossReferences[]
      if (annotationType === 'xref.GO') {
        if (typeof annotationValue === 'string') {
          xrefs.push({
            database: 'GO',
            id: annotationValue,
            evidences,
          });
        }
        continue;
      }

      // Look up in annotation type config for comment.* and feature.*
      const sectionConfig = annotationTypeToSection[annotationType];
      if (!sectionConfig) {
        logging.warn('Unknown UniFire annotation type encountered', {
          extra: {
            annotationType,
            accession: data.accession,
          },
        });
        continue;
      }

      // comment.* predictions → comments[]
      if (sectionConfig.freeTextType && typeof annotationValue === 'string') {
        comments.push(
          buildComment(sectionConfig.freeTextType, annotationValue, evidences)
        );
        continue;
      }

      // feature.* predictions → features[]
      if (sectionConfig.featureType) {
        if (prediction.start != null && prediction.end != null) {
          const feature: FeatureDatum = {
            type: sectionConfig.featureType,
            description: annotationValue || '',
            location: {
              start: {
                value: prediction.start,
                modifier: 'EXACT' as const,
              },
              end: {
                value: prediction.end,
                modifier: 'EXACT' as const,
              },
            },
            evidences,
          };
          features.push(feature);
        } else {
          logging.warn(
            'Skipping UniFire feature prediction with missing start/end positions',
            {
              extra: {
                annotationType,
                accession: data.accession,
              },
            }
          );
        }
      }
    } catch (err) {
      // Partial failure: skip this prediction, keep going
      logging.warn(
        `Failed to transform UniFire prediction: ${err instanceof Error ? err.message : String(err)}`,
        {
          extra: {
            annotationType: prediction.annotationType,
            accession: data.accession,
          },
        }
      );
    }
  }

  // Merge accumulated ecNumbers / shortNames into recommendedName. The
  // ProteinNames type requires a non-optional fullName, so these can only be
  // attached when a recommendedName.fullName was also predicted.
  let finalRecommendedName: ProteinNames | undefined = recommendedName;
  if (finalRecommendedName) {
    if (ecNumbers.length > 0) {
      finalRecommendedName = { ...finalRecommendedName, ecNumbers };
    }
    if (recommendedShortNames.length > 0) {
      finalRecommendedName = {
        ...finalRecommendedName,
        shortNames: recommendedShortNames,
      };
    }
  } else if (ecNumbers.length > 0 || recommendedShortNames.length > 0) {
    logging.warn(
      'Dropping protein.recommendedName.ecNumber / .shortName predictions: no recommendedName.fullName found in same entry',
      {
        extra: {
          accession: data.accession,
          droppedEcNumbers: ecNumbers.length,
          droppedShortNames: recommendedShortNames.length,
        },
      }
    );
  }

  // Attach accumulated alternative short names / EC numbers to the first
  // alternative name. The Names & Taxonomy section flattens these across all
  // alternative names, so the exact host does not matter; ProteinNames requires
  // a fullName, so they are dropped if no alternativeName.fullName was predicted.
  // Known structural mismatch: the precomputed branch associates each short name /
  // EC number with its correct alternative name; the UniFire branch cannot (UniFire
  // emits a flat prediction stream). If the renderer ever distinguishes per-
  // alternative-name sub-fields, revisit this accumulation strategy.
  if (alternativeNames.length > 0) {
    if (alternativeShortNames.length > 0) {
      alternativeNames[0] = {
        ...alternativeNames[0],
        shortNames: alternativeShortNames,
      };
    }
    if (alternativeEcNumbers.length > 0) {
      alternativeNames[0] = {
        ...alternativeNames[0],
        ecNumbers: alternativeEcNumbers,
      };
    }
  } else if (
    alternativeShortNames.length > 0 ||
    alternativeEcNumbers.length > 0
  ) {
    logging.warn(
      'Dropping protein.alternativeName.shortName / .ecNumber predictions: no alternativeName.fullName found in same entry',
      {
        extra: {
          accession: data.accession,
          droppedShortNames: alternativeShortNames.length,
          droppedEcNumbers: alternativeEcNumbers.length,
        },
      }
    );
  }

  // Build genes[] — one entry per gene.name.primary, plus gene.name.synonym
  // predictions. The Names & Taxonomy section flattens synonyms across all
  // genes, so the host gene does not matter; GeneNamesData allows a
  // synonym-only entry (geneName is optional) when no primary name was predicted.
  const genes: GeneNamesData = geneNames.map((geneName) => ({ geneName }));
  if (geneSynonyms.length > 0) {
    if (genes.length > 0) {
      genes[0] = { ...genes[0], synonyms: geneSynonyms };
    } else {
      genes.push({ synonyms: geneSynonyms });
    }
  }

  // Build proteinDescription if we have any name data
  let proteinDescription: ProteinNamesData | undefined;
  if (finalRecommendedName || alternativeNames.length > 0) {
    proteinDescription = {
      ...(finalRecommendedName
        ? { recommendedName: finalRecommendedName }
        : undefined),
      ...(alternativeNames.length > 0 ? { alternativeNames } : undefined),
    };
  }

  // Consolidate FreeTextComments by commentType: every prediction of the
  // same free-text type produced a separate single-text comment during the
  // loop; collapse them into one comment with a flat `texts[]` array, in
  // declaration order. Structured comments (SUBCELLULAR LOCATION, COFACTOR,
  // CATALYTIC ACTIVITY) have no `texts` and pass through unchanged — one
  // comment object per prediction.
  const consolidatedComments: Comment[] = [];
  const freeTextByType = new Map<string, FreeTextComment>();
  for (const comment of comments) {
    const isFreeText =
      (comment as FreeTextComment).texts !== undefined &&
      Array.isArray((comment as FreeTextComment).texts);
    if (!isFreeText) {
      consolidatedComments.push(comment);
      continue;
    }
    const freeText = comment as FreeTextComment;
    const key = freeText.commentType;
    const existing = freeTextByType.get(key);
    if (existing) {
      existing.texts = [...(existing.texts ?? []), ...(freeText.texts ?? [])];
    } else {
      // Clone so later concatenation does not mutate the original comment
      // object pushed during the loop.
      const cloned: FreeTextComment = {
        ...freeText,
        texts: [...(freeText.texts ?? [])],
      };
      freeTextByType.set(key, cloned);
      consolidatedComments.push(cloned);
    }
  }

  // Compute extraAttributes counts from the consolidated comments so the
  // count reflects what the renderer will see (one entry per commentType).
  const countByCommentType: Partial<Record<CommentType, number>> = {};
  for (const comment of consolidatedComments) {
    const ct = comment.commentType as CommentType;
    countByCommentType[ct] = (countByCommentType[ct] ?? 0) + 1;
  }

  const countByFeatureType: Partial<Record<FeatureType, number>> = {};
  for (const feature of features) {
    const ft = feature.type as FeatureType;
    countByFeatureType[ft] = (countByFeatureType[ft] ?? 0) + 1;
  }

  return {
    entryType: 'AA',
    uniProtkbId: '',
    proteinExistence: '',
    primaryAccession: toSubEntryAccession(data.accession),
    annotationScore: 0 as AnnotationScoreValue,
    ...(consolidatedComments.length > 0
      ? { comments: consolidatedComments }
      : undefined),
    ...(features.length > 0 ? { features } : undefined),
    ...(keywords.length > 0 ? { keywords } : undefined),
    ...(proteinDescription ? { proteinDescription } : undefined),
    ...(genes.length > 0 ? { genes } : undefined),
    ...(xrefs.length > 0 ? { uniProtKBCrossReferences: xrefs } : undefined),
    ...(Object.keys(countByCommentType).length > 0 ||
    Object.keys(countByFeatureType).length > 0
      ? {
          extraAttributes: {
            ...(Object.keys(countByCommentType).length > 0
              ? { countByCommentType }
              : undefined),
            ...(Object.keys(countByFeatureType).length > 0
              ? { countByFeatureType }
              : undefined),
          },
        }
      : undefined),
  };
};

export { isValidUniFireModel };
export default uniFireToUniProtkbConverter;
