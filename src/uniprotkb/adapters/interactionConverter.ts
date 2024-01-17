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

const convertInteraction = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    databaseInfoMaps,
    commentsCategories,
    undefined,
    undefined,
    EntrySection.Interaction,
    uniProtKBCrossReferences
  );

export default convertInteraction;
