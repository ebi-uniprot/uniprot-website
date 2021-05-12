import { Xref } from '../../shared/types/apiModel';
import { CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const commentsCategories: CommentType[] = ['INTERACTION', 'SUBUNIT'];

export type Interactant = {
  uniProtkbAccession: string;
  geneName?: string;
  chainId?: string;
  intActId: string;
};

export const convertInteraction = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    commentsCategories,
    undefined,
    undefined,
    EntrySection.Interaction,
    uniProtKBCrossReferences
  );

export default convertInteraction;
