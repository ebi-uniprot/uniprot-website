import { CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const commentsCategories = [CommentType.INTERACTION, CommentType.SUBUNIT];

export type Interactant = {
  uniProtkbAccession: string;
  geneName: string;
  chainId: string;
  intActId: string;
};

export const convertInteraction = (data: UniProtkbAPIModel) =>
  convertSection(
    data,
    commentsCategories,
    undefined,
    undefined,
    EntrySection.Interaction
  );

export default convertInteraction;
