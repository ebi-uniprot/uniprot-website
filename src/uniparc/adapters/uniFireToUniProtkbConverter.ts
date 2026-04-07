import * as logging from '../../shared/utils/logging';
import { type NamesAndTaxonomyUIModel } from '../../uniprotkb/adapters/namesAndTaxonomyConverter';
import { type UIModel } from '../../uniprotkb/adapters/sectionConverter';
import { type FeatureDatum } from '../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import type Comment from '../../uniprotkb/types/commentTypes';
import {
  type CommentType,
  type FreeTextComment,
  type FreeTextType,
} from '../../uniprotkb/types/commentTypes';
import EntrySection from '../../uniprotkb/types/entrySection';
import { type Evidence } from '../../uniprotkb/types/modelTypes';
import { type Keyword } from '../../uniprotkb/utils/KeywordsUtil';
import annotationTypeToSection from '../config/UniFireAnnotationTypeToSection';
import type { UniParcPrecomputedModel } from '../types/precomputed';
import SubEntrySection from '../types/subEntrySection';
import { type Prediction, type UniFireModel } from './uniParcSubEntryConverter';

// Re-export constructPredictionEvidences for use
const constructPredictionEvidences = (
  evidences: string[] | undefined
): Evidence[] =>
  evidences?.map((e) => ({
    evidenceCode: 'ECO:0000256' as const,
    source: e.startsWith('ARBA') ? 'ARBA' : 'UniRule',
    id: e,
  })) || [];

// Map SubEntrySection values to EntrySection values
const subEntrySectionToEntrySection: Partial<
  Record<SubEntrySection, EntrySection>
> = {
  [SubEntrySection.Function]: EntrySection.Function,
  [SubEntrySection.NamesAndTaxonomy]: EntrySection.NamesAndTaxonomy,
  [SubEntrySection.SubcellularLocation]: EntrySection.SubCellularLocation,
  [SubEntrySection.Expression]: EntrySection.Expression,
  [SubEntrySection.ProteinProcessing]: EntrySection.ProteinProcessing,
  [SubEntrySection.Interaction]: EntrySection.Interaction,
  [SubEntrySection.FamilyAndDomains]: EntrySection.FamilyAndDomains,
  [SubEntrySection.Sequence]: EntrySection.Sequence,
};

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
      Array.isArray((p as Record<string, unknown>).evidence)
  );
}

