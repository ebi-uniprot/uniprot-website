import * as logging from '../../shared/utils/logging';
import {
  type ProteinNames,
  type ProteinNamesData,
} from '../../uniprotkb/adapters/namesAndTaxonomyConverter';
import {
  type AnnotationScoreValue,
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
import { type ValueWithEvidence } from '../../uniprotkb/types/modelTypes';
import { type Keyword } from '../../uniprotkb/utils/KeywordsUtil';
import annotationTypeToSection from '../config/UniFireAnnotationTypeToSection';
import type { UniParcPrecomputedModel } from '../types/precomputed';
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
 * Transforms UniFire prediction data into UniParcPrecomputedModel.
 *
 * Converts the flat prediction format from the UniFire endpoint into the
 * same API model shape returned by the precomputed endpoint, so the
 * UniParc sub-entry page can use a single downstream pipeline for both
 * data sources.
 *
 * UniFire-derived instances are currently thinner than precomputed ones
 * (no keyword ids/categories, flat-text subcellular locations, generic
 * evidence sources).
 */
const uniFireToPrecomputedConverter = (
  data: unknown
): UniParcPrecomputedModel => {
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
        const comment: FreeTextComment = {
          commentType: sectionConfig.freeTextType as FreeTextType,
          texts: [{ value: annotationValue, evidences }],
        };
        comments.push(comment);
        continue;
      }

      // feature.* predictions → features[]
      if (
        sectionConfig.featureType &&
        prediction.start != null &&
        prediction.end != null
      ) {
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

  // Merge accumulated ecNumbers into recommendedName. The ProteinNames type
  // requires a non-optional fullName, so ecNumbers can only be attached when
  // a recommendedName.fullName was also predicted. In the current empirical
  // corpus (289 UniFire files) every entry carrying ecNumber predictions
  // also carries a recommendedName.fullName, so the drop-and-warn fallback
  // below is defensive.
  let recommendedNameWithEc: ProteinNames | undefined = recommendedName;
  if (ecNumbers.length > 0) {
    if (recommendedNameWithEc) {
      recommendedNameWithEc = { ...recommendedNameWithEc, ecNumbers };
    } else {
      logging.warn(
        'Dropping protein.recommendedName.ecNumber predictions: no recommendedName.fullName found in same entry',
        {
          extra: {
            accession: data.accession,
            droppedEcNumbers: ecNumbers.length,
          },
        }
      );
    }
  }

  // Build proteinDescription if we have any name data
  let proteinDescription: ProteinNamesData | undefined;
  if (recommendedNameWithEc || alternativeNames.length > 0) {
    proteinDescription = {
      ...(recommendedNameWithEc
        ? { recommendedName: recommendedNameWithEc }
        : undefined),
      ...(alternativeNames.length > 0 ? { alternativeNames } : undefined),
    };
  }

  // Consolidate FreeTextComments by commentType: every prediction of the
  // same free-text type produced a separate single-text comment during the
  // loop; collapse them into one comment with a flat `texts[]` array, in
  // declaration order. Non-free-text comments
  // (e.g. anything with structured shapes) are passed through unchanged —
  // this code path only ever produces FreeTextComment objects today, but
  // the guard keeps the consolidation safe if that ever changes.
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
    uniProtkbId: null,
    primaryAccession: data.accession.replaceAll(':', '-'),
    annotationScore: 0 as AnnotationScoreValue,
    ...(consolidatedComments.length > 0
      ? { comments: consolidatedComments }
      : undefined),
    ...(features.length > 0 ? { features } : undefined),
    ...(keywords.length > 0 ? { keywords } : undefined),
    ...(proteinDescription ? { proteinDescription } : undefined),
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
export default uniFireToPrecomputedConverter;
