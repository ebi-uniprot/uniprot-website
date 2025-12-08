import { CommentType, FreeTextType } from '../../uniprotkb/types/commentTypes';
import FeatureType from '../../uniprotkb/types/featureType';
import SubEntrySection from '../types/subEntrySection';

type SectionObject = {
  section: SubEntrySection;
  freeTextType?: FreeTextType | CommentType;
  subSectionLabel?: string;
  featureType?: FeatureType;
};

const annotationTypeToSection: Record<string, SectionObject> = {
  'comment.function': {
    section: SubEntrySection.Function,
    freeTextType: 'FUNCTION',
  },
  'comment.activity_regulation': {
    section: SubEntrySection.Function,
    freeTextType: 'ACTIVITY REGULATION',
    subSectionLabel: 'Activity regulation',
  },
  'comment.catalytic_activity': {
    section: SubEntrySection.Function,
    freeTextType: 'CATALYTIC ACTIVITY',
    subSectionLabel: 'Catalytic activity',
  },
  'comment.caution': {
    section: SubEntrySection.Function,
    freeTextType: 'CAUTION',
    subSectionLabel: 'Caution',
  },
  'comment.cofactor': {
    section: SubEntrySection.Function,
    freeTextType: 'COFACTOR',
    subSectionLabel: 'Cofactors',
  },
  'comment.miscellaneous': {
    section: SubEntrySection.Function,
    freeTextType: 'MISCELLANEOUS',
    subSectionLabel: 'Miscellaneous',
  },
  'comment.pathway': {
    section: SubEntrySection.Function,
    freeTextType: 'PATHWAY',
    subSectionLabel: 'Pathway',
  },
  'xref.GO': {
    section: SubEntrySection.Function,
    subSectionLabel: 'Gene Ontology',
  },
  'comment.subcellular_location': {
    section: SubEntrySection.SubcellularLocation,
    freeTextType: 'SUBCELLULAR LOCATION',
  },
  'comment.induction': {
    section: SubEntrySection.Expression,
    freeTextType: 'INDUCTION',
    subSectionLabel: 'Induction',
  },
  'comment.PTM': {
    section: SubEntrySection.ProteinProcessing,
    freeTextType: 'PTM',
    subSectionLabel: 'Post-translational modification',
  },
  'comment.subunit': {
    section: SubEntrySection.Interaction,
    freeTextType: 'SUBUNIT',
    subSectionLabel: 'Subunit',
  },
  'comment.domain': {
    section: SubEntrySection.FamilyAndDomains,
    freeTextType: 'DOMAIN',
    subSectionLabel: 'Domain',
  },
  'comment.similarity': {
    section: SubEntrySection.FamilyAndDomains,
    freeTextType: 'SIMILARITY',
    subSectionLabel: 'Sequence similarities',
  },
  'feature.ACT_SITE': {
    section: SubEntrySection.Function,
    featureType: 'Active site',
  },
  'feature.BINDING': {
    section: SubEntrySection.Function,
    featureType: 'Binding site',
  },
  // Metal binding and Nucleotide binding are deprecated and should point to binding
  'feature.METAL': {
    section: SubEntrySection.Function,
    featureType: 'Binding site',
  },
  'feature.NP_BIND': {
    section: SubEntrySection.Function,
    featureType: 'Binding site',
  },
  'feature.DNA_BIND': {
    section: SubEntrySection.Function,
    featureType: 'DNA binding',
  },
  'feature.SITE': {
    section: SubEntrySection.Function,
    featureType: 'Site',
  },
  'feature.TOPO_DOM': {
    section: SubEntrySection.SubcellularLocation,
    featureType: 'Topological domain',
  },
  'feature.INTRAMEM': {
    section: SubEntrySection.SubcellularLocation,
    featureType: 'Intramembrane',
  },
  'feature.TRANSMEM': {
    section: SubEntrySection.SubcellularLocation,
    featureType: 'Transmembrane',
  },
  'feature.MOTIF': {
    section: SubEntrySection.FamilyAndDomains,
    featureType: 'Motif',
  },
  'feature.REPEAT': {
    section: SubEntrySection.FamilyAndDomains,
    featureType: 'Repeat',
  },
  'feature.REGION': {
    section: SubEntrySection.FamilyAndDomains,
    featureType: 'Region',
  },
  'feature.ZN_FING': {
    section: SubEntrySection.FamilyAndDomains,
    featureType: 'Zinc finger',
  },
  'feature.COILED': {
    section: SubEntrySection.FamilyAndDomains,
    featureType: 'Coiled coil',
  },
  'feature.DOMAIN': {
    section: SubEntrySection.FamilyAndDomains,
    featureType: 'Domain',
  },
  'feature.feature.CHAIN': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Chain',
  },
  'feature.DISULFID': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Disulfide bond',
  },
  'feature.INIT_MET': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Initiator methionine',
  },
  'feature.MOD_RES': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Modified residue',
  },
  'feature.CARBOHYD': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Glycosylation',
  },
  'feature.LIPID': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Lipidation',
  },
  'feature.PEPTIDE': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Peptide',
  },
  'feature.PROPEP': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Propeptide',
  },
  'feature.SIGNAL': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Signal',
  },
  'feature.TRANSIT': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Transit peptide',
  },
  'feature.CROSSLNK': {
    section: SubEntrySection.ProteinProcessing,
    featureType: 'Cross-link',
  },
};

export const groupTypesBySection = (section: SubEntrySection): string[] => {
  return Object.entries(annotationTypeToSection)
    .filter(([, sectionObject]) => sectionObject.section === section)
    .map(([type]) => type);
};

export default annotationTypeToSection;