function createEmptyUIModel(): UIModel {
  return {
    commentsData: new Map<CommentType, Comment[] | undefined>(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
}

/**
 * Transforms UniFire prediction data into Partial<UniProtkbUIModel>.
 *
 * Converts predictions from the UniFire endpoint into the same UI model
 * structure used by UniProtKB entry pages, so the UniParc sub-entry page
 * can render data from either source.
 */
const uniFireToUniProtkbConverter = (
  data: UniFireModel
): UniParcPrecomputedModel => {
  if (!isValidUniFireModel(data)) {
    const error = `Invalid UniFireModel input for accession: ${(data as Record<string, unknown>)?.accession ?? 'unknown'}`;
    logging.error(error);
    throw new Error(error);
  }

  // Accumulate section data by EntrySection
  const sectionComments = new Map<EntrySection, Map<CommentType, Comment[]>>();
  const sectionFeatures = new Map<EntrySection, FeatureDatum[]>();
  const keywords: Keyword[] = [];
  let recommendedFullName: { value: string; evidences: Evidence[] } | undefined;

  for (const prediction of data.predictions as Prediction[]) {
    try {
      const { annotationType, annotationValue, evidence } = prediction;

      // Handle keyword predictions
      if (annotationType === 'keyword') {
        keywords.push({
          name: annotationValue,
          evidences: constructPredictionEvidences(evidence),
        });
        continue;
      }

      // Handle protein.recommendedName.fullName predictions
      if (annotationType === 'protein.recommendedName.fullName') {
        // Use first encountered only
        if (!recommendedFullName && typeof annotationValue === 'string') {
          recommendedFullName = {
            value: annotationValue,
            evidences: constructPredictionEvidences(evidence),
          };
        }
        continue;
      }

      // Look up in annotation type config
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

      const entrySection = subEntrySectionToEntrySection[sectionConfig.section];
      if (!entrySection) {
        continue;
      }

      const evidences = constructPredictionEvidences(evidence);

      // Handle comment.* predictions
      if (sectionConfig.freeTextType && typeof annotationValue === 'string') {
        const commentType = sectionConfig.freeTextType as FreeTextType;
        const comment: FreeTextComment = {
          commentType,
          texts: [
            {
              value: annotationValue,
              evidences,
            },
          ],
        };

        if (!sectionComments.has(entrySection)) {
          sectionComments.set(entrySection, new Map());
        }
        const commentsMap = sectionComments.get(entrySection);
        const existing = commentsMap?.get(commentType) || [];
        existing.push(comment);
        commentsMap?.set(commentType, existing);
        continue;
      }

      // Handle feature.* predictions
      if (sectionConfig.featureType) {
        const feature: FeatureDatum = {
          type: sectionConfig.featureType,
          description: annotationValue,
          location: {
            start: {
              value: prediction.start ?? 0,
              modifier: 'EXACT' as const,
            },
            end: {
              value: prediction.end ?? 0,
              modifier: 'EXACT' as const,
            },
          },
          evidences,
        };

        if (!sectionFeatures.has(entrySection)) {
          sectionFeatures.set(entrySection, []);
        }
        sectionFeatures?.get(entrySection)?.push(feature);
      }
    } catch (error) {
      // Partial failure: skip this prediction but keep going
      logging.warn(
        `Failed to transform UniFire prediction: ${error instanceof Error ? error.message : String(error)}`,
        {
          extra: {
            annotationType: prediction.annotationType,
            accession: data.accession,
          },
        }
      );
    }
  }

  // Build the result object
  const result: Partial<UniParcPrecomputedModel> = {};

  // Populate sections that have data
  const populatedSections = new Set<EntrySection>();
  Array.from(sectionComments.keys()).forEach((section) => {
    populatedSections.add(section);
  });
  Array.from(sectionFeatures.keys()).forEach((section) => {
    populatedSections.add(section);
  });

  Array.from(populatedSections).forEach((section) => {
    const model = createEmptyUIModel();

    const commentsMap = sectionComments.get(section);
    if (commentsMap) {
      Array.from(commentsMap.entries()).forEach(([commentType, comments]) => {
        model.commentsData.set(commentType, comments);
      });
    }

    const features = sectionFeatures.get(section);
    if (features) {
      model.featuresData = features;
    }

    // Type assertion needed because UIModel and section-specific models
    // vary (e.g. NamesAndTaxonomyUIModel extends UIModel)
    (result as Record<string, UIModel>)[section] = model;
  });

  // Populate NamesAndTaxonomy if we have a recommended name
  if (recommendedFullName) {
    const existingNamesSection = result[EntrySection.NamesAndTaxonomy] as
      | Partial<NamesAndTaxonomyUIModel>
      | undefined;

    const namesModel: Partial<NamesAndTaxonomyUIModel> = {
      ...createEmptyUIModel(),
      ...existingNamesSection,
      proteinNamesData: {
        recommendedName: {
          fullName: recommendedFullName,
        },
      },
    };

    (result as Record<string, unknown>)[EntrySection.NamesAndTaxonomy] =
      namesModel;
  }

  // Populate keywords (stored in a flat list since UniFire has no categories)
  if (keywords.length > 0) {
    // Keywords go into a special KeywordsAndGO section for SubEntry.
    // Since UniProtkbUIModel doesn't have this section, we attach keyword
    // data to the Function section as a pragmatic fallback, or store them
    // on the nearest section that already exists. However, per spec, we
    // store them in an uncategorized KeywordUIModel group.
    // Downstream components handle the SubEntrySection.KeywordsAndGO mapping.
    //
    // We expose keywords on a synthetic property so the sub-entry page
    // can pick them up. Since the return type is Partial<UniProtkbUIModel>,
    // we use a type assertion for the additional property.
    (result as Record<string, unknown>).keywords = keywords;
  }

  return result;
};

export { constructPredictionEvidences, isValidUniFireModel };
export default uniFireToUniProtkbConverter;
