import Comment from '../../types/Comment';
import EntrySection from '../../types/EntrySection';
import { convertSection } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const commentsCategories = [Comment.INTERACTION, Comment.SUBUNIT];

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
