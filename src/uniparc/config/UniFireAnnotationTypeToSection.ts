import { CommentType, FreeTextType } from '../../uniprotkb/types/commentTypes';
import SubEntrySection from '../types/subEntrySection';

type SectionObject = {
  section: SubEntrySection;
  freeTextType: FreeTextType | CommentType;
  subSectionLabel?: string;
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
};

export const groupTypesBySection = (section: SubEntrySection): string[] => {
  return Object.entries(annotationTypeToSection)
    .filter(([, sectionObject]) => sectionObject.section === section)
    .map(([type]) => type);
};

export default annotationTypeToSection;
