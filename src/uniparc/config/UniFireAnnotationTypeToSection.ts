import { CommentType, FreeTextType } from '../../uniprotkb/types/commentTypes';
import EntrySection from '../../uniprotkb/types/entrySection';

type SectionObject = {
  section: EntrySection;
  freeTextType: FreeTextType | CommentType;
  subSectionLabel?: string;
};

const annotationTypeToSection: Record<string, SectionObject> = {
  'comment.function': {
    section: EntrySection.Function,
    freeTextType: 'FUNCTION',
  },
  'comment.subcellular_location': {
    section: EntrySection.SubCellularLocation,
    freeTextType: 'SUBCELLULAR LOCATION',
  },
  'comment.subunit': {
    section: EntrySection.Interaction,
    freeTextType: 'SUBUNIT',
    subSectionLabel: 'Subunit',
  },
  'comment.similarity': {
    section: EntrySection.FamilyAndDomains,
    freeTextType: 'SIMILARITY',
    subSectionLabel: 'Sequence similarities',
  },
};

export default annotationTypeToSection;
