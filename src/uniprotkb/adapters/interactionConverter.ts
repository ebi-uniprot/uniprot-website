import { Xref } from '../../shared/types/apiModel';
import { CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { DatabaseInfoMaps } from '../utils/database';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const commentsCategories: CommentType[] = ['INTERACTION', 'SUBUNIT'];

export type Interactant = {
  uniProtKBAccession?: string;
  geneName?: string;
  chainId?: string;
  intActId: string;
};

export const convertInteraction = (
  data: UniProtkbAPIModel,
  dbMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    dbMaps,
    commentsCategories,
    undefined,
    undefined,
    EntrySection.Interaction,
    uniProtKBCrossReferences
  );

export default convertInteraction;
