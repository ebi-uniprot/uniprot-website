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
import { type Evidence } from '../../uniprotkb/types/modelTypes';
import { type Keyword } from '../../uniprotkb/utils/KeywordsUtil';
import annotationTypeToSection from '../config/UniFireAnnotationTypeToSection';
import type { UniParcPrecomputedModel } from '../types/precomputed';
import {
  constructPredictionEvidences,
  type Prediction,
  type UniFireModel,
} from './uniParcSubEntryConverter';

function isValidUniFireModel(data: unknown): data is UniFireModel {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const obj = data as Record<string, unknown>;
  if (typeof obj.accession !== 'string' || !Array.isArray(obj.predictions)) {
    return false;
  }
  return obj.predictions.every(
    (p: unknown) =>
      p &&
      typeof p === 'object' &&
      typeof (p as Record<string, unknown>).annotationType === 'string' &&
      ((p as Record<string, unknown>).annotationValue === undefined ||
        typeof (p as Record<string, unknown>).annotationValue === 'string') &&
      Array.isArray((p as Record<string, unknown>).evidence) &&
      ((p as Record<string, unknown>).evidence as unknown[]).every(
        (e: unknown) => typeof e === 'string'
      )
  );
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
  data: UniFireModel
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

  for (const prediction of data.predictions as Prediction[]) {
    try {
      const { annotationType, annotationValue, evidence } = prediction;
      const evidences = constructPredictionEvidences(
        evidence as string[]
      ) as Evidence[];

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

  // Build proteinDescription if we have any name data
  let proteinDescription: ProteinNamesData | undefined;
  if (recommendedName || alternativeNames.length > 0) {
    proteinDescription = {
      ...(recommendedName ? { recommendedName } : undefined),
      ...(alternativeNames.length > 0 ? { alternativeNames } : undefined),
    };
  }

  // Compute extraAttributes counts
  const countByCommentType: Partial<Record<CommentType, number>> = {};
  for (const comment of comments) {
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
    ...(comments.length > 0 ? { comments } : undefined),
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
