import { UniProtkbAPIModel, EntryType } from './uniProtkbConverter';
import FeatureType from '../types/featureType';
import {
  CommentType,
  InteractionComment,
  DiseaseComment,
  AlternativeProductsComment,
} from '../types/commentTypes';
import { FeatureData } from '../components/protein-data-views/FeaturesView';
import EntrySection, { EntrySectionIDs } from '../types/entrySection';

enum highlightSection {
  domains = 'domain',
  PTM = 'PTM',
  variants = 'reviewed variant',
  activeSites = 'active site',
  isoforms = 'isoform',
  structures = '3D structure',
  disease = 'disease',
  interactions = 'interaction',
  subcell = 'subcellular location',
  publications = 'publication',
}

const highlightToEntrySection: {
  [key in highlightSection]: {
    link: string;
    prefixResolver?: (data: UniProtkbAPIModel) => string;
  };
} = {
  [highlightSection.domains]: {
    link: `#${EntrySectionIDs[EntrySection.Function]}`,
  },
  [highlightSection.PTM]: {
    link: `#${EntrySectionIDs[EntrySection.ProteinProcessing]}`,
  },
  [highlightSection.variants]: {
    link: `#${EntrySectionIDs[EntrySection.DiseaseAndDrugs]}`,
  },
  [highlightSection.activeSites]: {
    link: `#${EntrySectionIDs[EntrySection.Function]}`,
  },
  [highlightSection.isoforms]: {
    link: `#${EntrySectionIDs[EntrySection.Sequence]}`,
  },
  [highlightSection.structures]: {
    link: `#${EntrySectionIDs[EntrySection.Structure]}`,
  },
  [highlightSection.disease]: {
    link: `#${EntrySectionIDs[EntrySection.DiseaseAndDrugs]}`,
  },
  [highlightSection.interactions]: {
    link: `#${EntrySectionIDs[EntrySection.Interaction]}`,
  },
  [highlightSection.subcell]: {
    link: `#${EntrySectionIDs[EntrySection.SubCellularLocation]}`,
  },
  [highlightSection.publications]: {
    link: '/publications',
    prefixResolver: (data) =>
      data.entryType === EntryType.REVIEWED ? 'reviewed ' : '',
  },
};

const getFeatureCount = (features: FeatureData, type: FeatureType) =>
  features.filter((feature) => feature.type === type).length;

const getProteinHighlights = (data: UniProtkbAPIModel) => {
  const highlightsMap = new Map<highlightSection, number>();
  const {
    primaryAccession,
    features,
    comments,
    uniProtKBCrossReferences,
    references,
  } = data;

  // FEATURES
  if (features) {
    // domains
    highlightsMap.set(
      highlightSection.domains,
      getFeatureCount(features, FeatureType.DOMAIN)
    );

    // PTMs
    highlightsMap.set(
      highlightSection.PTM,
      getFeatureCount(features, FeatureType.MOD_RES)
    );

    // variants
    highlightsMap.set(
      highlightSection.variants,
      getFeatureCount(features, FeatureType.VARIANT)
    );

    // active sites
    highlightsMap.set(
      highlightSection.activeSites,
      getFeatureCount(features, FeatureType.ACT_SITE)
    );
  }

  if (comments) {
    // isoforms
    const isoformsComments = comments.find(
      (comment) => comment.commentType === CommentType.ALTERNATIVE_PRODUCTS
    ) as AlternativeProductsComment;
    highlightsMap.set(
      highlightSection.isoforms,
      isoformsComments ? isoformsComments.isoforms.length : 0
    );

    // interactions
    const interactionComments = comments.find(
      (comment) => comment.commentType === CommentType.INTERACTION
    ) as InteractionComment;
    highlightsMap.set(
      highlightSection.interactions,
      interactionComments ? interactionComments.interactions.length : 0
    );

    // diseases
    const diseaseComments = comments.filter(
      (comment) => comment.commentType === CommentType.DISEASE
    ) as DiseaseComment[];
    highlightsMap.set(highlightSection.disease, diseaseComments.length);
  }

  // XREFS
  // 3D structures
  if (uniProtKBCrossReferences) {
    const structures = uniProtKBCrossReferences.filter(
      (uniProtKBCrossReference) => uniProtKBCrossReference.database === 'PDB'
    );
    highlightsMap.set(highlightSection.structures, structures.length);
  }

  /**
   * Must include "reviewed" for
   * Swissprot and not for Trembl.
   */
  // publications
  if (references) {
    highlightsMap.set(highlightSection.publications, references.length);
  }

  return Array.from(highlightsMap.entries())
    .filter(([, count]) => count)
    .map(([entryHighlightSection, count]) => {
      const { link, prefixResolver } = highlightToEntrySection[
        entryHighlightSection
      ];
      const prefix = prefixResolver ? prefixResolver(data) : '';
      return {
        link: `/uniprotkb/${primaryAccession}${link}`,
        name: `${count} ${prefix}${entryHighlightSection}${
          count && count > 1 ? 's' : ''
        }`,
      };
    });
};

export default getProteinHighlights;
