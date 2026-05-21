import {
  type CommentType,
  type FreeTextType,
} from '../../uniprotkb/types/commentTypes';
import type FeatureType from '../../uniprotkb/types/featureType';
import SubEntrySection from '../types/subEntrySection';

type SectionObject = {
  section: SubEntrySection;
  freeTextType?: FreeTextType | CommentType;
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
  },
  'comment.catalytic_activity': {
    section: SubEntrySection.Function,
    freeTextType: 'CATALYTIC ACTIVITY',
  },
  'comment.caution': {
    section: SubEntrySection.Function,
    freeTextType: 'CAUTION',
  },
  'comment.cofactor': {
    section: SubEntrySection.Function,
    freeTextType: 'COFACTOR',
  },
  'comment.miscellaneous': {
    section: SubEntrySection.Function,
    freeTextType: 'MISCELLANEOUS',
  },
  'comment.pathway': {
    section: SubEntrySection.Function,
    freeTextType: 'PATHWAY',
  },
  'comment.subcellular_location': {
    section: SubEntrySection.SubcellularLocation,
    freeTextType: 'SUBCELLULAR LOCATION',
  },
  'comment.induction': {
    section: SubEntrySection.Expression,
    freeTextType: 'INDUCTION',
  },
  'comment.PTM': {
    section: SubEntrySection.ProteinProcessing,
    freeTextType: 'PTM',
  },
  'comment.subunit': {
    section: SubEntrySection.Interaction,
    freeTextType: 'SUBUNIT',
  },
  'comment.domain': {
    section: SubEntrySection.FamilyAndDomains,
    freeTextType: 'DOMAIN',
  },
  'comment.similarity': {
    section: SubEntrySection.FamilyAndDomains,
    freeTextType: 'SIMILARITY',
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

export default annotationTypeToSection;
