import * as logging from '../../shared/utils/logging';
import type {
  CommentType,
  FreeTextType,
} from '../../uniprotkb/types/commentTypes';
import type FeatureType from '../../uniprotkb/types/featureType';
import SubEntrySection from '../types/subEntrySection';

export type SectionObject = {
  section: SubEntrySection;
  freeTextType?: FreeTextType | CommentType;
  subSectionLabel?: string;
  featureType?: FeatureType;
};

type AnnotationTypeToSection = Map<
  string | RegExp,
  SectionObject | AnnotationTypeToSection
>;

const annotationTypeToSection: AnnotationTypeToSection = new Map();

const commentMap: AnnotationTypeToSection = new Map();
annotationTypeToSection.set('comment', commentMap);
commentMap.set('function', {
  section: SubEntrySection.Function,
  freeTextType: 'FUNCTION',
});
commentMap.set('activity_regulation', {
  section: SubEntrySection.Function,
  freeTextType: 'ACTIVITY REGULATION',
  subSectionLabel: 'Activity regulation',
});
commentMap.set('catalytic_activity', {
  section: SubEntrySection.Function,
  freeTextType: 'CATALYTIC ACTIVITY',
  subSectionLabel: 'Catalytic activity',
});
commentMap.set('caution', {
  section: SubEntrySection.Function,
  freeTextType: 'CAUTION',
  subSectionLabel: 'Caution',
});
commentMap.set('cofactor', {
  section: SubEntrySection.Function,
  freeTextType: 'COFACTOR',
  subSectionLabel: 'Cofactors',
});
commentMap.set('miscellaneous', {
  section: SubEntrySection.Function,
  freeTextType: 'MISCELLANEOUS',
  subSectionLabel: 'Miscellaneous',
});
commentMap.set('pathway', {
  section: SubEntrySection.Function,
  freeTextType: 'PATHWAY',
  subSectionLabel: 'Pathway',
});
commentMap.set('subcellular_location', {
  section: SubEntrySection.SubcellularLocation,
  freeTextType: 'SUBCELLULAR LOCATION',
});
commentMap.set('induction', {
  section: SubEntrySection.Expression,
  freeTextType: 'INDUCTION',
  subSectionLabel: 'Induction',
});
commentMap.set('PTM', {
  section: SubEntrySection.ProteinProcessing,
  freeTextType: 'PTM',
  subSectionLabel: 'Post-translational modification',
});
commentMap.set('subunit', {
  section: SubEntrySection.Interaction,
  freeTextType: 'SUBUNIT',
  subSectionLabel: 'Subunit',
});
commentMap.set('domain', {
  section: SubEntrySection.FamilyAndDomains,
  freeTextType: 'DOMAIN',
  subSectionLabel: 'Domain',
});
commentMap.set('similarity', {
  section: SubEntrySection.FamilyAndDomains,
  freeTextType: 'SIMILARITY',
  subSectionLabel: 'Sequence similarities',
});

const geneMap: AnnotationTypeToSection = new Map();
annotationTypeToSection.set('gene', geneMap);
const geneNameMap: AnnotationTypeToSection = new Map();
geneMap.set('name', geneNameMap);
geneNameMap.set('primary', {
  section: SubEntrySection.NamesAndTaxonomy,
});

const featureMap: AnnotationTypeToSection = new Map();
annotationTypeToSection.set('feature', featureMap);
featureMap.set('ACT_SITE', {
  section: SubEntrySection.Function,
  featureType: 'Active site',
});
// Metal binding and Nucleotide binding are deprecated and should point to binding
featureMap.set(/BINDING|METAL|NP_BIND/, {
  section: SubEntrySection.Function,
  featureType: 'Binding site',
});
featureMap.set('DNA_BIND', {
  section: SubEntrySection.Function,
  featureType: 'DNA binding',
});
featureMap.set('SITE', {
  section: SubEntrySection.Function,
  featureType: 'Site',
});
featureMap.set('TOPO_DOM', {
  section: SubEntrySection.SubcellularLocation,
  featureType: 'Topological domain',
});
featureMap.set('INTRAMEM', {
  section: SubEntrySection.SubcellularLocation,
  featureType: 'Intramembrane',
});
featureMap.set('TRANSMEM', {
  section: SubEntrySection.SubcellularLocation,
  featureType: 'Transmembrane',
});
featureMap.set('MOTIF', {
  section: SubEntrySection.FamilyAndDomains,
  featureType: 'Motif',
});
featureMap.set('REPEAT', {
  section: SubEntrySection.FamilyAndDomains,
  featureType: 'Repeat',
});
featureMap.set('REGION', {
  section: SubEntrySection.FamilyAndDomains,
  featureType: 'Region',
});
featureMap.set('ZN_FING', {
  section: SubEntrySection.FamilyAndDomains,
  featureType: 'Zinc finger',
});
featureMap.set('COILED', {
  section: SubEntrySection.FamilyAndDomains,
  featureType: 'Coiled coil',
});
featureMap.set('DOMAIN', {
  section: SubEntrySection.FamilyAndDomains,
  featureType: 'Domain',
});
featureMap.set('CHAIN', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Chain',
});
featureMap.set('DISULFID', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Disulfide bond',
});
featureMap.set('INIT_MET', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Initiator methionine',
});
featureMap.set('MOD_RES', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Modified residue',
});
featureMap.set('CARBOHYD', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Glycosylation',
});
featureMap.set('LIPID', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Lipidation',
});
featureMap.set('PEPTIDE', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Peptide',
});
featureMap.set('PROPEP', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Propeptide',
});
featureMap.set('SIGNAL', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Signal',
});
featureMap.set('TRANSIT', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Transit peptide',
});
featureMap.set('CROSSLNK', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Cross-link',
});

