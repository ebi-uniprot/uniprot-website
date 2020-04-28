import { CommentType } from '../../types/CommentTypes';
import EntrySection from '../../types/EntrySection';
import { convertSection } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const commentsCategories = [CommentType.INTERACTION, CommentType.SUBUNIT];

export type Interactant = {
  uniProtkbAccession: string;
  geneName: string;
  chainId: string;
  intActId: string;
};

export const convertInteraction = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    commentsCategories,
    undefined,
    undefined,
    EntrySection.Interaction
  );
};

export default convertInteraction;