const featureFeatureMap: AnnotationTypeToSection = new Map();
featureMap.set('feature', featureFeatureMap);
// Case copied from previous code
// Check with the data if this correct? Does 'feature.feature.CHAIN' exist in the UniFIRE payload?
featureFeatureMap.set('CHAIN', {
  section: SubEntrySection.ProteinProcessing,
  featureType: 'Chain',
});

const proteinMap: AnnotationTypeToSection = new Map();
annotationTypeToSection.set('protein', proteinMap);
const recommendedNameMap: AnnotationTypeToSection = new Map();
proteinMap.set('recommendedName', recommendedNameMap);
recommendedNameMap.set('ecNumber', {
  section: SubEntrySection.NamesAndTaxonomy,
});
recommendedNameMap.set('fullName', {
  section: SubEntrySection.NamesAndTaxonomy,
});
recommendedNameMap.set('shortName', {
  section: SubEntrySection.NamesAndTaxonomy,
});

const proteinComponentMap: AnnotationTypeToSection = new Map();
proteinMap.set('component', proteinComponentMap);
const proteinComponentIndexMap: AnnotationTypeToSection = new Map();
proteinComponentMap.set(/#([1-9]\d?)/, proteinComponentIndexMap);
const proteinComponentRecommendedNameMap: AnnotationTypeToSection = new Map();
proteinComponentIndexMap.set(
  'recommendedName',
  proteinComponentRecommendedNameMap
);
proteinComponentRecommendedNameMap.set('fullName', {
  section: SubEntrySection.NamesAndTaxonomy,
});
proteinComponentRecommendedNameMap.set('shortName', {
  section: SubEntrySection.NamesAndTaxonomy,
});

annotationTypeToSection.set('keyword', {
  section: SubEntrySection.KeywordsAndGO,
});

const xrefMap: AnnotationTypeToSection = new Map();
annotationTypeToSection.set('xref', xrefMap);
xrefMap.set('GO', {
  section: SubEntrySection.KeywordsAndGO,
});

const recursiveGetSectionObject = (
  uniFirePath: string[],
  annotationTypeToSection: AnnotationTypeToSection
): SectionObject => {
  const [first, ...rest] = uniFirePath;
  let found: SectionObject | AnnotationTypeToSection | null = null;
  for (const [key, item] of annotationTypeToSection.entries()) {
    if (key === first) {
      // string match
      found = item;
      break;
    }
    if (key instanceof RegExp && key.test(first)) {
      // regular expression match
      found = item;
      break;
    }
  }
  if (found) {
    if (rest.length) {
      if (found instanceof Map) {
        // all good, keep going deeper
        return recursiveGetSectionObject(rest, found);
      } else {
        // something's wrong if we found a sectionObject, we needed to go deeper
        throw new Error();
      }
    } else {
      if (found instanceof Map) {
        // something's wrong if we needed to recursively continue when the path is finished
        throw new Error();
      } else {
        // end of the recursivity
        // return a shallow copy to allow mutations later
        return { ...found };
      }
    }
  } else {
    // not found
    throw new Error();
  }
};

export const getSectionObject = (uniFirePath: string): SectionObject | null => {
  const splitPath = uniFirePath.split('.');
  let sectionObjectOrNull: SectionObject | null = null;
  try {
    sectionObjectOrNull = recursiveGetSectionObject(
      splitPath,
      annotationTypeToSection
    );
  } catch {
    logging.warn('UniFIRE: missing case', {
      extra: { data: uniFirePath },
    });
  }
  return sectionObjectOrNull;
};

export const groupTypesBySection = (section: SubEntrySection): string[] => {
  return Object.entries(annotationTypeToSection)
    .filter(([, sectionObject]) => sectionObject.section === section)
    .map(([type]) => type);
};

export default annotationTypeToSection;
